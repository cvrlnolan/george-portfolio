/**
 * PHASE 2 — EMBEDDINGS + THE VECTOR STORE (runs at BUILD time, not per request).
 *
 * An embedding maps text -> a fixed-length vector of floats (1536 numbers for
 * text-embedding-3-small) that encodes meaning. Semantically similar texts get
 * vectors pointing in similar directions, so we can later find "the chunk most
 * related to this question" with plain math (cosine similarity, Phase 3) —
 * no keyword overlap required.
 *
 * WHY PRECOMPUTE: George's facts don't change between requests, so we embed all
 * chunks ONCE here and commit the result as static JSON. At query time the edge
 * function only has to embed the single question (one tiny API call). That is
 * the whole reason this is cheap and needs no vector database.
 *
 * Run it:  OPENAI_API_KEY=sk-... pnpm embed
 * Re-run whenever content.ts changes.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeChunks } from "../src/lib/knowledge-source";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "text-embedding-3-small";

if (!OPENAI_API_KEY) {
	console.error("Missing OPENAI_API_KEY. Run: OPENAI_API_KEY=sk-... pnpm embed");
	process.exit(1);
}

// The embeddings endpoint accepts an array and returns vectors in input order,
// so all 29 chunks embed in a single request.
async function embedAll(texts: string[]): Promise<number[][]> {
	const res = await fetch("https://api.openai.com/v1/embeddings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify({ model: MODEL, input: texts }),
	});
	if (!res.ok) {
		throw new Error(`OpenAI embeddings ${res.status}: ${await res.text()}`);
	}
	const json = (await res.json()) as { data: { embedding: number[] }[] };
	return json.data.map((d) => d.embedding);
}

async function main() {
	const texts = knowledgeChunks.map((c) => c.text);
	console.log(`Embedding ${texts.length} chunks with ${MODEL}...`);
	const embeddings = await embedAll(texts);

	// The vector store: each chunk keeps its text (for the prompt) next to its
	// vector (for retrieval).
	const store = knowledgeChunks.map((c, i) => ({
		id: c.id,
		text: c.text,
		embedding: embeddings[i],
	}));

	const out = resolve(
		dirname(fileURLToPath(import.meta.url)),
		"../src/lib/knowledge.json",
	);
	writeFileSync(out, JSON.stringify(store));
	console.log(
		`Wrote ${store.length} vectors (${embeddings[0].length} dims) -> ${out}`,
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
