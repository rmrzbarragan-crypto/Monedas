# Plans (Claude plans, Codex builds)

One Markdown file per task, written by Claude, implemented by Codex, reviewed by Claude.

## Plan template

```md
# <Phase / task name>

## Goal
What this delivers, in one or two sentences.

## Files to create or change
- path/to/file — what goes in it

## Rules that apply
Point to the relevant hard rules in AGENTS.md (RLS, no secrets, paper trading only, ...).

## Steps
1. ...

## Done when
- [ ] `npm run lint` and `npm run build` pass
- [ ] <how to test it by hand>
```

## Running a plan

```bash
codex exec --sandbox workspace-write "Implement docs/plans/<file>.md. Follow AGENTS.md. Do not commit."
```

Claude then reviews the diff (`git diff`), runs lint and build, and reports to the owner before anything is committed.
