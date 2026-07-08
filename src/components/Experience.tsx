import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { experience } from "#/lib/content";

export function Experience() {
	return (
		<section id="experience" className="mx-auto max-w-5xl px-6 py-28">
			<SectionHeading index="02" title="experience" />

			<ol className="flex flex-col gap-6">
				{experience.map((job, i) => (
					<Reveal key={job.company} delay={i * 60}>
						<li>
							<Card className="gap-0 overflow-hidden rounded-lg border-line bg-panel py-0 shadow-none transition-colors hover:border-line-strong">
								<div className="flex items-center gap-2 border-b border-line px-5 py-3">
									<span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
									<span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
									<span
										className={`h-2.5 w-2.5 rounded-full ${job.current ? "bg-signal" : "bg-line-strong"}`}
									/>
									<span className="ml-3 truncate font-mono text-xs text-ink-faint">
										~/career/
										{job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
									</span>
								</div>

								<CardContent className="px-5 py-6 md:px-8">
									<div className="mb-4 flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
										<h3 className="font-display text-xl text-ink md:text-2xl">
											{job.role}{" "}
											<span className="text-ink-dim">— {job.company}</span>
										</h3>
										<p className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
											{job.period}
											{job.current && (
												<Badge className="bg-signal/10 text-signal hover:bg-signal/10">
													active
												</Badge>
											)}
										</p>
									</div>

									<ul className="flex flex-col gap-2.5">
										{job.bullets.map((bullet) => (
											<li
												key={bullet.slice(0, 32)}
												className="flex gap-3 text-sm leading-relaxed text-ink-dim"
											>
												<span className="mt-1 shrink-0 text-signal-dim">▸</span>
												{bullet}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</li>
					</Reveal>
				))}
			</ol>
		</section>
	);
}
