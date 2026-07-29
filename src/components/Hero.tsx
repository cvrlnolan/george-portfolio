import { ArrowUpRight } from "lucide-react";
import { Typewriter } from "#/components/Typewriter";
import { Button } from "#/components/ui/button";
import { useMagnetic } from "#/hooks/useMagnetic";
import { profile } from "#/lib/content";

const roles = [
	"Senior Software Engineer",
	"LLM & agent systems",
	"Temporal-orchestrated infrastructure",
	"Full-stack · TypeScript & Python",
];

export function Hero() {
	const cta = useMagnetic<HTMLAnchorElement>();

	return (
		<section
			id="top"
			className="relative flex min-h-[100dvh] flex-col justify-center px-6 pt-24 pb-20"
		>
			<div className="mx-auto w-full max-w-5xl">
				<p className="mb-8 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
					{profile.location} · open to new opportunities
				</p>

				<h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.9] tracking-tight text-ink">
					George Mbome
				</h1>

				<p className="mt-6 flex items-center gap-2 font-mono text-sm text-ink-dim md:text-base">
					<span className="text-signal">›</span>
					<Typewriter words={roles} />
				</p>

				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
					Senior Software Engineer building LLM-powered product features and the
					Temporal-orchestrated infrastructure that runs them, from architecture
					through deployment and scale.
				</p>

				<div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
					<Button
						asChild
						className="h-11 rounded-full bg-signal px-6 text-sm font-medium text-void transition-transform duration-200 ease-out will-change-transform hover:bg-signal/90"
					>
						<a ref={cta} href="#experience">
							View experience
						</a>
					</Button>
					<a
						href={profile.resumeUrl}
						download
						className="group inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-ink"
					>
						Download résumé
						<ArrowUpRight
							size={15}
							className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</a>
				</div>
			</div>
		</section>
	);
}
