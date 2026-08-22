import {
	capabilities,
	education,
	experience,
	profile,
	skills,
} from "./content";

/**
 * PHASE 1 — CHUNKING (the retrieval unit).
 *
 * RAG retrieves whole chunks, so chunk design decides answer quality. Two
 * failure modes to avoid:
 *   - Chunk too big  -> retrieval drags in irrelevant text, distracts the model.
 *   - Chunk too small -> loses meaning on its own ("59% coverage" of WHAT?).
 *
 * The lever most people miss: CHUNK ENRICHMENT. Each chunk must be
 * self-contained, because at query time it's retrieved alone with no
 * surrounding context. So we prefix identifying context into every chunk
 * (company, role, period) instead of storing a bare bullet. A chunk should
 * read like a fact that makes sense if it were the only thing you saw.
 *
 * Our corpus is small and already semantically structured, so we chunk one
 * unit per fact: a job bullet, a skill group, a capability, etc.
 */

export type Chunk = { id: string; text: string };

const slug = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

// The résumé summary is already a strong standalone paragraph.
const summaryChunk: Chunk = { id: "summary", text: profile.summary };

// Facts a résumé doesn't state but a visitor will ask: availability, contact,
// focus, and a self-referential note about this very feature.
const facts: Chunk[] = [
	{
		id: "identity",
		text: `${profile.name} is a ${profile.role} based in ${profile.location}. He works remotely and collaborates across time zones.`,
	},
	{
		id: "availability",
		text: `${profile.name} is currently open to Senior Full-stack Software Engineering opportunities and selected freelance engagements. He works remotely from ${profile.location}.`,
	},
	{
		id: "contact",
		text: `To reach ${profile.name}: email ${profile.email}, GitHub ${profile.github}, phone ${profile.phone}, Upwork profile https://www.upwork.com/freelancers/georgembome. His résumé is downloadable from this site.`,
	},
	{
		id: "focus",
		text: `${profile.name} is a Senior Full-stack Software Engineer who builds production software across frontend, backend, data, infrastructure, and AI-powered systems. He enjoys working across the full stack rather than being confined to one layer: building the frontend experiences and product workflows users interact with, while owning the APIs, backend services, data models, asynchronous workflows, and infrastructure behind them. His recent work includes hands-on experience with RAG, embeddings, vector search, LLM APIs, and Temporal.`,
	},
	{
		id: "meta-askgeorge",
		text: `This "Ask George" assistant is itself a retrieval-augmented generation (RAG) app that George built: it embeds his experience with OpenAI embeddings, retrieves the most relevant facts by cosine similarity, and streams answers from Llama 3.3 70B on Groq, running on a Vercel edge function.`,
	},
	{
		id: "strongest-stack",
		text: `${profile.name}'s strongest technical area is full-stack product engineering: owning a feature end to end across frontend (React, Next.js, TypeScript), backend (Node.js, Python, Django, FastAPI, PostgreSQL), and infrastructure (Docker, Kubernetes, CI/CD), rather than working in a single layer. Within that range, his most recent depth is in AI-powered systems: RAG, embeddings, vector search, and LLM orchestration on Temporal, applied to real production features rather than isolated experiments.`,
	},
];

// One overview chunk per job + one enriched chunk per bullet.
const experienceChunks: Chunk[] = experience.flatMap((job) => {
	const ctx = `${job.company} · ${job.role} (${job.period})`;
	const overview: Chunk = {
		id: `job-${slug(job.company)}-overview`,
		text: `${ctx}.${job.subtitle ? ` ${job.subtitle}.` : ""} Location: ${job.location}.${
			job.current ? " This is a current, ongoing role." : ""
		}`,
	};
	const bullets = job.bullets.map((b, i) => ({
		id: `job-${slug(job.company)}-${i}`,
		text: `${ctx}. ${b}`,
	}));
	return [overview, ...bullets];
});

// Selected work highlights. Some are named (Invisible Technologies, credited
// elsewhere on the site); freelance/client engagements without a company
// named here are anonymized under NDA — the engineering is real either way.
const capabilityChunks: Chunk[] = capabilities.map((c, i) => ({
	id: `cap-${i}`,
	text: `Selected work by ${profile.name}. ${c.title}: ${c.detail} Stack: ${c.stack.join(", ")}.`,
}));

// One chunk per skill group keeps "does he know X?" queries precise.
const skillChunks: Chunk[] = skills.map((g) => ({
	id: `skills-${slug(g.group)}`,
	text: `${profile.name}'s ${g.group} skills: ${g.items.join(", ")}.`,
}));

const educationChunk: Chunk = {
	id: "education",
	text: `${profile.name} holds a ${education.degree} from ${education.school} (${education.period}).`,
};

export const knowledgeChunks: Chunk[] = [
	summaryChunk,
	...facts,
	...experienceChunks,
	...capabilityChunks,
	...skillChunks,
	educationChunk,
];
