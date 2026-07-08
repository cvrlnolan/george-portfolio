export function Footer() {
	return (
		<footer className="border-t border-line px-6 py-8">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-ink-faint sm:flex-row">
				<p>© {new Date().getFullYear()} George Carl Yana Mbome.</p>
				<p>Built with TanStack Router, Vite &amp; Tailwind CSS.</p>
			</div>
		</footer>
	);
}
