import { useEffect, useState } from "react";

// Tracks which section id is crossing the middle of the viewport.
export function useActiveSection(ids: string[]) {
	const [active, setActive] = useState("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(e.target.id);
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [ids]);

	return active;
}
