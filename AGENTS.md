<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Centro de Mando Cripto — rules for every agent (Claude and Codex)

## Project
- Personal crypto dashboard to LEARN and PROTECT money. **Paper trading only (simulated). Zero real money.**
- Stack: Next.js 16 (Vercel), Supabase (Postgres, Auth, pg_cron, Edge Functions), CoinGecko Demo API.
- Work happens in phases (see README.md). Finish a phase, show it, wait for the owner's approval.
- The owner is a beginner: user-facing text and explanations in **Spanish**, simple words.

## Hard rules (never break)
- **Never** write code that places real orders on any exchange without the owner's explicit written approval.
- Only the top 100 coins by market cap.
- **No secrets in the repo.** All keys live in env vars (Vercel / Supabase). `.env*` is gitignored; only `.env.example` (no real values) is committed.
- The `service_role` / `sb_secret_...` key is **server-only**: never in browser code, never `NEXT_PUBLIC_`.
- **Row Level Security enabled on every Supabase table**, with policies that only allow the owner.
- Every dashboard page requires login (`requireUser()` in `src/lib/auth.ts` plus `src/proxy.ts`). No public sign-up.

## How to change things
- Schema changes **only** via migration files in `supabase/migrations/`. Apply to **DEV first**; production only with the owner's approval, after confirming a backup or PITR exists.
- Before finishing: `npm run lint` and `npm run build` must pass.
- Keep changes scoped to the task or plan you were given. Do not refactor unrelated code.

## Workflow: Claude plans, Codex builds
- Plans live in `docs/plans/` (one Markdown file per task).
- Codex implements a plan with: `codex exec --sandbox workspace-write "Implement docs/plans/<file>.md"`.
- Claude reviews Codex's diff (correctness, security rules above, lint/build) before anything is committed or deployed.
