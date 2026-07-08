import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "#/lib/content";

export function Hero() {
	return (
		<section
			id="top"
			className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-16"
		>
			<div className="scanline" />

			<div className="mx-auto w-full max-w-5xl">
				<p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
					<MapPin size={12} className="text-signal-dim" />
					{profile.location}
					<span className="text-line-strong">/</span>
					available for select engagements
				</p>

				<h1 className="font-display text-balance text-[clamp(2.75rem,9vw,6.5rem)] font-medium leading-[0.95] text-ink">
					George Carl
					<br />
					<span className="italic text-ink-dim">Yana Mbome</span>
				</h1>

				<div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-xl text-base leading-relaxed text-ink-dim">
						<span className="text-signal">&gt;</span> {profile.role} — shipping
						verification, billing, and process-automation systems end to end,
						from architecture through deployment.
					</p>

					<a
						href="#experience"
						className="group inline-flex shrink-0 items-center gap-2 self-start text-sm text-ink-dim transition-colors hover:text-signal md:self-auto"
					>
						scroll to see the work
						<ArrowDown
							size={14}
							className="transition-transform group-hover:translate-y-1"
						/>
					</a>
				</div>
			</div>
		</section>
	);
}
