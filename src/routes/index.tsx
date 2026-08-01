import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/About";
import { AskGeorge } from "#/components/AskGeorge";
import { Contact } from "#/components/Contact";
import { Experience } from "#/components/Experience";
import { Footer } from "#/components/Footer";
import { Nav } from "#/components/Nav";
import { Projects } from "#/components/Projects";
import { Skills } from "#/components/Skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<Nav />
			<main>
				<AskGeorge />
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
