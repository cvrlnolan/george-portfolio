import { ArrowUp, Loader2, RotateCw, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useMagnetic } from "#/hooks/useMagnetic";
import { profile } from "#/lib/content";

const suggestions = [
	"What did you build at Invisible?",
	"Tell me about your AI/LLM experience.",
	"What systems have you designed?",
	"What's your strongest technical area?",
	"Tell me about the expert search system.",
];

export function AskGeorge() {
	const [input, setInput] = useState("");
	const [answer, setAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [lastQuestion, setLastQuestion] = useState("");
	const send = useMagnetic<HTMLButtonElement>(0.25);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	async function ask(raw: string) {
		const question = raw.trim();
		if (!question || loading) return;
		setLastQuestion(question);
		setInput("");
		setAnswer("");
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/ask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ question }),
			});
			if (!res.ok || !res.body) {
				const j = await res.json().catch(() => ({}));
				throw new Error(j.error || "Something went wrong. Try again.");
			}
			// Read the plain-text token stream and append as it arrives.
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				setAnswer((a) => a + decoder.decode(value, { stream: true }));
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			ask(input);
		}
	};

	const showAnswer = loading || answer || error;

	return (
		<section
			id="top"
			className="relative flex min-h-dvh flex-col justify-center px-6 pt-28 pb-20"
		>
			<div className="mx-auto w-full max-w-2xl text-center">
				<p className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
					<span className="h-1.5 w-1.5 rounded-full bg-signal" />
					{profile.role} · {profile.location} · open to work
				</p>

				<h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-ink">
					{profile.name}
				</h1>

				<p className="mx-auto mt-5 max-w-lg text-lg text-ink-dim">
					{profile.positioning}
				</p>

				{/* AI assistant — secondary to the professional identity above */}
				<div className="mx-auto mt-10 max-w-md">
					<h2 className="font-display text-lg font-medium text-ink">
						Ask about my experience
					</h2>
					<p className="mt-1.5 text-sm text-ink-dim">
						AI-powered answers grounded in my actual work and engineering
						experience.
					</p>
				</div>

				{/* Prompt */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						ask(input);
					}}
					className="relative mt-9"
				>
					<label htmlFor="ask-input" className="sr-only">
						Ask George a question
					</label>
					<textarea
						id="ask-input"
						ref={inputRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={onKeyDown}
						rows={1}
						maxLength={500}
						placeholder="Ask about my experience, stack, or availability…"
						className="min-h-14 w-full resize-none rounded-2xl border border-line bg-panel px-5 py-4 pr-16 text-left text-[0.975rem] leading-relaxed text-ink placeholder:text-ink-faint focus:border-line-strong focus:outline-none"
					/>
					<button
						ref={send}
						type="submit"
						disabled={loading || !input.trim()}
						aria-label="Ask"
						className="absolute right-3 top-1/2 -mt-4.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-signal text-void transition-[transform,opacity] duration-200 ease-out will-change-transform hover:bg-signal/90 disabled:cursor-not-allowed disabled:opacity-30"
					>
						{loading ? (
							<Loader2 size={17} className="animate-spin" />
						) : (
							<ArrowUp size={17} />
						)}
					</button>
				</form>

				{/* Suggestions */}
				<div className="mt-4 flex flex-wrap justify-center gap-2">
					{suggestions.map((q) => (
						<button
							key={q}
							type="button"
							onClick={() => ask(q)}
							disabled={loading}
							className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-dim transition-colors hover:border-line-strong hover:text-ink disabled:opacity-40"
						>
							{q}
						</button>
					))}
				</div>

				{/* Answer */}
				{showAnswer && (
					<div className="mt-8 rounded-2xl border border-line bg-panel/50 p-5 text-left">
						<div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
							<Sparkles size={13} className="text-signal" />
							AI-generated · from George's real experience
						</div>
						{lastQuestion && (
							<p className="mb-2 text-sm text-ink-dim">“{lastQuestion}”</p>
						)}
						<div aria-live="polite" aria-atomic="false">
							{error ? (
								<p className="text-sm text-danger">
									{error}{" "}
									<button
										type="button"
										onClick={() => ask(lastQuestion)}
										className="inline-flex items-center gap-1 text-ink underline decoration-line-strong underline-offset-2 hover:decoration-signal"
									>
										<RotateCw size={12} /> Retry
									</button>
								</p>
							) : (
								<p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-ink">
									{answer}
									{loading && (
										<span className="cursor-blink ml-0.5 text-signal">▍</span>
									)}
								</p>
							)}
						</div>
					</div>
				)}

				{/* Secondary actions */}
				<div className="mt-10 flex items-center justify-center gap-6 text-sm">
					<a
						href={profile.resumeUrl}
						download
						className="text-ink-dim transition-colors hover:text-ink"
					>
						Download résumé ↓
					</a>
					<a
						href="#experience"
						className="text-ink-dim transition-colors hover:text-ink"
					>
						View experience
					</a>
				</div>
			</div>
		</section>
	);
}
