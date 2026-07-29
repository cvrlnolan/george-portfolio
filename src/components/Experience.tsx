import { ArrowUpRight } from "lucide-react";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { experience } from "#/lib/content";

export function Experience() {
	return (
		<section id="experience" className="mx-auto max-w-5xl px-6 py-32 md:py-40">
			<SectionHeading title="Experience" />

			<ol className="flex flex-col">
				{experience.map((job, i) => (
					<Reveal key={job.company} delay={i * 60}>
						<li className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[1fr_2.15fr] md:gap-12">
							<div>
								<p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
									{job.period}
								</p>
								<h3 className="mt-3 flex items-center gap-2.5 font-display text-xl font-medium tracking-tight text-ink">
									{job.url ? (
										<a
											href={job.url}
											target="_blank"
											rel="noreferrer"
											className="group/link inline-flex items-center gap-1 transition-colors hover:text-signal"
										>
											{job.company}
											<ArrowUpRight
												size={15}
												className="text-ink-faint transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-signal"
											/>
										</a>
									) : (
										job.company
									)}
									{job.current && (
										<span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
											<span className="h-1 w-1 rounded-full bg-signal" />
											current
										</span>
									)}
								</h3>
								<p className="mt-0.5 text-sm text-ink-dim">{job.role}</p>
								{job.subtitle && (
									<p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
										{job.subtitle}
									</p>
								)}
							</div>

							<ul className="flex flex-col gap-3">
								{job.bullets.map((bullet) => (
									<li
										key={bullet.slice(0, 32)}
										className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-dim"
									>
										<span className="mt-[0.6rem] h-px w-3 shrink-0 bg-line-strong" />
										<span>{bullet}</span>
									</li>
								))}
							</ul>
						</li>
					</Reveal>
				))}
			</ol>
		</section>
	);
}
