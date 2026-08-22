import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { education, skills } from "#/lib/content";

export function Engineering() {
	return (
		<section id="engineering" className="mx-auto max-w-5xl px-6 py-32 md:py-40">
			<SectionHeading title="Engineering" />

			<div className="flex flex-col divide-y divide-line">
				{skills.map((group, i) => (
					<Reveal key={group.group} delay={i * 40}>
						<div className="grid gap-4 py-7 first:pt-0 md:grid-cols-[1fr_3fr] md:gap-10">
							<h3 className="pt-1 font-mono text-xs uppercase tracking-wider text-ink-faint">
								{group.group}
							</h3>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<span
										key={item}
										className="rounded-full border border-line px-3 py-1 text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					</Reveal>
				))}

				<Reveal delay={skills.length * 40}>
					<div className="grid gap-4 py-7 md:grid-cols-[1fr_3fr] md:gap-10">
						<h3 className="pt-1 font-mono text-xs uppercase tracking-wider text-ink-faint">
							Education
						</h3>
						<div>
							<p className="font-display text-lg font-medium text-ink">
								{education.degree}
							</p>
							<p className="mt-0.5 text-sm text-ink-dim">{education.school}</p>
							<p className="mt-1 font-mono text-xs text-ink-faint">
								{education.period}
							</p>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
