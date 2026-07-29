import { CountUp } from "#/components/CountUp";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { profile, stats } from "#/lib/content";

export function About() {
	return (
		<section id="about" className="mx-auto max-w-5xl px-6 py-32 md:py-40">
			<SectionHeading title="About" />

			<div className="grid gap-14 md:grid-cols-[1.45fr_1fr] md:gap-20">
				<Reveal>
					<p className="text-balance text-2xl font-light leading-snug text-ink md:text-[1.75rem]">
						{profile.summary}
					</p>
				</Reveal>

				<Reveal delay={120}>
					<dl className="grid grid-cols-2 gap-x-8 gap-y-10">
						{stats.map((stat) => (
							<div key={stat.label}>
								<dd className="font-display text-4xl font-semibold tracking-tight text-ink">
									<CountUp value={stat.value} />
								</dd>
								<dt className="mt-1.5 text-sm leading-snug text-ink-faint">
									{stat.label}
								</dt>
							</div>
						))}
					</dl>
				</Reveal>
			</div>
		</section>
	);
}
