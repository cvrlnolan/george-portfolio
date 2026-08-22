import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/About";
import { AskGeorge } from "#/components/AskGeorge";
import { Contact } from "#/components/Contact";
import { Engineering } from "#/components/Engineering";
import { Experience } from "#/components/Experience";
import { Footer } from "#/components/Footer";
import { Nav } from "#/components/Nav";
import { Projects } from "#/components/Projects";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<Nav />
			<main>
				<AskGeorge />
				<About />
				<Experience />
				<Engineering />
				<Projects />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
