<script setup lang="ts">
import { openQuestions } from "@/data/questions";

const parts = [
  { name: "Uppgiftslager (OUL)", pill: "p-ok", label: "Riktig", meaning: "Har databas, tilldelning, team- och SID-regler och sorteringsordning." },
  { name: "Processer, regler, portaler", pill: "p-ok", label: "Riktiga", meaning: "Hela VAH-flödet går att köra från början till slut." },
  { name: "Handläggning", pill: "p-warn", label: "Delvis", meaning: "Logiken fungerar, men data sparas bara i minnet och försvinner vid omstart." },
  { name: "Folkbokföring, arbetsgivare, individ", pill: "p-mute", label: "Stub", meaning: "Svarar alltid med samma testperson, Lisa Tass i Luleå, anställd hos Region Dalarna." },
  { name: "Skyddad identitet, team, handläggare", pill: "p-mute", label: "Stub", meaning: "Hårdkodade testdata: fyra team och tre påhittade handläggare." },
  { name: "Iloggning", pill: "p-mute", label: "Bara kontrakt", meaning: "Det finns en spec för loggning av vem som såg vad, men ännu ingen kod som skickar loggarna." },
];
</script>

<template>
  <section id="nulage">
    <div class="head">
      <p class="eyebrow">Läget just nu</p>
      <h2>Nuläge och luckor</h2>
      <p class="lede">Rimfrost är ett proof of concept. Kärnan fungerar på riktigt, men flera kringtjänster låtsas än så länge.</p>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Del</th><th>Läge</th><th>Vad det betyder</th></tr></thead>
        <tbody>
          <tr v-for="p in parts" :key="p.name">
            <td><b>{{ p.name }}</b></td>
            <td><span class="pill" :class="p.pill">{{ p.label }}</span></td>
            <td>{{ p.meaning }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="sub-head">Öppna frågor</h3>
    <div class="qs">
      <div v-for="q in openQuestions" :key="q.id" class="q">
        <code>{{ q.id }}</code>
        <div>
          <p>{{ q.question }}</p>
          <small v-if="q.context">{{ q.context }}</small>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.qs { display: grid; gap: 0.6rem; max-width: 52rem; }
.q { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr); gap: 1rem; padding: 1rem 1.2rem; background: var(--surface); border: 1px solid var(--line); border-radius: 11px; }
.q code { color: var(--accent); font-size: 0.78rem; padding-top: 0.15rem; }
.q p { font-size: 0.95rem; }
.q small { display: block; color: var(--muted); font-size: 0.85rem; margin-top: 0.2rem; }
</style>
