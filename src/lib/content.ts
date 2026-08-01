export const profile = {
	name: "George Mbome",
	role: "Senior Software Engineer",
	location: "Douala, Cameroon",
	phone: "+237 696 740 298",
	email: "georgecvrl0@gmail.com",
	github: "github.com/cvrlnolan",
	githubUrl: "https://github.com/cvrlnolan",
	resumeUrl: "/George-Yana-Mbome-Resume.pdf",
	summary:
		"Senior Software Engineer with 4+ years at Invisible Technologies, a $2B AI and workflow-automation company, where I shipped 600+ merged PRs across 11 repos including LLM-powered product features (Pinecone, OpenAI) and Temporal-orchestrated infrastructure. I also ran a part-time contract at Lemonet (141 merged PRs) and have 7+ years of freelance and startup experience. Full-stack and comfortable in infrastructure, with agentic coding tools (Claude Code) part of my daily workflow, and a track record of owning features autonomously while working across teams.",
};

export const stats = [
	{ value: "600+", label: "merged pull requests" },
	{ value: "11", label: "production repositories" },
	{ value: "11+ yrs", label: "engineering experience" },
	{ value: "$2B", label: "platform scale, Invisible" },
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
		subtitle: "$2B AI workforce and process-automation platform",
		location: "Remote",
		period: "Dec 2021 - Jul 2026",
		bullets: [
			"Shipped 600+ merged pull requests (1,100+ commits) across 11 repositories in TypeScript and Python, ranking as a top-2 individual contributor on the core backend platform used by Meta, Apple, Amazon, and xAI.",
			"Served as co-tech lead on the onboarding team, building the opportunity/application system and expert onboarding flows end to end, including identity and address verification through trusted third-party providers (Socure, Jumio) and skills assessments via WECP and Hallo.",
			"Built LLM-powered product features end to end with agentic coding workflows (Claude Code): a Pinecone-backed embeddings and vector-search system indexing thousands of expert profiles, plus an OpenAI pipeline converting natural-language search into structured, filterable properties.",
			"Orchestrated LLM workloads (embedding generation, OpenAI extraction, retries) through Temporal workflows, refactored core services for multi-tenancy, and deployed on Docker and Kubernetes.",
			"Designed PostgreSQL and Neo4j services for an expert verification and assessment platform, including fraud-detection checks and third-party AI-assessment integrations (WECP, Hallo AI), at 59% automated test coverage.",
			"Engineered core billing and invoicing infrastructure (235 merged PRs): a time-log-based billing engine and the step-execution logic behind the visual process builder.",
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
			"Delivered 141 merged pull requests building core admin surfaces (a webmaster partner portal and leadership, fulfillment, and team-performance dashboards) and Stripe-based subscription billing and cancellation logic, ranking as the 4th most active contributor of 13 on the monorepo.",
			"Designed and scaled a self-hosted GitHub Actions runner fleet and resolved a recurring CI build-cache regression, documented in the team's build-performance runbook.",
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
			"Delivered full-stack web applications for international clients with a 100% job success score, using React, TypeScript, Next.js, Python, and FastAPI.",
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

// Anonymized highlights. Client and employer names withheld under NDA; the
// engineering is real.
export const capabilities: Capability[] = [
	{
		title: "Semantic search over 10k+ expert profiles",
		detail:
			"A Pinecone-backed embeddings and vector-search system, paired with an OpenAI pipeline that turns natural-language queries into structured, filterable properties.",
		tag: "AI / Search",
		stack: ["Pinecone", "OpenAI", "TypeScript"],
	},
	{
		title: "LLM orchestration on Temporal",
		detail:
			"Embedding generation, OpenAI extraction, and retries run as durable Temporal workflows across a multi-tenant platform, deployed on Docker and Kubernetes.",
		tag: "Infrastructure",
		stack: ["Temporal", "Kubernetes", "Python"],
	},
	{
		title: "Billing and invoicing engine",
		detail:
			"A time-log-based billing engine and the step-execution logic behind a visual process builder, shipped across 235 merged pull requests.",
		tag: "Backend",
		stack: ["PostgreSQL", "Node.js", "Stripe"],
	},
	{
		title: "Opportunity & application system",
		detail:
			"Designed and implemented the opportunity/application system experts use to apply for and get matched to work, and managed a team through its build-out as co-tech lead on the onboarding team at Invisible Technologies.",
		tag: "Leadership / Product",
		stack: ["TypeScript", "PostgreSQL", "React"],
	},
	{
		title: "Expert onboarding & identity verification",
		detail:
			"Built the expert onboarding flows at Invisible Technologies, integrating third-party identity and address verification (Socure, Jumio) and skills assessments (WECP, Hallo) into the platform's expert verification and assessment system.",
		tag: "Backend / Integrations",
		stack: ["PostgreSQL", "Neo4j", "TypeScript"],
	},
];

export const education = {
	degree: "B.Sc. Software Engineering",
	school: "Catholic University Institute of Buea",
	period: "2014 - 2018",
};

export const skills = [
	{
		group: "AI / ML",
		items: [
			"Embeddings",
			"Vector Search (Pinecone)",
			"LLM Orchestration (Temporal)",
			"OpenAI API Integration",
			"LLM-Based Extraction",
			"Agentic Coding (Claude Code)",
		],
	},
	{
		group: "Languages",
		items: ["JavaScript", "TypeScript", "Python", "PHP"],
	},
	{
		group: "Frontend",
		items: [
			"React",
			"Next.js",
			"Tailwind CSS",
			"Material UI",
			"HTML5/CSS3",
			"GraphQL",
			"REST APIs",
			"WebSockets",
		],
	},
	{
		group: "Backend",
		items: [
			"Node.js",
			"Express",
			"Django",
			"FastAPI",
			"GraphQL",
			"Kafka",
			"Temporal",
			"REST",
		],
	},
	{
		group: "Databases",
		items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Neo4j", "Oracle DB"],
	},
	{
		group: "DevOps & Testing",
		items: [
			"Docker",
			"Kubernetes",
			"Helm",
			"Argo CD",
			"GitHub Actions",
			"Vercel",
			"Jest",
			"Pytest",
			"Cypress",
			"Playwright",
		],
	},
];
