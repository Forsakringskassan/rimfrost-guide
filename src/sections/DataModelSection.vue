<script setup lang="ts">
type Coverage = "yes" | "part" | "no";

interface Cluster {
  title: string;
  description: string;
  entities: [name: string, coverage: Coverage][];
}

// From reading FK's data model diagram against the Rimfrost code, 2026-10-02.
const clusters: Cluster[] = [
  { title: "Person & organisation", description: "Vem ärendet gäller och vem som är arbetsgivare.", entities: [["Person / Individ", "yes"], ["Fysisk person", "yes"], ["Folkbokföringsadress", "yes"], ["Organisation", "part"], ["Organisationsenhet", "no"], ["Juridisk form", "no"]] },
  { title: "Yrkande", description: "Det kunden ansöker om, och vilka roller personerna har.", entities: [["Yrkande", "yes"], ["Roll i yrkande", "yes"], ["Avsikt", "yes"], ["Yrkandestatus", "part"], ["Produkt (förmånstyp)", "part"], ["Ingång", "no"]] },
  { title: "Handläggning & uppgift", description: "Ärendet och arbetsmomenten i det.", entities: [["Handläggning", "yes"], ["Handläggningsspecifikation", "yes"], ["Uppgift", "yes"], ["Uppgiftsspecifikation", "yes"], ["Verksamhetslogik", "yes"], ["FSSÄ-information", "yes"], ["Uppgiftsstatus", "part"], ["Uppgiftsdata / underlag", "part"], ["Tjänsteanteckning", "no"]] },
  { title: "Regel & lagrum", description: "Regeln som tolkning av ett lagrum.", entities: [["Regel", "yes"], ["Regelutfall", "yes"], ["Lagrum", "yes"], ["Paragraf · stycke · punkt", "part"], ["Dokument-id", "no"]] },
  { title: "Beslut & ersättning", description: "Vad som beslutas och vad som betalas ut.", entities: [["Beslut", "yes"], ["Beslutsrad", "yes"], ["Avslutstyp", "yes"], ["Ersättning", "yes"], ["Beslutstyp", "part"], ["Beslutsutfall", "part"], ["Beräkningsgrund", "part"], ["Ställningstagande", "part"]] },
  { title: "Inkomst & anställning", description: "Underlag för rätten till ersättning och beloppet.", entities: [["Anställning", "yes"], ["Avtalad lön", "part"], ["Inkomst", "no"], ["Specificerad ersättningsperiod", "no"], ["Tjänstgöring i totalförsvaret", "no"]] },
  { title: "Behörighet & team", description: "Vem som får göra vad.", entities: [["Team", "yes"], ["Användare (handläggare)", "part"], ["Behörighetsgrupp", "part"], ["Behörighetsroll", "no"]] },
];

type Verdict = "bad" | "warn" | "ok";
const verdictLabel: Record<Verdict, string> = { bad: "Avviker", warn: "Delvis", ok: "Matchar" };

const valueLists: { concept: string; fk: string; rimfrost: string; verdict: Verdict }[] = [
  { concept: "Uppgiftsstatus", fk: "Planerad, Tilldelad, Avslutad", rimfrost: "OUL: NY, TILLDELAD, AVSLUTAD. AVBRUTEN finns men används inte. Andra specar har andra listor.", verdict: "bad" },
  { concept: "Beslutsutfall", fk: "Beviljat, Avslag, Delvis avslag, Ändring m.fl.", rimfrost: "API: JA, NEJ, FU. Äldre modell: BEVILJAT, AVSLAG, DELVIS_BEVILJANDE …", verdict: "bad" },
  { concept: "Yrkandestatus", fk: "Planerat, Yrkat, Under utredning, Fastställt under utredning, Fastställt, Återtaget, Makulerat", rimfrost: "Samma, men utan Återtaget och Makulerat", verdict: "warn" },
  { concept: "Beslutstyp", fk: "Interimistiskt, Provisoriskt (EU 987/2009), Slutligt, Omprövning, Ändring", rimfrost: "Äldre modell: INTERIMISTISKT, STALLNINGSTAGANDE, SLUTLIG", verdict: "warn" },
  { concept: "Avsikt", fk: "Ny, Ändring, Borttag, Återtagen", rimfrost: "NY, ANDRING, BORTTAG, ATERTAGEN", verdict: "ok" },
  { concept: "Verksamhetslogik", fk: "A, B, C", rimfrost: "A, B, C", verdict: "ok" },
  { concept: "FSSÄ-information", fk: "Handläggning pågår, Väntar på info från annan part, Väntar på info från dig", rimfrost: "Samma tre", verdict: "ok" },
];
</script>

<template>
  <section id="datamodell">
    <div class="head">
      <p class="eyebrow">Målbilden</p>
      <h2>FK:s datamodell och Rimfrost</h2>
      <p class="lede">
        Försäkringskassans informationsmodell beskriver vilka begrepp som finns och hur de hänger ihop. Rimfrost ska
        passa in i den. Här är en första jämförelse mellan modellen och det som finns i koden idag.
      </p>
    </div>
    <div class="caption legend">
      <span class="key"><span class="ent e-yes">Finns</span>i Rimfrost</span>
      <span class="key"><span class="ent e-part">Delvis</span>finns men förenklat eller med andra värden</span>
      <span class="key"><span class="ent e-no">Saknas</span>bara i FK:s modell</span>
    </div>
    <div class="dm">
      <div v-for="c in clusters" :key="c.title" class="card">
        <h3>{{ c.title }}</h3>
        <p>{{ c.description }}</p>
        <div class="ents">
          <span v-for="[name, cov] in c.entities" :key="name" class="ent" :class="`e-${cov}`">{{ name }}</span>
        </div>
      </div>
    </div>

    <h3 class="sub-head">Där värdelistorna skiljer sig</h3>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Begrepp</th><th>FK:s modell</th><th>Rimfrost idag</th><th>Bedömning</th></tr></thead>
        <tbody>
          <tr v-for="v in valueLists" :key="v.concept">
            <td><b>{{ v.concept }}</b></td>
            <td>{{ v.fk }}</td>
            <td>{{ v.rimfrost }}</td>
            <td><span class="pill" :class="`p-${v.verdict}`">{{ verdictLabel[v.verdict] }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="caption">
      Jämförelsen bygger på en läsning av FK:s modellbild och Rimfrost-koden den 2 oktober 2026. Stäm av den med FK:s
      informationsarkitekter innan den används för beslut.
    </p>
  </section>
</template>

<style scoped>
.legend { margin: 0 0 1.25rem; }
.legend .ent { padding: 0.2rem 0.5rem; }
.dm { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); gap: 1.1rem; }
.dm .card { padding: 1.25rem; display: grid; gap: 0.85rem; align-content: start; }
.dm h3 { font-size: 1.05rem; margin: 0; }
.dm .card > p { font-size: 0.88rem; line-height: 1.5; }
.ents { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ent { font: 500 0.78rem/1 var(--f-body); padding: 0.42rem 0.62rem; border-radius: 7px; border: 1.5px solid; }
.e-yes { background: var(--ok-s); border-color: transparent; color: var(--ok); }
.e-part { background: transparent; border-color: var(--warn); color: var(--warn); border-style: dashed; }
.e-no { background: transparent; border-color: var(--line); color: var(--faint); }
</style>
