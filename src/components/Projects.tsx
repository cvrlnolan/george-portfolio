import { ArrowUpRight } from "lucide-react";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { capabilities, profile } from "#/lib/content";

export function Projects() {
	return (
		<section id="projects" className="mx-auto max-w-5xl px-6 py-32 md:py-40">
			<SectionHeading title="Selected work" />

			<Reveal>
				<p className="max-w-xl leading-relaxed text-ink-dim">
					Client and employer names are withheld under NDA, so here is the
					engineering instead. More on{" "}
					<a
						href={profile.githubUrl}
						target="_blank"
						rel="noreferrer"
						className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
					>
						{profile.github}
					</a>
					.
				</p>
			</Reveal>

			<div className="mt-14 grid gap-4 md:grid-cols-3">
				{capabilities.map((cap, i) => (
					<Reveal key={cap.title} delay={i * 80}>
						<article className="flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-panel/40 p-6 transition-colors hover:border-line-strong">
							<div>
								<span className="font-mono text-[11px] uppercase tracking-wider text-signal-dim">
									{cap.tag}
								</span>
								<h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
									{cap.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-ink-dim">
									{cap.detail}
								</p>
							</div>
							<ul className="flex flex-wrap gap-2">
								{cap.stack.map((s) => (
									<li
										key={s}
										className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink-faint"
									>
										{s}
									</li>
								))}
							</ul>
						</article>
					</Reveal>
				))}
			</div>

			<Reveal delay={240}>
				<a
					href={profile.githubUrl}
					target="_blank"
					rel="noreferrer"
					className="group mt-10 inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-ink"
				>
					See more on GitHub
					<ArrowUpRight
						size={15}
						className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					/>
				</a>
			</Reveal>
		</section>
	);
}
