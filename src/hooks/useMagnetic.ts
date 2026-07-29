import { useEffect, useRef } from "react";

// Pulls an element toward the cursor while hovered. Writes transform directly
// (no re-render). Skips touch and reduced-motion.
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;

		const onMove = (e: MouseEvent) => {
			const r = el.getBoundingClientRect();
			const x = e.clientX - (r.left + r.width / 2);
			const y = e.clientY - (r.top + r.height / 2);
			el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
		};
		const onLeave = () => {
			el.style.transform = "";
		};

		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, [strength]);

	return ref;
}
