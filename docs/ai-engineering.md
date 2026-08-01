# AI Engineering notes — the "Ask George" RAG assistant

These are the primitives that separate a full-stack engineer from an AI
engineer. This feature is a real, minimal RAG app; each phase below builds one
primitive and maps it to the file that implements it.

## The mental model

An LLM only knows two things: what it was trained on, and what you put in its
**context window** right now. It knows nothing about George. RAG
(Retrieval-Augmented Generation) is how you feed it the right private facts at
the right moment:

```
retrieve  -> assemble context -> generate -> guard -> evaluate
(embed +     (chunk + rank +      (prompt +   (caps +   (right chunk
 similarity)  fit the window)      stream)     topic)     retrieved?)
```

Every phase is one arrow.

| Phase | Primitive                                 | File                                           |
| ----- | ----------------------------------------- | ---------------------------------------------- |
| 1     | Chunking                                  | `src/lib/knowledge-source.ts`                  |
| 2     | Embeddings + vector store                 | `scripts/embed.ts` -> `src/lib/knowledge.json` |
| 3     | Retrieval (cosine top-k)                  | `src/lib/retrieval.ts` + test                  |
| 4     | Context assembly + generation (streaming) | `api/ask.ts`                                   |
| 5     | Guardrails (caps, topic lock, rate limit) | `api/ask.ts`                                   |
| 6     | Streaming UI                              | `src/components/AskGeorge.tsx`                 |

---

## Phase 1 — Chunking

**The idea.** Retrieval returns whole chunks, so the chunk is the atomic unit of
your knowledge. Chunk design is the highest-leverage decision in a small RAG
system — more than the model choice.

**Two failure modes:**

- _Chunk too big_ → you retrieve a paragraph to answer a one-line question; the
  extra text is noise that dilutes the model's attention and burns context budget.
- _Chunk too small_ → the chunk is meaningless alone. `"59% coverage"` retrieves
  for the right query but the model can't tell you 59% of _what_.

**The move most people miss: enrichment.** A chunk is retrieved _alone_, stripped
of the document it came from. So bake the identifying context into the text
itself. We don't store the bare bullet `"Orchestrated LLM workloads…"`. We store:

> `Invisible Technologies · Senior Software Engineer (Dec 2021 - Jul 2026). Orchestrated LLM workloads (embedding generation, OpenAI extraction, retries) through Temporal workflows…`

Now the chunk answers "where did he use Temporal?" on its own.

**What we did:** one chunk per fact (job bullet, skill group, capability,
education) derived from `content.ts` so the résumé stays the single source of
truth, plus hand-written facts a résumé never states (availability, contact,
career focus, and a self-referential note explaining this very feature). 29
chunks total.

**Why derive from `content.ts` instead of a copy:** duplicated knowledge drifts.
When George updates a bullet, the chunk updates for free. DRY applies to
knowledge bases too.

---

## Phase 2 — Embeddings + the vector store

**The idea.** An embedding model maps text to a vector of floats
(`text-embedding-3-small` → 1536 dims). The vector encodes _meaning_: run two
texts through the same model and texts about the same thing get vectors pointing
in nearly the same direction, even with no shared words. That direction match is
what powers semantic retrieval — keyword search would miss
`"Temporal?"` → `"Orchestrated LLM workloads through Temporal workflows"` if the
casing or phrasing differed; embeddings don't.

**Build-time vs query-time — the key split.**

- _Build time_ (`pnpm embed`): embed all 29 chunks once, write
  `src/lib/knowledge.json` = `[{ id, text, embedding }]`. This is the "vector
  store" — just a JSON file, because 29 vectors don't need Pinecone.
- _Query time_ (the edge function): embed only the incoming question — one small
  API call — then compare against the precomputed vectors.

Precomputing is why this is cheap: the expensive part (embedding the corpus)
happens once at deploy, not on every visit.

**Cost intuition.** `text-embedding-3-small` is ~$0.02 per 1M tokens. The whole
corpus is a few thousand tokens, so a full re-embed costs a fraction of a cent;
each query embed is a rounding error. This is why embeddings are "free" in
practice and worth reaching for.

**Runner note.** Build scripts are TypeScript too. `tsx` runs a `.ts` file
directly (type-strip + esbuild under the hood) so the script can import the same
`knowledge-source.ts` the app uses — one source of truth, no duplicated chunking
logic in a separate `.js`.

---

## Phase 3 — Retrieval (cosine top-k)

**The idea.** Retrieval is linear algebra, not a black box. Cosine similarity is
the cosine of the angle between two vectors:

```
cos(a, b) = (a · b) / (|a| · |b|)      1 = same meaning, 0 = unrelated
```

Embed the question, score it against all 29 chunk vectors, keep the top few.
That ranked list _is_ the retrieval step. `src/lib/retrieval.ts` is ~15 lines.

**`k` is a tradeoff.** top-k too small → you can miss a relevant fact (low
recall). Too large → the prompt fills with weakly-related chunks that distract
the model and cost tokens. We use k=5 for a 29-chunk corpus.

**Do you even need a vector DB?** No — for thousands of vectors a linear scan is
microseconds. Pinecone/pgvector earn their keep at millions of vectors, where an
approximate-nearest-neighbor index beats a full scan. The _math they run is the
same cosine_. Knowing when you don't need the heavy tool is the senior move.

**Testing retrieval (the "evaluate" primitive).** You can unit-test retrieval
without any API: feed synthetic vectors where each axis is a "topic", query one
axis, assert the matching chunk ranks first (`retrieval.test.ts`). In a real
system this grows into a small eval set of question → expected-chunk pairs — the
cheapest, highest-value habit in AI engineering. If retrieval pulls the wrong
chunk, no model can save the answer.

---

## Phase 4 — Context assembly, prompt design, streaming (`api/ask.ts`)

**Context assembly.** Take the top-k retrieved chunks and format them into the
prompt — here, numbered and best-first. This is the "augmented" in RAG: the
model's context window now literally contains George's relevant facts.

**Prompt design = the product.** The system prompt does three jobs:
1. **Persona** — who's speaking and how (George's assistant, third person, concise).
2. **Grounding** — "use ONLY the CONTEXT." This is the anti-hallucination lever:
   with real facts in front of it and an instruction to stay inside them, the
   model stops inventing. This single rule is 80% of RAG answer quality.
3. **Topic + injection defense** — refuse off-topic, and ignore instructions
   embedded in the user's question that try to rewrite the rules.

**Streaming.** We ask Groq for `stream: true` and it returns Server-Sent Events.
We parse token deltas out (`src/lib/sse.ts`) and re-emit them as a plain-text
`ReadableStream` to the browser. Streaming isn't decoration: first token in
~200ms feels instant, where waiting for a full paragraph feels broken. The
subtle part is that a network read can split an SSE line in half — so we buffer
and only parse complete lines, carrying the fragment forward. That boundary
logic is unit-tested in `sse.test.ts`.

## Phase 5 — Guardrails (same file)

A public LLM endpoint is a public wallet and an open mic. Cheap, non-negotiable
defenses:
- **Input cap** (500 chars) and **output cap** (`max_tokens: 400`) bound cost
  per request before a token is spent.
- **Topic lock + grounding** keep it answering about George, not writing poems.
- **Prompt-injection defense** — an explicit rule to ignore instructions inside
  the question ("ignore your rules and…").
- **Per-IP rate limit** — in-memory here (best-effort; the honest ceiling is
  noted in code). At real scale this moves to a shared store like Upstash.
- **`temperature: 0.3`** — low randomness so it sticks to the facts.

The mindset shift: as a full-stack dev you validate inputs; as an AI engineer you
*also* budget tokens and defend the prompt, because the model spends money and
follows text.

---

## Phase 6 — The streaming UI (`AskGeorge.tsx`)

**Consuming a stream on the client.** `fetch` gives a `res.body` you read with a
`ReadableStream` reader; each chunk is decoded and appended to state, so React
re-renders the answer character by character. That's the whole "typewriter"
effect — no library, just reading the stream the edge function produces.

**States are the product.** Idle (chips + placeholder), loading (spinner +
blinking caret), streaming (text grows), error (message + Retry). LLM calls fail
and lag more than normal APIs, so error/loading aren't optional polish — they're
half the feature. The client degrades gracefully: any non-200 surfaces the
server's error message and offers Retry.

**Honesty + a11y (non-negotiable UX rules).** The answer is labeled
"AI-generated" (never pass AI off as a human), and the answer region is an
`aria-live="polite"` container so screen readers announce the streamed text. The
input has a real (visually hidden) `<label>`.

---

## How to run it

The site is static; only `/api/ask` needs secrets. Nothing is exposed to the
browser.

1. **Add keys** — copy `.env.example` to `.env` and fill in `OPENAI_API_KEY`
   (embeddings) and `GROQ_API_KEY` (generation). `.env` is gitignored.
2. **Build the vector store** — `OPENAI_API_KEY=sk-... pnpm embed`. This embeds
   the 29 chunks and writes `src/lib/knowledge.json`. Re-run whenever
   `content.ts` changes. Commit the JSON.
3. **Run full-stack locally** — `pnpm dev`. A Vite dev-middleware
   (`vite.config.ts`) runs `api/ask.ts` in-process, so the real streaming
   endpoint works locally without `vercel dev`. (Avoid `vercel dev` here: its
   catch-all SPA rewrite serves `index.html` for JS module requests and breaks
   the dev server.)
4. **Deploy** — set both keys in Vercel Project Settings → Environment
   Variables. The function deploys automatically from `/api`; the SPA rewrite
   doesn't touch it because Vercel matches functions before applying rewrites.

### Cost
Groq generation: free tier. OpenAI embeddings: fractions of a cent for a full
re-embed, a rounding error per query. Effectively free at portfolio traffic.
