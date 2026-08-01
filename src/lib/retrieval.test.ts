import { expect, test } from "vitest";
import { cosineSimilarity, type StoredChunk, topK } from "./retrieval";

test("cosine: identical=1, orthogonal=0, opposite=-1", () => {
	expect(cosineSimilarity([1, 0, 0], [1, 0, 0])).toBeCloseTo(1);
	expect(cosineSimilarity([1, 0, 0], [0, 1, 0])).toBeCloseTo(0);
	expect(cosineSimilarity([1, 0, 0], [-1, 0, 0])).toBeCloseTo(-1);
});

test("cosine: zero vector -> 0, not NaN", () => {
	expect(cosineSimilarity([0, 0, 0], [1, 2, 3])).toBe(0);
});

test("topK ranks the semantically nearest chunk first", () => {
	// Synthetic 3-dim vectors stand in for real embeddings: each axis is a
	// "topic". A query leaning toward the Temporal axis must retrieve it.
	const store: StoredChunk[] = [
		{ id: "temporal", text: "...Temporal workflows...", embedding: [1, 0, 0] },
		{ id: "billing", text: "...billing engine...", embedding: [0, 1, 0] },
		{ id: "education", text: "...B.Sc...", embedding: [0, 0, 1] },
	];
	const query = [0.9, 0.1, 0]; // clearly nearest the Temporal axis

	const results = topK(query, store, 2);
	expect(results).toHaveLength(2);
	expect(results[0].id).toBe("temporal");
	expect(results[0].score).toBeGreaterThan(results[1].score);
});
