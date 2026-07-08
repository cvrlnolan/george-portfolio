import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { profile, stats } from "#/lib/content";

export function About() {
	return (
		<section id="about" className="mx-auto max-w-5xl px-6 py-28">
			<SectionHeading index="01" title="about" />

			<div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
				<Reveal>
					<p className="text-balance font-display text-2xl font-light leading-relaxed text-ink md:text-3xl">
						{profile.summary}
					</p>
				</Reveal>

				<Reveal delay={120}>
					<dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="flex flex-col gap-1 bg-panel px-5 py-6"
							>
								<dt className="order-2 text-xs uppercase tracking-widest text-ink-faint">
									{stat.label}
								</dt>
								<dd className="order-1 font-display text-3xl text-signal">
									{stat.value}
								</dd>
							</div>
						))}
					</dl>
				</Reveal>
			</div>
		</section>
	);
}
