export const profile = {
	name: "George Carl Yana Mbome",
	role: "Senior Software Engineer",
	location: "Douala, Cameroon",
	phone: "+237 696 740 298",
	email: "georgecvrl0@gmail.com",
	github: "github.com/cvrlnolan",
	githubUrl: "https://github.com/cvrlnolan",
	resumeUrl: "/George-Yana-Mbome-Resume.pdf",
	summary:
		"Senior Software Engineer with 4+ years building full-stack systems (TypeScript, Python) at Invisible Technologies — 600+ merged pull requests across 11 repositories — plus a part-time contract at Lemonet (141 merged PRs) and 7+ years of freelance and startup engineering experience spanning billing, marketplace verification, payments, admin tooling, and e-commerce products. Proven ability to take any product idea from architecture through deployment and scale it.",
};

export const stats = [
	{ value: "600+", label: "merged pull requests" },
	{ value: "11", label: "production repositories" },
	{ value: "11+ yrs", label: "engineering experience" },
	{ value: "100%", label: "Upwork job success" },
];

export type Job = {
	company: string;
	role: string;
	location: string;
	period: string;
	current?: boolean;
	bullets: string[];
};

export const experience: Job[] = [
	{
		company: "Invisible Technologies",
		role: "Senior Software Engineer",
		location: "Remote",
		period: "Dec 2021 — Present",
		current: true,
		bullets: [
			"Shipped 600+ merged pull requests (1,100+ commits) across 11 repositories in TypeScript and Python over 4+ years, ranking as a top-2 individual contributor on the core backend platform.",
			"Built the expert verification & assessment platform end-to-end, including Neo4j-backed verification services, fraud-detection checks, and AI-assessment integrations (WECP, Hallo AI), sustaining 59% automated test coverage across 300+ commits.",
			"Engineered core billing and invoicing infrastructure (235 merged PRs) for the flagship process-automation product, including a time-log-based billing engine and the step-execution logic behind the visual process builder.",
			"Designed an opportunity-application and auto-shortlisting system that streamlined expert-to-role matching, supporting a platform used by enterprise clients including Meta, Apple, Amazon, and xAI.",
		],
	},
	{
		company: "Lemonet",
		role: "Software Engineer (Part-Time Contract)",
		location: "Remote",
		period: "Jun 2025 — Apr 2026",
		bullets: [
			"Delivered 141 merged pull requests building core admin surfaces — a webmaster partner portal, leadership/fulfillment/team-performance dashboards — and Stripe-based subscription billing and cancellation logic; ranked the 4th most active contributor of 13 on the company's monorepo.",
			"Designed and scaled a self-hosted GitHub Actions runner fleet and resolved a recurring CI build-cache regression, documented in the team's build-performance runbook.",
		],
	},
	{
		company: "Certified Upwork Freelancer",
		role: "Software Engineer",
		location: "Remote",
		period: "Feb 2019 — Present",
		current: true,
		bullets: [
			"Delivered full-stack web applications for international clients with a 100% job success score, using React, TypeScript, Next.js, Tailwind CSS, Python, and FastAPI.",
			"Owned projects end-to-end from architecture through deployment, building PostgreSQL- and MySQL-backed applications for startups and small businesses.",
		],
	},
	{
		company: "Tirla Technologies",
		role: "Software Engineer",
		location: "Douala, Cameroon",
		period: "Aug 2018 — Feb 2019",
		bullets: [
			"One of two engineers at an early-stage startup; built and delivered multiple client web projects using WordPress, React, Node.js, and Express.",
		],
	},
	{
		company: "Coredoo",
		role: "Software Engineer",
		location: "Douala, Cameroon",
		period: "Jun 2017 — Jul 2018",
		bullets: [
			"Core engineer on Coredoo's food delivery web app, building the product from the ground up with HTML, CSS, JavaScript, and PHP (CodeIgniter, Laravel).",
		],
	},
	{
		company: "Port Authority of Douala",
		role: "Engineering Intern",
		location: "Douala, Cameroon",
		period: "Jul 2017 — Sep 2017",
		bullets: [
			"Built a Document Management System as the primary intern project and resolved engineering tickets across existing PHP, MySQL, and Oracle applications.",
		],
	},
];

export const education = {
	degree: "B.Sc. Software Engineering",
	school: "Catholic University Institute of Buea",
	period: "2014 — 2018",
};

export const skills = [
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
