import { expect, test } from "vitest";
import { parseSSEChunk } from "./sse";

const evt = (content: string) =>
	`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n`;

test("extracts token deltas from complete lines", () => {
	const { tokens, done } = parseSSEChunk(`${evt("Hello")}${evt(" world")}\n`);
	expect(tokens).toEqual(["Hello", " world"]);
	expect(done).toBe(false);
});

test("carries an incomplete trailing line into rest", () => {
	const partial = 'data: {"choices":[{"delta":{"content":"Temp';
	const { tokens, rest } = parseSSEChunk(`${evt("A")}${partial}`);
	expect(tokens).toEqual(["A"]); // only the complete line parsed
	expect(rest).toBe(partial); // the half line is preserved, not dropped

	// Next read completes it — no token lost across the boundary.
	const next = parseSSEChunk(`${rest}oral"}}]}\n`);
	expect(next.tokens).toEqual(["Temporal"]);
});

test("detects [DONE] and ignores keep-alives / bad JSON", () => {
	const { tokens, done } = parseSSEChunk(`${evt("hi")}\ndata: [DONE]\n`);
	expect(tokens).toEqual(["hi"]);
	expect(done).toBe(true);

	expect(parseSSEChunk("data: not-json\n").tokens).toEqual([]);
});
