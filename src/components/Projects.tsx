import { Lock } from "lucide-react";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { profile } from "#/lib/content";

const placeholders = ["case-study-01", "case-study-02", "case-study-03"];

export function Projects() {
	return (
		<section id="projects" className="mx-auto max-w-5xl px-6 py-28">
			<SectionHeading index="04" title="projects" />

			<Reveal>
				<p className="mb-8 max-w-xl text-sm leading-relaxed text-ink-dim">
					Case studies are being written up and cleared for public sharing —
					most of my recent work sits behind client and employer NDAs. In the
					meantime, take a look at{" "}
					<a
						href={profile.githubUrl}
						target="_blank"
						rel="noreferrer"
						className="text-signal underline decoration-signal-dim underline-offset-4"
					>
						{profile.github}
					</a>
					.
				</p>
			</Reveal>

			<div className="grid gap-4 md:grid-cols-3">
				{placeholders.map((slug, i) => (
					<Reveal key={slug} delay={i * 60}>
						<Card className="h-48 justify-between rounded-lg border-dashed border-line bg-panel/50 py-5 shadow-none">
							<CardContent className="flex h-full flex-col justify-between">
								<div className="flex items-center justify-between">
									<span className="font-mono text-xs text-ink-faint">
										{slug}
									</span>
									<Lock size={14} className="text-ink-faint" />
								</div>
								<div>
									<p className="font-display text-lg italic text-ink-faint">
										in progress
									</p>
									<Badge
										variant="outline"
										className="mt-1 border-line-strong text-xs text-ink-faint"
									>
										under NDA · not yet disclosed
									</Badge>
								</div>
							</CardContent>
						</Card>
					</Reveal>
				))}
			</div>
		</section>
	);
}
