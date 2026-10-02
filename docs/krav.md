# Krav — rimfrost-guide

## Funktionella krav

### GUIDE-FR-01 — Innehåll

- **GUIDE-FR-01.1** Guiden ska förklara Rimfrost för en läsare utan programmeringsvana: ärendeflödet, byggstenarna,
  maskinella och manuella regler, uppgiftens liv i OUL, handläggarens vy, integration, nuläge och arbetssätt.
- **GUIDE-FR-01.2** Guiden ska jämföra Rimfrosts begrepp och värdelistor med FK:s datamodell och visa om de finns,
  finns delvis eller saknas.
- **GUIDE-FR-01.3** Guiden ska innehålla en repo-karta som går att filtrera på sort och söka i.
- **GUIDE-FR-01.4** Guiden ska innehålla en sökbar ordlista.
- **GUIDE-FR-01.5** Guiden ska lista öppna frågor med samma id som i projektets kunskapsbas.

### GUIDE-FR-02 — Navigering och sökning

- **GUIDE-FR-02.1** En innehållsförteckning ska visa vilket avsnitt läsaren befinner sig i.
- **GUIDE-FR-02.2** En global sökning ska söka i avsnitten, ordlistan och repo-kartan och gruppera träffarna.
- **GUIDE-FR-02.3** Sökningen ska hitta ord oavsett å, ä och ö ("handlaggning" hittar "handläggning").
- **GUIDE-FR-02.4** Sökningen ska gå att öppna med `/` eller ⌘K/Ctrl+K och styras med piltangenter, Enter och Esc.
- **GUIDE-FR-02.5** Att välja en träff ska scrolla till den och markera den kort.
- **GUIDE-FR-02.6** En länk till ett avsnitt (`#id`) ska öppna sidan vid det avsnittet.

### GUIDE-FR-03 — Utseende

- **GUIDE-FR-03.1** Läsaren ska kunna välja ljust läge, mörkt läge eller systemets läge, och valet ska sparas.
- **GUIDE-FR-03.2** Sidan ska fungera i mobilbredd utan horisontell scroll; breda diagram och tabeller scrollar inom
  sin egen ruta.

## Icke-funktionella krav

### GUIDE-NFR-01 — Publicering

- **GUIDE-NFR-01.1** Sidan ska byggas till statiska filer och publiceras med GitHub Pages från `main`.
- **GUIDE-NFR-01.2** Bygget ska fungera oavsett sökväg (relativ `base`), så att repot kan byta namn eller få en egen
  domän utan kodändring.
- **GUIDE-NFR-01.3** Sidan är publik och ska bara innehålla information som redan är publik i `rimfrost-*`-repona.

### GUIDE-NFR-02 — Tillgänglighet

- **GUIDE-NFR-02.1** Alla kontroller ska gå att använda med tangentbord och ha synligt fokus.
- **GUIDE-NFR-02.2** Animationer ska respektera `prefers-reduced-motion`.
