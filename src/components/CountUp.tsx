import { useEffect, useMemo, useState } from "react";
import { useInView } from "#/hooks/useInView";

// Splits "600+" / "$2B" / "11+ yrs" into prefix, number, suffix so only the
// numeric part animates and the decoration is preserved.
function parse(value: string) {
	const m = value.match(/^(\D*?)([\d.]+)(.*)$/);
	return m ? { prefix: m[1], target: Number(m[2]), suffix: m[3] } : null;
}

export function CountUp({
	value,
	duration = 1100,
}: {
	value: string;
	duration?: number;
}) {
	const parsed = useMemo(() => parse(value), [value]);
	const { ref, inView } = useInView<HTMLSpanElement>();
	const [n, setN] = useState(0);

	useEffect(() => {
		if (!parsed || !inView) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setN(parsed.target);
			return;
		}
		let raf = 0;
		const start = performance.now();
		const tick = (t: number) => {
			const p = Math.min((t - start) / duration, 1);
			const eased = 1 - (1 - p) ** 3; // easeOutCubic
			setN(Math.round(parsed.target * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, parsed, duration]);

	if (!parsed) return <span ref={ref}>{value}</span>;
	return (
		<span ref={ref} className="tabular-nums">
			{parsed.prefix}
			{n}
			{parsed.suffix}
		</span>
	);
}
