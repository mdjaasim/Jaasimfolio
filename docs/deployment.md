# Deployment

`npm run build` writes a static site to `out/`. It needs network access once, to fetch the Google fonts, which Next then self-hosts: the deployed site makes no third-party requests.

## Before publishing

1. Set the real domain in `src/config/site.ts` (`url`). It feeds the canonical link, Open Graph tags, `robots.txt`, `sitemap.xml` and the JSON-LD.
2. Fill the optional case-study fields (`year`, `liveUrl`) in `src/content/work.ts`; rows stay hidden until set.
3. Replace placeholder content (portrait, app screens) and confirm each photograph's licence (`docs/content-guide.md`).
4. `npm run check` and `npm run test:e2e` pass.

## Hosting

Any static host works.

- **Vercel**: import the repo; `vercel.json` sets security and cache headers. Framework preset: Next.js (static export is detected from `output: 'export'`).
- **Netlify / Cloudflare Pages**: build command `npm run build`, publish directory `out`. `public/_headers` is copied into `out/` and sets the same headers.
- **GitHub Pages or plain storage**: upload `out/`; headers cannot be set there, so the CSP and security headers are not applied.

## Headers

`vercel.json` and `public/_headers` carry a strict CSP (self only, inline scripts and styles allowed for Next's runtime), `X-Content-Type-Options`, `X-Frame-Options: DENY`, a strict referrer policy, a locked-down permissions policy, and one-year immutable caching for `/_next/static/*` and `/photos/*`. Keep them in step if you add a third-party service.

## Compression

Serve with Brotli or gzip (every host above does). Lighthouse run against a local static server without compression understates the score.

## Measured (local, Lighthouse 12)

Desktop: performance 95, accessibility 100, best practices 100, SEO 100. Mobile (simulated slow 4G, 4x CPU): accessibility, best practices and SEO 100; performance is held down by the launch, which paints full-screen photographs for the first nine seconds. Content is the same either way; first paint is 0.4s on desktop.
