# Changelog

## 0.1.0 (unreleased)

- Wave 5 (hardening): pixel comparison against the Claude Design build at 21 scroll positions plus the launch, which found and fixed the logo tag spacing, the Lab text offset and photo bleed, the About marquee outline parity, the Numbers digit offsets, the Contact headline rhythm, Fraunces optical sizing (design-accurate italic accent words), and a yellow ball on the dark Contact circle. Accessibility: axe (WCAG A/AA) across every chapter, both modes, both overlays and the 404 at desktop and mobile sizes. SEO and sharing: robots, sitemap, JSON-LD Person, Open Graph image, `<J/>` favicon. Security: CSP and headers for Vercel and Netlify/Cloudflare. Performance: photographs built as 640/1080/1600 WebP with a custom loader (2.9 MB to 1.7 MB first load), on-demand code splitting for free mode and both overlays, launch name no longer shifts layout (CLS 0.098 to 0.034). Error page, no-JS fallback for the launch overlay, docs (accessibility, deployment, handover).

- Wave 4: mobile frames (every scene has a 390x844 composition driven by the same scroll timeline, with its own phone path), free-scroll mode (`src/free`: in-flow, responsive sections that ease in once, counters that count up, header and cursor tone following the section under them), reduced-motion path (free layout, no ball, 300ms launch), phone-portrait devices use the mobile frames. Fixes found on the way: Path text no longer runs under the header, mobile case titles are sized per case so the whole word fits.

- Wave 3: ground panels, Craft, By the numbers, Work (pointer-following preview), case-study overlay (expands from the row, next project slides up, Esc and focus handling), Lab, Path, About, Contact (copy email, remembered name). Performance: derived-value subscriptions (`useUSelect`), scenes mount only inside their range, idle photo preloading, scroll position restored without easing in from the top. Fixes found on the way: Esc works after the next-project slide, descenders no longer clipped in the Contact headline, the scroll track reaches the final screen.

- Wave 2: launch (ten calm pairs, top and bottom shutters, accelerating cuts, written name in yellow tags, curtain), Hello with the `{{ first name }}` field and remembered greeting, Hero letters and drift, the persistent phone with four screens, centred design frame (`.frame`) so the 1440x900 and 390x844 compositions scale and stay centred.

- Wave 1: scroll engine (eased timeline, free-scroll tracking, presence), mode provider with persisted guided/free preference, `<JAASIM>` to `<J/>` logo morph, header, ball cursor physics, Index overlay with focus trap and mode switch, 404 scene, unit and Playwright tests.

- Scaffold: Next.js static export, strict TypeScript, tokens ported from the design system, typed content layer, timeline and motion config, photo registry, tests, CI and docs.
  x
