# Atlantic Trip Planner

A small Astro site for planning an Atlantic Canada road trip from July 23 to August 2, 2026.

Live site: https://atlantic.currie.page/

The site has two pages:

- `Planner`: a lightweight trip timeline with flights, car rental, ferry, stays, and day-by-day place links.
- `Places`: a browsable catalog of shortlisted places with photos, map pins, timing notes, and source links.

## Local Development

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm run dev
```

Build the static site:

```sh
npm run build
```

## Deployment

The site is configured for GitHub Pages using `.github/workflows/deploy.yml`.

Local development serves at `/`. GitHub Pages builds with `GITHUB_PAGES=true`, which sets the Astro base path to `/atlantic-trip-planner/`.

The public URL `https://atlantic.currie.page/` redirects to the GitHub Pages deployment.
