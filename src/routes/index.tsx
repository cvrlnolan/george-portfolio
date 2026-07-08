import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/About";
import { Contact } from "#/components/Contact";
import { Experience } from "#/components/Experience";
import { Footer } from "#/components/Footer";
import { Hero } from "#/components/Hero";
import { Nav } from "#/components/Nav";
import { Projects } from "#/components/Projects";
import { Skills } from "#/components/Skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<div className="grain" />
			<Nav />
			<main>
				<Hero />
				<About />
				<Experience />
				<Skills />
				<Projects />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
