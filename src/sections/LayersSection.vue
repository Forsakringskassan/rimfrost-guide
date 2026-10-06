<script setup lang="ts">
const layers = [
  { c: "portal", name: "Portaler & vyer", sub: "Det handläggare och admin ser", chips: ["portal-handlaggare", "portal-admin-fe", "regel-…-fe", "…-bff"], next: "LADDAR VYER · ANROPAR VIA BFF" },
  { c: "process", name: "Processer", sub: "Flödet för en förmån, byggt av processteg", chips: ["process-vah", "process-vab", "regel-…-subprocess"], next: "BER REGLER OM DELBESLUT · KAFKA" },
  { c: "regel", name: "Regler", sub: "Ett villkor var, maskinellt eller manuellt", chips: ["regel-rtf-maskinell", "regel-rtf-manuell", "regel-rtf-manuell-komplettering", "regel-bekraftabeslut"], next: "HÄMTAR OCH SPARAR DATA · REST" },
  { c: "tjanst", name: "Tjänster", sub: "Äger data och kön", chips: ["service-workflow", "service-erbjudande-topic", "service-oul", "service-handlaggning", "service-sid", "service-team", "service-referensdata", "service-folkbokforing", "service-arbetsgivare"], next: "BYGGER PÅ" },
  { c: "ramverk", name: "Ramverk", sub: "Delad kod, så att en ny regel blir liten", chips: ["framework-regel", "framework-regel-maskinell", "framework-regel-manuell", "framework-regel-komplettering", "framework-regel-oul", "framework-oul", "framework-process", "framework-bff", "framework-*-adapter", "template-…"], next: "FÖLJER" },
  { c: "kontrakt", name: "Kontrakt", sub: "Överenskommelser om anrop och meddelanden", chips: ["…-openapi", "…-asyncapi"] },
];
</script>

<template>
  <section id="lager">
    <div class="head">
      <p class="eyebrow">Arkitektur</p>
      <h2>Byggstenarna</h2>
    </div>
    <div class="layers">
      <template v-for="l in layers" :key="l.c">
        <div class="layer" :data-c="l.c">
          <div class="nm"><b>{{ l.name }}</b><small>{{ l.sub }}</small></div>
          <div class="chips"><span v-for="chip in l.chips" :key="chip" class="chip">{{ chip }}</span></div>
        </div>
        <div v-if="l.next" class="connector">{{ l.next }}</div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.layers { display: grid; gap: 0.6rem; }
.layer { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: 1.25rem; align-items: center; padding: 1.1rem 1.25rem; border-radius: 12px; border: 1px solid var(--line); border-left: 4px solid var(--lc); background: var(--surface); }
.nm { display: grid; gap: 0.15rem; }
.nm b { font: 600 1.02rem var(--f-display); }
.nm small { color: var(--muted); font-size: 0.82rem; line-height: 1.35; }
.chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.chip { font: 400 0.78rem/1 var(--f-mono); padding: 0.42rem 0.6rem; border-radius: 7px; background: var(--ls); color: var(--lc); }
.connector { display: flex; align-items: center; gap: 0.6rem; padding-left: 12.25rem; color: var(--faint); font: 500 0.72rem var(--f-mono); letter-spacing: 0.05em; }
.connector::before { content: ""; width: 1px; height: 1.1rem; background: var(--line); }
@media (max-width: 700px) {
  .layer { grid-template-columns: minmax(0, 1fr); }
  .connector { padding-left: 1.25rem; }
}
</style>
