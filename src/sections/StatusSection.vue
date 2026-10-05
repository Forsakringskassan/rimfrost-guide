<script setup lang="ts">
const parts = [
  { name: "Uppgiftslager (OUL)", pill: "p-ok", label: "Riktig", meaning: "Har databas, tilldelning, team- och SID-regler och sorteringsordning." },
  { name: "Workflow", pill: "p-ok", label: "Riktig", meaning: "Tar emot yrkanden och startar rätt process. Skickar bara vidare att ärendet är klart, inte resultatet." },
  { name: "Processer, regler, portaler", pill: "p-ok", label: "Riktiga", meaning: "Hela VAH-flödet går att köra från början till slut." },
  { name: "Handläggning", pill: "p-warn", label: "Delvis", meaning: "Logiken fungerar, men data sparas bara i minnet och försvinner vid omstart." },
  { name: "Folkbokföring, arbetsgivare", pill: "p-mute", label: "Stub", meaning: "Svarar alltid med samma testperson, Lisa Tass i Luleå, anställd hos Region Dalarna." },
  { name: "Skyddad identitet, team, handläggare", pill: "p-mute", label: "Stub", meaning: "Hårdkodade testdata: fyra team och tre påhittade handläggare. Personer vars nummer slutar på 4444 räknas som skyddade." },
  { name: "Iloggning", pill: "p-mute", label: "Bara kontrakt", meaning: "Det finns en spec för loggning av vem som såg vad, men ännu ingen kod som skickar loggarna." },
];
</script>

<template>
  <section id="nulage">
    <div class="head">
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
  </section>
</template>

