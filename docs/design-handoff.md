# Design handoff

The design is complete and approved. This page records what was decided, where the sources are, and how each scene maps to code.

## Sources

- `design/canvas/`: Claude Design canvas "Jaasim Portfolio Screens" (https://claude.ai/artifact/Y73VeAQ1zdRoYcZqonzkcE). Open the `.dc.html` files as markup/logic reference; they are not runnable here (they need the design runtime).
  - `FullSite.dc.html`: the interactive scroll story and the exact timeline (`seg()` ranges, panel wipes, launch timing, Index overlay, case study, 404). Ported into `src/config/timeline.ts` and `src/config/motion.ts`.
  - `Ball.dc.html`: cursor physics.
  - Desktop boards: `LaunchStoryboard`, `HelloEmpty`, `HelloGreeted`, `Main` (hero), `Craft1`, `Craft4`, `Numbers`, `Work`, `Lab`, `Path`, `About`, `Contact`, `Index`, `NotFound`, `Case`. Mobile boards: `MobHello`, `MobHero`, `MobCraft`, `MobWork`, `MobCase`, `MobContact`, `MobIndex`. `MotionSpec`: motion spec and self-audit. `CursorLab`: cursor behaviour.
- `design/design-system/`: design system "Jaasim Portfolio" v13 (https://claude.ai/artifact/6g8CTKzkQriyAEdV8DJTLg): `tokens.json`/`tokens.css`, `components/bundle.css` and per-component READMEs (Logo, Cursor, Launch, NameField, Navigation, WorkIndex, CaseStudy, Button), `motion.md`, `storyboard.md`, `references.md`, `README.md`.
- `design/photos/`: 16 stock photographs (1600x1000), also in `public/photos/`.

## Decisions made while designing (do not undo)

- Personal, premium, minimal and unlike a template. Inspired by Awwwards-style sites: brand.helloasso.com (grid and letter-by-letter name writing), worksruthi.com (personalised `{{ first name }}` hello, ball cursor), lcg.media (wide display type), davidecarusio.it (curtain reveal, giant name). Only patterns were taken, never code, copy or assets.
- One light theme (bone, ink, yellow `#ffd60a`). Earlier amber/terracotta/ember and green were rejected. No gradients, no cards, no sidebar or navbar, no odd thick borders or outlier lines, no scroll indicator or scroll hint, no Continue/Skip/Next buttons.
- Content is resume-only (Fuze Nov 2025 to now, Hakuna Matata Solutions, ZYSI Tech, Filozo, Borderless Creatives, KEM Collections, StoryBooks, Football Live Stats, 3D Portfolio, B.E. Computer Science). No invented metrics.
- **Launch**: ten word and photo pairs at 150ms (calm, no black), then black closes from the top AND bottom (2.8s, slow) while the cuts accelerate like a timelapse (46 more cuts down to 35ms, with many aspirational tech/AI words; AI always included); then HelloAsso-style grid and `MOHAMED JAASIM` written letter by letter (it must fit fully on screen), yellow code tags slide in at both ends, the curtain lifts to Hello.
- **Hello field**: shown as `{{ first name }}` with a blinking line, no boxes or borders. Click for empty braces and a caret. Enter or click-away commits and the page reads "Hello, Name." (name in Fraunces italic on yellow). The name returns in Contact ("Thanks, Name.").
- **Cursor**: plain yellow ball, no border, no shadow; trail of shades that fades gradually; click shrinks then tosses up (first bounce about 70px) and bounces softly like a game ball; grows on links and shows "View" on work rows; turns ink on the yellow scene.
- **Logo**: `<JAASIM>` in code tags. On scroll AASIM collapses and a "/" smoothly appears so it becomes `<J/>` (opening tag `<`, closing tag `/>`). Scrolling back restores it.
- Every screen, sub-screen, section and overlay animates in AND out; the next-project action in a case study slides the next case up over the current one (never instant).
- Photography is realistic and futuristic (coding, AI, innovation), free Pexels stock to be swapped for the owner's own images later.
- Free-scroll mode and scroll-driven mobile frames were still open in the design and are built here (see `docs/architecture.md`). Mobile boards exist only for Hello, Hero, Craft, Work, Case, Contact and Index; Numbers, Lab, Path and About mobile compositions were derived from them and should be reviewed.

## Scene to module map

| Chapter                | Screens                        | Module (planned)                               |
| ---------------------- | ------------------------------ | ---------------------------------------------- |
| Launch                 | 0 (timed, once per session)    | `src/scenes/launch`                            |
| 01 Hello               | 0 to 1                         | `src/scenes/hello`                             |
| Hero                   | 0.5 to 3                       | `src/scenes/hero`                              |
| 02 Craft               | 2.5 to 7.8 (ink)               | `src/scenes/craft` + persistent `Phone`        |
| 03 By the numbers      | 7.2 to 9.8                     | `src/scenes/numbers`                           |
| 04 Work and case study | 9 to 11                        | `src/scenes/work`, `src/components/case-study` |
| 05 Lab                 | 10.4 to 13.5 (ink, horizontal) | `src/scenes/lab`                               |
| 06 Path                | 12.8 to 15.9                   | `src/scenes/path`                              |
| 07 About               | 15 to 17.3                     | `src/scenes/about`                             |
| 08 Contact             | 16.6 to 18 (yellow)            | `src/scenes/contact`                           |
| Overlays               | n/a                            | Index, case study, 404 in `src/components`     |

## Known open items

Real app screenshots and a portrait (placeholders are typed slots), a licence check of each photograph, and the paid display face (Archivo Expanded is the stand-in for Soehne Breit). The prototype's "Replay launch" and "Preview the 404 page" controls are prototype-only and are not part of the site.
