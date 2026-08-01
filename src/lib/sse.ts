/**
 * PHASE 4 — parsing a streamed Server-Sent-Events (SSE) response.
 *
 * OpenAI-compatible chat APIs stream tokens as SSE: newline-delimited lines of
 * the form `data: {json}`, plus a terminal `data: [DONE]`. But a single network
 * read can split a line in half, so we accumulate into a buffer and only parse
 * COMPLETE lines, carrying the incomplete trailing fragment (`rest`) into the
 * next read. Getting this boundary handling wrong is the classic streaming bug
 * (dropped or duplicated tokens), which is exactly why it's pulled out here and
 * unit-tested on its own.
 */
export function parseSSEChunk(buffer: string): {
	tokens: string[];
	rest: string;
	done: boolean;
} {
	const lines = buffer.split("\n");
	const rest = lines.pop() ?? ""; // last element may be a partial line
	const tokens: string[] = [];
	let done = false;

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed.startsWith("data:")) continue; // skip blanks / comments
		const data = trimmed.slice(5).trim();
		if (data === "[DONE]") {
			done = true;
			continue;
		}
		try {
			const token = JSON.parse(data)?.choices?.[0]?.delta?.content;
			if (token) tokens.push(token);
		} catch {
			// keep-alive or not-yet-complete JSON — safely ignored
		}
	}
	return { tokens, rest, done };
}
