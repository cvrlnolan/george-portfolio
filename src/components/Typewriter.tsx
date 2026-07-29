import { useEffect, useState } from "react";

const reduced =
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types each word in, holds, deletes, moves to the next. Reduced-motion shows
// the first word statically.
export function Typewriter({
	words,
	className = "",
}: {
	words: string[];
	className?: string;
}) {
	const [i, setI] = useState(0);
	const [text, setText] = useState(reduced ? words[0] : "");
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (reduced) return;
		const word = words[i % words.length];

		if (!deleting && text === word) {
			const t = setTimeout(() => setDeleting(true), 1700);
			return () => clearTimeout(t);
		}
		if (deleting && text === "") {
			setDeleting(false);
			setI((n) => (n + 1) % words.length);
			return;
		}
		const t = setTimeout(
			() =>
				setText(
					deleting
						? word.slice(0, text.length - 1)
						: word.slice(0, text.length + 1),
				),
			deleting ? 38 : 68,
		);
		return () => clearTimeout(t);
	}, [text, deleting, i, words]);

	return (
		<span className={className}>
			{text}
			<span className="cursor-blink text-signal">_</span>
		</span>
	);
}
