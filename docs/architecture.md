# Architecture

## Rendering model

Static export. A client-side stage reads one eased scroll value `u` (screens, 1 screen = one stage height) and every scene is a pure function of `u`. Constants live in `src/config/timeline.ts`; helpers (`seg`, `ease`, `panel`, lerp) will live in `src/engine/` as tested pure functions.

## Scaling

Desktop stage is designed at 1440x900. `--u = min(100vw/1440, 100svh/900)` turns each designed pixel into `calc(N * var(--u))`, so layouts scale 1:1 with the design at any desktop size. Mobile uses `--m = 100vw/390`. Components write `calc(N * var(--s))`, where `--s` is `--u` on desktop and `--m` under 768px. Tokens (colour, type, spacing, radius) come from `src/styles/tokens.css`.

## Modes

- **Guided** (desktop and tablet default): sticky stage plus a spacer of `TOTAL_SCREENS` stage heights; panels wipe up with 40px corners straightening to 0.
- **Free scroll**: the same scene components laid out as stacked sections that reveal on entering the viewport (IntersectionObserver); native scroll, no pin, lerp or parallax. Toggle lives in the Index overlay; the choice is stored in `localStorage` (try/catch). Reduced motion starts in free mode.
- **Mobile (up to 767px)**: scroll-driven frames: each mobile board is a pinned frame whose progress comes from scroll, using the same timeline utilities.

## Overlays

Index, case study and 404 use a presence pattern: mount, enter, exit, unmount after the exit finishes. They trap focus, close on `Esc` and restore focus.

## Content

Copy in `src/content/en.ts`, case studies in `work.ts`, photos in `photos.ts`, contact facts in `src/config/site.ts`. `t()` is the only accessor.
