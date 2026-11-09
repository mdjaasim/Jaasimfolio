# Jaasim Portfolio

Personal portfolio of Mohamed Jaasim, full stack mobile & web developer (Dubai). One continuous, scroll-told story with a launch sequence, a personalised hello, a yellow ball cursor and a code-tag logo (`<JAASIM>` to `<J/>`).

- **Guided story** (default on desktop and tablet): a pinned stage driven by scroll.
- **Free scroll**: the same scenes as ordinary sections, no scroll hijack. Chosen from the Index overlay, and automatic with reduced motion.
- **Mobile**: scroll-driven frames composed for 390x844 (phones and any portrait screen).

## Stack

Next.js (App Router, static export), React, strict TypeScript, CSS Modules plus design tokens, Vitest, Playwright.

## Scripts

| Command                               | What it does                                     |
| ------------------------------------- | ------------------------------------------------ |
| `npm run dev`                         | Dev server                                       |
| `npm run build`                       | Static export to `out/`                          |
| `npm run typecheck` / `lint` / `test` | Checks                                           |
| `npm run test:e2e`                    | Playwright (desktop 1440x900 and mobile 390x844) |
| `npm run check`                       | Typecheck, lint, unit tests and build            |

## Layout

```
design/         approved design sources (canvas boards, design system, photos); read-only reference
src/app         routes, layout, fonts
src/content     all copy, case studies, photo registry
src/config      site facts, timeline, motion
src/styles      tokens.css (from the design system) and globals
src/engine      scroll timeline and mode logic
src/scenes      one module per chapter
src/components  shared UI (Logo, Cursor, overlays, ...)
docs/           architecture, design handoff, content guide, motion, deployment
```

## Docs

[Design handoff](docs/design-handoff.md) · [Architecture](docs/architecture.md) · [Content guide](docs/content-guide.md) · [Motion](docs/motion.md) · [Deployment](docs/deployment.md) · [Contributing](CONTRIBUTING.md)
