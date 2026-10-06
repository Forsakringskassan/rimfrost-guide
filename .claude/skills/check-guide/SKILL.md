---
name: check-guide
description: Kontrollera om guiden fortfarande stämmer med GitHub — vilka rimfrost-repon som finns, är arkiverade eller har bytt namn, och vad som ändrats i paraplyrepot `rimfrost` sedan förra kontrollen. Föreslår ändringar i guiden och genomför dem efter godkännande. Använd när användaren säger "kolla guiden", "är guiden aktuell", "uppdatera repo-kartan" eller efter förändringar i Rimfrost.
---

# Kontrollera guiden mot GitHub

Guiden är publik. Den får bara beskriva det som syns i de **publika** `rimfrost-*`-repona hos
Forsakringskassan på GitHub (se `CLAUDE.md`). Den här skillen jämför guiden med det läget.

## 1. Kör kontrollen

```sh
python3 .claude/skills/check-guide/check.py
```

Skriptet är skrivskyddat och skriver ut en rapport i Markdown:

- **Repolistan** (GitHub API): aktiva repon som saknas i `src/data/repos.ts`, repon i kartan som är
  arkiverade, och repon som inte finns publikt (bytt namn → nya namnet visas; annars privat/borttaget).
- **Antalet repon** i inledningen (`HeroSection.vue`) jämfört med GitHub.
- **Paraplyrepot `rimfrost`**: commits och ändrade filer sedan SHA:n i `state.json` (via en cachad
  git-klon i `~/.cache/rimfrost-guide/`, ingen API-kvot).

Får du `403` är GitHubs gräns på 60 anonyma anrop/timme slut: be användaren köra `gh auth login`
(skriptet använder då `gh auth token`) eller sätta `GITHUB_TOKEN`, eller vänta en timme.

## 2. Ta fram underlag

**Nya repon.** Läs varje repos README utan API-kvot:
`curl -sL https://raw.githubusercontent.com/Forsakringskassan/<repo>/main/README.md`.
Är den tunn, titta på toppnivåns filer eller spec-filen. Många repon → dela ut läsningen till en
subagent och be om färdiga rader i formatet nedan.

**Ändringar i `rimfrost`.** Läs diffen för varje ändrad fil (kommandot står sist i rapporten) och
avgör om den påverkar guiden. Ignorera `.claude/` och rena formateringsändringar.

| Ändrat i `rimfrost` | Kan påverka |
|---|---|
| `README.md`, `FRAMEWORK.md` | Inledningen, Byggstenarna, Hur delarna pratar |
| `processer/**` | Ett ärendes resa |
| `regler/**` | Maskinellt och manuellt, Ett ärendes resa |
| `sequences/*.mmd` | Ett ärendes resa, Maskinellt och manuellt, Uppgiftens liv |
| `FAULT_HANDLING_OVERVIEW.md` | Ett ärendes resa (felväg, tidsgränser) |
| `frontend/**` | Det handläggaren ser |

Mönster som återkommer i många nya repon (t.ex. `*-subprocess`, `adapter-*`, en ny tjänst) kan
betyda att arkitekturen har ändrats. Lyft det särskilt — då kan diagram och avsnitt behöva skrivas
om, inte bara repo-kartan.

## 3. Föreslå, fråga, ändra

Visa användaren en kort lista: vad som är fel i guiden, var (`fil:rad`) och föreslagen ny text.
Fråga om det som kräver ett beslut (AskUserQuestion, högst 4 frågor per omgång, med rekommendation).
Ändra först efter godkännande.

Repo-kartan (`src/data/repos.ts`):

- Lägg till aktiva repon: `{ name: "<utan rimfrost->", category: "<kategori>", description: "<mening>" },`
  i rätt grupp. Kategorier: `process`, `regel`, `tjanst`, `portal`, `ramverk`, `kontrakt`
  (`*-openapi`/`*-asyncapi`), `internt` (mockkopplingar och interna hjälprepon), `drift` (mallar,
  kubernetes, dokumentation).
- `ramverk` är bara det man bygger nya regler, processer och BFF:er med. Kopplingar som låter regler
  hämta testdata från stubbar (`adapter-*`) och interna hjälprepon (t.ex. `ersattning-data`) är
  `internt`, och beskrivs som interna ("Intern koppling som låter regler hämta testdata från …"),
  inte som färdiga produkter.
- Repon som avsiktligt inte är med står i `EXCLUDED` i `check.py`.
- Kontrakt delas automatiskt i filtren OpenAPI och AsyncAPI efter namnets slut (`contractKind` i
  `repos.ts`). Ett kontraktsrepo som inte slutar på `-openapi` räknas som AsyncAPI — kontrollera att det stämmer.
- Ta bort arkiverade repon och repon som inte är publika.
- Byt namn på omdöpta repon, och sök efter det gamla namnet i hela `src/` (chips i Byggstenarna,
  regeltabellen m.m.).
- Uppdatera antalet repon i `HeroSection.vue` så att det stämmer med repo-kartan.

## 4. Språkregler för guiden

- Guiden ska inte väcka frågor om sådant som avsiktligt saknas eller är mockat. Jämför inte med FK:s
  informationsmodell (den följs inte 1:1), och nämn inte påbörjade regler som inte används.

- Svenska, för den som inte kodar. Korta meningar, en mening per repobeskrivning, slutar med punkt.
- Skriv **t.ex.** (aldrig "till exempel"), **grund** (inte "grunden"), **maskinell** (inte "automatisk").
- Skiljetecken i diagramtexter och kopplingar: **·** (inte komma).
- "Uppgift" betyder arbetsmoment i OUL. För data om en person, skriv **information**.
- Stubbar markeras "Stub."
- Testpersonen (kunden) i stubbarna och den påhittade handläggaren i exemplen ska ha olika namn.

## 5. Avsluta

1. `npm test` och `npm run build` ska gå igenom.
2. Uppdatera `state.json`: `rimfrost_sha` = SHA:n i rapportens sista rad (`<!-- head=… -->`),
   `checked` = dagens datum. Gör det bara om ändringarna i `rimfrost` är genomgångna.
3. Committa eller pusha **inte** utan att fråga. Vill användaren committa: skapa först en branch
   `docs/<kort-beskrivning>` (eller `docs/FKPOC-<nr>-…` om det finns en ticket).
