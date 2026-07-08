import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { education, skills } from "#/lib/content";

export function Skills() {
	return (
		<section id="skills" className="mx-auto max-w-5xl px-6 py-28">
			<SectionHeading index="03" title="skills" />

			<div className="grid gap-8 md:grid-cols-2">
				{skills.map((group, i) => (
					<Reveal key={group.group} delay={i * 50}>
						<Card className="rounded-lg border-line bg-panel py-6 shadow-none">
							<CardHeader>
								<CardTitle className="font-mono text-xs font-normal uppercase tracking-widest text-ink-faint">
									{group.group}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<Badge
										key={item}
										variant="outline"
										className="rounded-full border-line-strong px-3 py-1 text-xs text-ink-dim transition-colors hover:border-signal hover:text-signal"
									>
										{item}
									</Badge>
								))}
							</CardContent>
						</Card>
					</Reveal>
				))}

				<Reveal delay={skills.length * 50}>
					<Card className="h-full justify-center rounded-lg border-dashed border-line bg-transparent py-6 shadow-none">
						<CardContent>
							<h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
								Education
							</h3>
							<p className="font-display text-lg text-ink">
								{education.degree}
							</p>
							<p className="text-sm text-ink-dim">{education.school}</p>
							<p className="mt-1 font-mono text-xs text-ink-faint">
								{education.period}
							</p>
						</CardContent>
					</Card>
				</Reveal>
			</div>
		</section>
	);
}
