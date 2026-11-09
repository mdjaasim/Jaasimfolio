# Handover: putting this online under your own account

This repo has its own git history and no remote. Nothing here was pushed anywhere. To publish it from your Mac (replace the repo name if you like):

```bash
cd /Users/jaasim/Dev/jaasim-portfolio

# 1. check everything locally
npm ci
npm run check
npm run test:e2e

# 2. create an empty repo under YOUR personal GitHub account (not an organization) and push
gh repo create jaasim-portfolio --private --source=. --remote=origin --push
```

If you prefer the web UI: create an empty private repo, then

```bash
git remote add origin git@github.com:<your-username>/jaasim-portfolio.git
git push -u origin main
```

Then connect the repo to Vercel, Netlify or Cloudflare Pages (see `docs/deployment.md`), point your domain at it, and set `site.url` in `src/config/site.ts`.

## Before you share it

- Replace the placeholders: portrait, app screens in the phone, `[YEAR]` and `[LIVE LINK]` for each case study.
- Check each photograph's licence (Pexels ids are in `src/content/photos.ts`) or replace them with your own.
- Decide on the display typeface: Archivo Expanded is a free stand-in for the paid Soehne Breit.

## Authorship

Every commit is authored as Mohamed Jaasim with no co-author or tool attribution. `AGENTS.md` makes that a rule for any assistant that works in the repo.
