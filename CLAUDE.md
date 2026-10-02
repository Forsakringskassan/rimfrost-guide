# rimfrost-guide

Vue 3 + TypeScript static site (Vite), published to GitHub Pages. Non-technical guide to Rimfrost, written in Swedish.

- Build: `npm run build` (runs `vue-tsc -b && vite build`)
- Dev server: `npm run dev` (port 3050)
- Test: `npm test` (vitest; search logic in `src/lib/__tests__`)
- Content data lives in `src/data/*.ts`; section text and SVG diagrams in `src/sections/*.vue`.
- All colours are CSS tokens in `src/styles/base.css`, with light and dark values — never hard-code a colour.
- Public repo and public site: only include what's already public in the `rimfrost-*` repos.
