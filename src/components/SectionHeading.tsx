import { Separator } from "#/components/ui/separator";

export function SectionHeading({
	index,
	title,
}: {
	index: string;
	title: string;
}) {
	return (
		<div className="mb-12 flex items-baseline gap-4">
			{/* biome-ignore lint/suspicious/noCommentText: intentional "// NN" label styled like a code comment */}
			<span className="font-mono text-sm text-signal-dim">// {index}</span>
			<h2 className="font-display text-3xl italic text-ink md:text-4xl">
				{title}
			</h2>
			<Separator className="w-auto flex-1 bg-line" />
		</div>
	);
}
