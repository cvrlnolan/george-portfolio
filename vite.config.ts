import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Dev-only: run the `/api/ask` edge function inside `vite dev`, so `pnpm dev` is
 * full-stack. In production Vercel runs `api/ask.ts` as a real edge function;
 * this middleware just mirrors that locally (adapts Node req/res <-> the Web
 * Request/Response the handler speaks) so we don't need `vercel dev`, whose SPA
 * rewrite otherwise serves index.html for module requests.
 */
function askApiDev(): Plugin {
	return {
		name: "ask-api-dev",
		apply: "serve",
		configureServer(server) {
			// The edge handler reads process.env; load .env (non-prefixed) into it.
			const env = loadEnv(server.config.mode, process.cwd(), "");
			process.env.OPENAI_API_KEY ||= env.OPENAI_API_KEY;
			process.env.GROQ_API_KEY ||= env.GROQ_API_KEY;

			server.middlewares.use(async (req, res, next) => {
				if (!req.url?.startsWith("/api/ask")) return next();
				try {
					const mod = await server.ssrLoadModule("/api/ask.ts");
					const handler = mod.default as (r: Request) => Promise<Response>;

					const chunks: Buffer[] = [];
					for await (const c of req) chunks.push(c as Buffer);
					const request = new Request(`http://localhost${req.url}`, {
						method: req.method,
						headers: req.headers as HeadersInit,
						body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
					});

					const response = await handler(request);
					res.statusCode = response.status;
					response.headers.forEach((v, k) => res.setHeader(k, v));
					if (response.body) {
						const reader = response.body.getReader();
						while (true) {
							const { done, value } = await reader.read();
							if (done) break;
							res.write(Buffer.from(value));
						}
					}
					res.end();
				} catch (e) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ error: `Dev API error: ${(e as Error).message}` }),
					);
				}
			});
		},
	};
}

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		askApiDev(),
		devtools(),
		tailwindcss(),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		viteReact(),
	],
});

export default config;
