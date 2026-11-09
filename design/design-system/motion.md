# Motion

Motion is how the story is told; it is never decoration. These rules apply to every scene in the Storyboard.

## Engine
- One pinned stage. Scroll position is converted to screens and eased with a frame-rate independent lerp (about 6 per second), so every scroll-linked element glides rather than snaps. All scene animation is a function of scroll position, never a timer, except the launch and overlays.
- Pin budget: Craft (about 5 screens), Lab (about 3 screens, horizontal) and Path (about 3 screens). Everything else is a wipe between scenes.
- Ground wipes: a panel rises from the bottom with 40px top corners that straighten to 0 as it covers the screen.

## Timing and easing
- House curve: `cubic-bezier(.2,.8,.2,1)` for entrances and UI. Big reveals and wipes: `cubic-bezier(.7,0,.2,1)`. Slow shutters: `cubic-bezier(.45,.05,.3,1)`.
- Entrances 700 to 1000ms with a 48px rise; staggers 50 to 150ms. Hover and small UI 250 to 400ms.
- Never instant: overlays and sub-screens slide, expand or fade in and out. Every overlay stays mounted while it leaves so its exit plays.

## Launch
- Ten word and photograph pairs at 150ms; shutters start at 3.0s and last 2.8s while 46 cuts accelerate from 150ms to 35ms; grid 5.9s; letters written 6.1s onward (60ms apart); tags at 7.9s; curtain at 8.4s for 900ms; total about 9.3s.

## Header logo
- `<JAASIM>` to `<J/>` over scroll 0.04 to 0.5 screens: AASIM max-width 112px to 0, opacity out, 18px left drift; a slash fades in before the closing tag (max-width 0 to 16px).

## Name field
- Fake blinking line while idle; native caret on focus; the field grows by one character per letter; Enter or blur commits; the greeting fades in over 700ms.

## Cursor
- Follow lag about 15 per second, stretch with speed, trail of ghosts each fading over about 0.6s. Press: 68% scale and 5px gather. Release: toss up about 70px, gravity 2300 px/s², bounce 0.56, soft spring squash. Hover 2.6x (links) and 5.2x with View. Ink on yellow. Hidden on touch and for reduced motion.

## Overlays
- Index: slide up 900ms, items rise 800ms with 50ms stagger, side column fades in after 450ms.
- Case study: expand 1000ms; entrance of pieces 900 to 1100ms; next project slides up 1100ms while the current one drifts up 14%.
- 404 and Work preview: slide or fade and scale in 350 to 900ms.

## Parallax
- At most three layers per scene: ghost word 0.4x, floating labels 0.5 to 1.0x, content 1x. Phones never parallax against their own screens.

## Accessibility
- `prefers-reduced-motion` or Free scroll: no pin, no lerp, no parallax, no cursor effects; content fades in over 200ms; the launch shows `<JAASIM>` for 300ms then fades. Every moving thing has a static equivalent; animated text keeps its real text in the DOM.

## Performance
- Animate transform, opacity and clip-path only. Lazy-load photographs per scene. Target 60fps on mid-range phones; heavy scenes degrade to static below that.
