# rimfrost-guide

En guide till Rimfrost för den som inte kodar, till exempel projektledare. Den förklarar ärendeflödet, byggstenarna,
uppgiftens liv i OUL, hur Rimfrost förhåller sig till FK:s datamodell, alla repon och de ord som används i projektet.

Publiceras med GitHub Pages: <https://forsakringskassan.github.io/rimfrost-guide/>

> **Obs:** repot är publikt, och därmed är också sidan publik. Skriv inget här som inte redan får synas i de publika
> `rimfrost-*`-repona.

## Kom igång

```sh
npm ci
npm run dev        # http://localhost:3050
npm run build      # vue-tsc + vite build till dist/
npm run preview    # serverar dist/ på http://localhost:3051
npm test           # vitest
```

Kräver Node 24 (se `.nvmrc`).

## Uppdatera innehållet

| Vad | Var |
|---|---|
| Ordlistan | `src/data/glossary.ts` |
| Repo-kartan | `src/data/repos.ts` |
| Öppna frågor | `src/data/questions.ts` (samma id:n som i governorns `knowledge/open-questions.md`) |
| Avsnittens ordning och innehållsförteckning | `src/data/sections.ts` + `src/App.vue` |
| Text och diagram i ett avsnitt | `src/sections/<Avsnitt>Section.vue` |
| Färger, typsnitt, ljust/mörkt läge | `src/styles/base.css` |

Ett nytt avsnitt behöver en komponent i `src/sections/`, en rad i `src/data/sections.ts` och en rad i `src/App.vue`.
Den globala sökningen hittar nytt innehåll automatiskt.

## Driftsättning

Workflowet `.github/workflows/pages.yaml` testar och bygger varje push och pull request. Pushar till `main` publiceras
till GitHub Pages.

Första gången: välj **Settings → Pages → Build and deployment → Source: GitHub Actions** i repot.
