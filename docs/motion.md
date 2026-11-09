# Motion

The full spec is `design/design-system/motion.md`; the numbers are in `src/config/motion.ts` and `src/config/timeline.ts`.

Rules: house easing `cubic-bezier(.2,.8,.2,1)`, big reveals `cubic-bezier(.7,0,.2,1)`, shutters `cubic-bezier(.45,.05,.3,1)`. Entrances 700 to 1000ms with a 48px rise. Animate only transform, opacity and clip-path. Never instant: overlays stay mounted while they leave. At most three parallax layers per scene. Reduced motion or free scroll: no pin, lerp, parallax or cursor effects; content fades in over 200ms; the launch shows the wordmark for 300ms.
