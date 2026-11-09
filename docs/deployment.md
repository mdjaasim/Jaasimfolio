# Deployment

`npm run build` writes a static site to `out/`. Host it on any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Set the real domain in `src/config/site.ts` (`url`) before publishing; it feeds the metadata. No third-party scripts or analytics are included. Security headers are set at the host (CSP, `X-Content-Type-Options`, `Referrer-Policy`); a recommended set will be added here when the host is chosen.
