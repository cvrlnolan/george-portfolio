/**
 * PHASE 3 — RETRIEVAL (cosine top-k).
 *
 * This is the "R" in RAG, and it's just linear algebra.
 *
 * COSINE SIMILARITY measures the angle between two vectors, ignoring their
 * length: 1 = same direction (same meaning), 0 = unrelated, -1 = opposite.
 *
 *     cos(a, b) = (a · b) / (|a| * |b|)
 *
 * We embed the question (Phase 2's model), score it against every precomputed
 * chunk vector, and keep the highest few. Those chunks become the context we
 * feed the LLM (Phase 4). No vector database — for 29 vectors a linear scan is
 * instant. (Pinecone exists for when you have millions and the scan gets slow;
 * the math it runs is the same.)
 */

export type StoredChunk = { id: string; text: string; embedding: number[] };

export function cosineSimilarity(a: number[], b: number[]): number {
	let dot = 0;
	let normA = 0;
	let normB = 0;
	for (let i = 0; i < a.length; i++) {
		dot += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}
	// Guard the zero vector so we return 0 instead of NaN.
	const denom = Math.sqrt(normA) * Math.sqrt(normB);
	return denom === 0 ? 0 : dot / denom;
}

/**
 * Score every chunk against the query embedding and return the top-k, most
 * similar first. `k` is a classic recall/noise tradeoff: too small can miss a
 * relevant fact, too large pads the prompt with weakly-related chunks.
 */
export function topK(
	queryEmbedding: number[],
	store: StoredChunk[],
	k = 5,
): (StoredChunk & { score: number })[] {
	return store
		.map((c) => ({
			...c,
			score: cosineSimilarity(queryEmbedding, c.embedding),
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, k);
}
