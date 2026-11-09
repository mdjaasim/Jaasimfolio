Mohamed Jaasim's personal portfolio: one continuous, scroll-told story that a recruiter understands in 10 seconds and a jury remembers. Warm bone, near-black ink, one bright yellow, huge wide type, real technology photography, and motion that carries the story. It is personal, not a Fuze property; never use Fuze brand assets. The finished screens live in the Jaasim Portfolio Screens canvas; this system holds the rules and components behind them.

## Status

Current decisions: logo `<JAASIM>` in code tags (morphs to `<J/>` on scroll); yellow `#FFD60A` as the only accent; Archivo Expanded, Geist and Geist Mono; a launch of accelerating word and photograph cuts with black closing from the top and bottom, then the name written on a grid; a first-name field shown as `{{ first name }}` with a blinking line; a yellow ball cursor that trails and bounces; no scroll indicator and no scroll hints; every overlay slides or expands in and out. Still to do: a Free scroll mode, real app screens and a real portrait in place of the placeholders, a license check on each photograph, and the paid display face.

## Content fundamentals

- Voice: first person, plain, confident, short, sentence case. Example: "I lead mobile at Fuze. Four fitness apps are live on the App Store and Play Store."
- Résumé facts only: Fuze (Dubai, Nov 2025 to now), Hakuna Matata Solutions, ZYSI Tech, Filozo, Borderless Creatives, KEM Collections, StoryBooks, Football Live Stats, the Interactive 3D Portfolio, B.E. in Computer Science at Dhaanish Ahmed College of Engineering. No invented metrics, clients or testimonials. Placeholders stay marked ([YEAR], [LIVE LINK], brand names).
- No emoji, no exclamation marks, never "passionate", "innovative" or "cutting-edge". All static text comes from translation keys.
- One idea per scene, one headline per scene, one Fraunces italic word per headline, ink over a yellow highlighter (`jc-hl`).
- Launch words are about what engineers and technology people aspire to (AI, SHIP, SCALE, CLOUD, ROBOTICS, STARTUPS) and always include AI.

## Visual foundations

- Colour: bone `surface` as the ground, `ink` near-black as type and as the dark scenes (Craft, Lab; text `on-ink`, `on-ink-muted`), and `yellow` as the one accent. `ink-muted`, `ink-soft` and `hairline` are tints for labels and quiet surfaces. No other hue, no gradients, no green. Scenes alternate bone and ink and the Contact scene floods yellow. Yellow is used for: the cursor ball, the highlighter behind the accent word, the launch tags, the marks that show progress inside a scene (path head, sheet chips), and the Contact ground. Never yellow text or a thin yellow line on bone (1.2:1). A subtle film grain (`jc-grain`) sits over grounds only.
- No cards, no sidebar, no navbar, no dock, no pill clusters, no icon rows, no feature grids, no scroll indicator and no hint text. Work is a typographic list, navigation is one word (Index) opening a full-screen overlay.
- Type: Archivo at width 125 for display (the wide grotesque feel of LCG; the paid Soehne Breit is the upgrade), Fraunces Italic for the single accent word, Geist for text (17/26, max 60 characters), Geist Mono uppercase for labels and the name field. Hero name about 176px, scene titles 84 to 140px, numbers 220px; type is fluid from 390 to 1440.
- Layout: 12-column grid, 32px page margin (16px mobile), asymmetric compositions, oversized numerals, content positioned freely over the grid; names and display type may overhang the grid by one column but never be cut by the screen.
- Shape: cards `radius-lg`, panels `radius-xl`, controls `radius-pill`; no sharp corners except full-bleed imagery. Hairlines are used only as structure (none as decoration); only floating UI gets `shadow-float`.
- Imagery: real technology, AI and innovation photographs (Photography group), cropped 16:10, used for launch cuts, Work previews, Lab plates and case studies. They are free-to-use stock to be replaced by your own project screens; keep them dark and blue-toned so they sit with the palette. App screens in phone mockups are drawn UI, marked as placeholders. The portrait is a duotone placeholder.
- Focus: a solid 2px `focus` ring with 3px offset on every interactive element; the name field shows focus by its blinking line and darker braces.
- Motion: see the Motion page. Every screen, sub-screen and section enters and leaves with an animation; nothing appears instantly.

## Logo

- Wordmark `<JAASIM>`: the name in capitals, Archivo width 125 weight 600, wrapped in code tags (`jc-wm`). Tags are 55% opacity and follow the text colour. Short mark `<J/>` (`jc-mark`) for the compact header, favicon, app icon and avatar.
- At the top of the page the header shows `<JAASIM>`. While scrolling the letters AASIM collapse and a slash fades in before the closing tag, ending as `<J/>`; scrolling back reverses it.
- In the launch the finished name is wrapped in yellow tags that slide in from both ends. There is no dot anywhere in the identity.

## Signature moments

- Launch (Launch component): ten word and photograph pairs, black closing from top and bottom while the cut accelerates, grid, name written letter by letter, yellow tags, curtain.
- Hello (NameField component): `{{ first name }}` with a blinking line; the visitor types and the page greets them. Stored only in their browser; returns in Contact.
- Cursor (Cursor component): a yellow ball with a trail of shades, a soft toss and bounce on click.
- Case study (CaseStudy component): the Work row expands into the cover; the next project slides up over the current one.
- Sources: References page.

## Iconography

None beyond the arrow glyph, small filled dots, and the cursor ball.

## Components

Logo, Cursor, Launch, NameField, Navigation (header and Index overlay), WorkIndex, CaseStudy and Button (one text-link style). Use the `jc-*` classes in `components/bundle.css`. Photographs are in the Photography asset group.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

8 components are documented without a runnable `components/bundle.js`: read each component’s card, and its README where it has one (`components/<Comp>/README.md`), and build to those guidelines. Tokens: the values are on `api/tokens.md`; a Slides deck or Design canvas also takes `tokens.json` by file path. On a Design canvas, also copy `tokens.css` to `project/ds/<folder>/tokens.css` in the call that installs this system, and link it in each artboard that uses this system, right after the `support.js` line and before the system’s other stylesheets: `<link rel="stylesheet" href="ds/<folder>/tokens.css">` (with one `../` in front for each folder the artboard is in).

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` is the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, border, palette, type, spacing, radius, shadow. (8.9k)

**Components** (`api/components/<Comp>.md`, 8)

- **Actions**: `Button` — There is one button style: a text link with an underline that draws away on hover (jc-link)
- **Signature moments**: `Cursor` — The only cursor: one 14px ember ball that replaces the native pointer on desktop · `LoaderHello` — The launch and greeting sequence, played once per session (about 4.5s, skippable with Replay in this preview)
- **Directions**: `HeroDirections` — HeroDirections · `LogoDirections` — LogoDirections
- **Navigation**: `Navigation` — The site has no navigation bar, dock or sidebar · `Thread` — The scroll thread replaces any side rail: one 1px hairline down the right edge of the viewport with a single ember dot that travels with scroll position and a…
- **Content**: `WorkIndex` — Work is a typographic list, not a grid of cards
