import { ArrowUpRight, Github, Mail, Phone } from "lucide-react";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { Button } from "#/components/ui/button";
import { profile } from "#/lib/content";

export function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-5xl px-6 py-28">
			<SectionHeading index="05" title="contact" />

			<Reveal>
				<p className="max-w-xl text-balance font-display text-2xl font-light leading-relaxed text-ink md:text-3xl">
					Open to select senior engineering roles and freelance engagements —
					reach out and let's talk about what you're building.
				</p>
			</Reveal>

			<Reveal delay={100} className="mt-10">
				<div className="grid gap-3 sm:grid-cols-3">
					<Button
						asChild
						variant="outline"
						className="group h-auto justify-between rounded-lg border-line bg-panel px-5 py-4 text-sm font-normal text-ink-dim hover:border-signal hover:bg-panel hover:text-ink"
					>
						<a href={`mailto:${profile.email}`}>
							<span className="flex items-center gap-3">
								<Mail size={16} className="text-signal-dim" />
								{profile.email}
							</span>
							<ArrowUpRight
								size={14}
								className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
							/>
						</a>
					</Button>

					<Button
						asChild
						variant="outline"
						className="group h-auto justify-between rounded-lg border-line bg-panel px-5 py-4 text-sm font-normal text-ink-dim hover:border-signal hover:bg-panel hover:text-ink"
					>
						<a href={profile.githubUrl} target="_blank" rel="noreferrer">
							<span className="flex items-center gap-3">
								<Github size={16} className="text-signal-dim" />
								{profile.github}
							</span>
							<ArrowUpRight
								size={14}
								className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
							/>
						</a>
					</Button>

					<Button
						asChild
						variant="outline"
						className="group h-auto justify-between rounded-lg border-line bg-panel px-5 py-4 text-sm font-normal text-ink-dim hover:border-signal hover:bg-panel hover:text-ink"
					>
						<a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
							<span className="flex items-center gap-3">
								<Phone size={16} className="text-signal-dim" />
								{profile.phone}
							</span>
							<ArrowUpRight
								size={14}
								className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
							/>
						</a>
					</Button>
				</div>
			</Reveal>
		</section>
	);
}
