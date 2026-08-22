export const profile = {
	name: "George Mbome",
	role: "Senior Full-stack Software Engineer",
	positioning:
		"I build production software across frontend, backend, data, infrastructure, and AI-powered systems.",
	location: "Douala, Cameroon",
	phone: "+237 696 740 298",
	email: "georgecvrl0@gmail.com",
	github: "github.com/cvrlnolan",
	githubUrl: "https://github.com/cvrlnolan",
	resumeUrl: "/George-Yana-Mbome-Resume.pdf",
	summary:
		"Senior Full-stack Software Engineer with 9+ years of experience building and shipping production software across frontend, backend, data, workflows, and infrastructure.\n\nI enjoy working across the stack rather than being confined to one layer of a system. I particularly enjoy building the frontend experiences and product workflows users interact with, while understanding and owning the APIs, backend services, data models, asynchronous workflows, and infrastructure behind them.\n\nMy recent work spans AI-powered search and extraction, marketplaces, expert verification, billing, workflow automation, and internal product platforms. I also have hands-on experience with RAG, embeddings, vector search, LLM APIs, Temporal, PostgreSQL, Neo4j, Docker, and Kubernetes.",
};

export const stats = [
	{ value: "600+", label: "merged pull requests" },
	{ value: "11", label: "production repositories" },
	{ value: "9+ yrs", label: "engineering experience" },
	{ value: "100K+", label: "specialist network" },
];

export type Job = {
	company: string;
	url?: string;
	role: string;
	subtitle?: string;
	location: string;
	period: string;
	current?: boolean;
	bullets: string[];
};

export const experience: Job[] = [
	{
		company: "Invisible Technologies",
		url: "https://invisibletech.ai/",
		role: "Senior Software Engineer",
		subtitle: "AI workforce and enterprise process automation",
		location: "Remote",
		period: "Dec 2021 - Jul 2026",
		bullets: [
			"Built and owned full-stack product features spanning frontend experiences, APIs, backend services, data models, workflows, testing, and production infrastructure; shipped 600+ merged pull requests across 11 repositories in TypeScript and Python.",
			"Helped architect and launch Meridial, a global marketplace connecting specialized human experts with AI training projects, contributing across marketplace, onboarding, and workflow experiences.",
			"Built an AI-powered expert search pipeline using RAG, embeddings, Pinecone, LLMs, and Temporal to search a network of 100K+ specialists using natural-language queries, filters, and structured conditions.",
			"Designed LLM-powered extraction workflows that converted natural-language input into structured, filterable properties and orchestrated asynchronous LLM workloads with Temporal.",
			"Served as co-tech lead for the expert onboarding team, leading architecture and implementation of Opportunity/Application workflows and onboarding experiences involving identity verification and skills assessments through Jumio, Socure, WeCP, and Hallo AI.",
			"Engineered core billing and invoicing functionality, real-time time tracking, workflow execution logic, and PostgreSQL/Neo4j-backed marketplace and verification services deployed with Docker and Kubernetes.",
		],
	},
	{
		company: "Lemonet",
		url: "https://lemonet.com/",
		role: "Software Engineer, Part-Time Contract",
		subtitle: "Early-stage marketing-technology startup",
		location: "Remote",
		period: "Jun 2025 - Apr 2026",
		bullets: [
			"Delivered 141 merged pull requests building core internal product surfaces including a webmaster partner portal, leadership dashboards, fulfillment tooling, and team-performance dashboards, alongside Stripe subscription billing and cancellation workflows.",
			"Introduced TanStack Router as the primary frontend routing framework and contributed to frontend architecture, developer experience, CI/CD, and self-hosted GitHub Actions infrastructure.",
			"Integrated platform data and automation workflows across tools including Attio, n8n, PostHog, and Temporal.",
		],
	},
	{
		company: "Certified Upwork Freelancer",
		url: "https://www.upwork.com/freelancers/georgembome",
		role: "Software Engineer",
		location: "Remote",
		period: "Feb 2019 - Present",
		current: true,
		bullets: [
			"Delivered full-stack applications for international clients with a 100% Job Success Score, owning projects from architecture and technical design through implementation, deployment, monitoring, and maintenance.",
			"Built production applications using React, TypeScript, Next.js, Python, FastAPI, PostgreSQL, and MySQL, with more recent work incorporating AI-powered product features.",
		],
	},
	{
		company: "Early Career",
		role: "Software Engineer and Engineering Intern",
		location: "Douala, Cameroon",
		period: "2017 - 2019",
		bullets: [
			"Software Engineer at Tirla Technologies and Coredoo, and Engineering Intern at the Port Authority of Douala: built client web applications, a food-delivery marketplace, and a government document-management system with PHP, JavaScript, WordPress, and MySQL.",
		],
	},
];

export type Capability = {
	title: string;
	detail: string;
	tag: string;
	stack: string[];
};

// Much of this work was built under NDA; company names are withheld where
// not already credited elsewhere on the site.
export const capabilities: Capability[] = [
	{
		title: "AI-powered expert search",
		detail:
			"Built a semantic retrieval system combining natural-language query understanding, embeddings, Pinecone vector search, structured filtering, and LLM-based processing to find relevant specialists across a 100K+ expert network.",
		tag: "AI / Search",
		stack: ["Pinecone", "OpenAI", "TypeScript", "PostgreSQL"],
	},
	{
		title: "LLM workflow orchestration",
		detail:
			"Designed durable Temporal workflows for embedding generation, LLM-based extraction, retries, and long-running asynchronous processing across a multi-tenant platform.",
		tag: "AI / Infrastructure",
		stack: ["Temporal", "OpenAI", "Python", "Docker", "Kubernetes"],
	},
	{
		title: "Marketplace & opportunity platform",
		detail:
			"Helped architect and build marketplace opportunity and application workflows connecting specialized experts with AI training projects, including onboarding and automated shortlisting capabilities.",
		tag: "Product / Leadership",
		stack: ["TypeScript", "React", "PostgreSQL", "Temporal"],
	},
	{
		title: "Expert onboarding & verification",
		detail:
			"Built onboarding and verification workflows integrating identity, address, and skills-assessment providers including Socure, Jumio, WeCP, and Hallo AI.",
		tag: "Product / Integrations",
		stack: ["TypeScript", "PostgreSQL", "Neo4j", "React"],
	},
	{
		title: "Billing & workflow execution",
		detail:
			"Engineered time-based billing, invoicing, and workflow step-execution systems supporting automated and human-in-the-loop enterprise processes.",
		tag: "Backend / Systems",
		stack: ["TypeScript", "PostgreSQL", "Node.js", "Stripe"],
	},
	{
		title: "The AI assistant behind this portfolio",
		detail:
			"Built the AI assistant powering this portfolio using a retrieval-augmented architecture: knowledge extraction, chunking, embeddings, semantic retrieval, context assembly, LLM generation, streaming responses, rate limiting, and prompt-injection guardrails.",
		tag: "AI / Product",
		stack: ["TypeScript", "OpenAI", "Embeddings", "Vector Search", "SSE"],
	},
];

export const education = {
	degree: "B.Sc. Software Engineering",
	school: "Catholic University Institute of Buea",
	period: "2014 - 2018",
};

export const skills = [
	{
		group: "AI / LLM",
		items: [
			"RAG",
			"Embeddings",
			"Vector Search",
			"LLM-based Extraction",
			"OpenAI APIs",
			"Pinecone",
			"pgvector",
			"Temporal",
		],
	},
	{
		group: "Languages",
		items: ["TypeScript", "JavaScript", "Python"],
	},
	{
		group: "Frontend",
		items: [
			"React",
			"Next.js",
			"Tailwind CSS",
			"Vite",
			"TanStack Router",
			"HTML5",
			"CSS3",
		],
	},
	{
		group: "Backend",
		items: [
			"Node.js",
			"Fastify",
			"Express",
			"FastAPI",
			"Django",
			"GraphQL",
			"REST APIs",
		],
	},
	{
		group: "Data",
		items: ["PostgreSQL", "Neo4j", "MongoDB", "MySQL"],
	},
	{
		group: "Infrastructure & Testing",
		items: [
			"Docker",
			"Kubernetes",
			"GitHub Actions",
			"Jest",
			"Vitest",
			"Pytest",
			"Playwright",
		],
	},
];
