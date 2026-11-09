# Architecture

## Rendering model

Static export. A client-side stage reads one eased scroll value `u` (screens, 1 screen = one stage height) and every scene is a pure function of `u`. Constants live in `src/config/timeline.ts`; helpers (`seg`, `ease`, `panel`, lerp) will live in `src/engine/` as tested pure functions.

## Scaling

Desktop stage is designed at 1440x900. `--u = min(100vw/1440, 100svh/900)` turns each designed pixel into `calc(N * var(--u))`, so layouts scale 1:1 with the design at any desktop size. Mobile uses `--m = 100vw/390`. Components write `calc(N * var(--s))`, where `--s` is `--u` on desktop and `--m` under 768px. Tokens (colour, type, spacing, radius) come from `src/styles/tokens.css`.

## Modes

- **Guided** (desktop and tablet default): sticky stage plus a spacer of `TOTAL_SCREENS` stage heights; panels wipe up with 40px corners straightening to 0.
- **Free scroll** (`src/free`): the same chapters as ordinary in-flow sections that ease in once (`useReveal`), with counters that count up; native scroll, no pin, lerp or parallax. `--s` there scales with viewport width only. The section under the header sets `data-tone` so the header and cursor adapt. Toggle lives in the Index overlay; the choice is stored in `localStorage` (try/catch). Reduced motion starts in free mode.
- **Mobile** (narrower than 768px, or any portrait screen): the same pinned stage and timeline, composed for a 390x844 frame. Scenes switch geometry with `useMode().isMobile` and typography with the shared `@media (max-width: 767px), (max-aspect-ratio: 1/1)` query.

## Overlays

Index, case study and 404 use a presence pattern: mount, enter, exit, unmount after the exit finishes. They trap focus, close on `Esc` and restore focus.

## Content

Copy in `src/content/en.ts`, case studies in `work.ts`, photos in `photos.ts`, contact facts in `src/config/site.ts`. `t()` is the only accessor.

## Design frame

Scenes are laid out in design pixels inside `.frame` (`src/components/frame`), a box of 1440x900 (390x844 on mobile) times `--s` that stays centred in the viewport. Grounds, panels and photographs go full-bleed outside it. `--frame-x` and `--frame-y` give its offset; the header uses them too.

## Launch and greeting

`src/scenes/launch` plays once per session (`sessionStorage`); reduced motion shows the wordmark for 300ms. Timings come from `src/config/motion.ts` and `launch-schedule.ts`. The visitor's first name is sanitised, kept only in `localStorage` and returns in Contact (`src/engine/greeting.tsx`).

## Performance notes

- One rAF loop eases scroll into `u`; React subscribers re-render only when `u` changes by more than 0.0005. Chrome that reads a single threshold uses `useUSelect` and re-renders only when that value flips.
- Each scene returns `null` outside its range, so only the visible scenes exist in the DOM. Only `transform`, `opacity` and `clip-path` are animated; `will-change` is set only on moving elements.
- Photographs are warmed while the browser is idle; below-the-fold case images are lazy.
- `tests/e2e/story.spec.ts` fails if a long task (over 120ms) appears while scrolling the whole story.
