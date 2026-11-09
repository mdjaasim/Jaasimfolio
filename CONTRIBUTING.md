# Contributing

1. `npm install` (Node 20.9 or newer). Husky installs the git hooks.
2. Read [AGENTS.md](AGENTS.md). The rules there apply to people and tools alike.
3. Branch, make the change, and run `npm run check`.
4. Commit with a Conventional Commit message. The commit-msg hook enforces it. Commits carry only the author's own name: no co-author trailers or tool attribution.
5. Update `CHANGELOG.md` and the docs when behaviour changes.
