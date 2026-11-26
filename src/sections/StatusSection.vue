<script setup lang="ts">
const parts = [
  { name: "Uppgiftslager (OUL)", pill: "p-ok", label: "Riktig", meaning: "Har databas, tilldelning, team- och SID-regler och sorteringsordning." },
  { name: "Workflow", pill: "p-ok", label: "Riktig", meaning: "Tar emot yrkanden och startar rätt process. Skickar bara vidare att ärendet är klart, inte resultatet." },
  { name: "Processer, regler, portaler", pill: "p-ok", label: "Riktiga", meaning: "Hela flödet i exempelprocessen VAH går att köra från början till slut." },
  { name: "Handläggning", pill: "p-warn", label: "Delvis", meaning: "Logiken fungerar, men data sparas bara i minnet och försvinner vid omstart." },
  { name: "Folkbokföring, arbetsgivare", pill: "p-mute", label: "Stub", meaning: "Svarar alltid med samma testperson, Lisa Tass i Luleå, anställd hos Region Dalarna." },
  { name: "Team och handläggare", pill: "p-mute", label: "Stub", meaning: "Hårdkodade testdata: fyra team och tre påhittade handläggare. Tjänsten innehåller bara team och medlemmar, inte behörigheter." },
  { name: "Skyddad identitet och SID-behörighet", pill: "p-mute", label: "Stub", meaning: "Två egna tjänster med hårdkodade svar. Personer vars nummer slutar på 4444 räknas som skyddade, och bara en av testhandläggarna har SID-behörighet. Inget av det går att ändra i adminportalen." },
  { name: "Identitet", pill: "p-mute", label: "Stub", meaning: "Står i för FK:s identity-tjänst och svarar med det som står i inloggningens token, utan att slå upp något." },
  { name: "Kommunicering", pill: "p-warn", label: "Delvis", meaning: "En gemensam byggsten för alla processer som behöver kommunicera med kunden. Körs i den gemensamma miljön, men är hittills bara inkopplad i exempelprocessen VAH." },
  { name: "Iloggning", pill: "p-ok", label: "Riktig", meaning: "Alla handläggarvyer för regler loggar vem som såg vad: manuell RTF, komplettering, Bekräfta beslut och kommunicering." },
];
</script>

<template>
  <section id="nulage">
    <div class="head">
      <h2>Nuläge och luckor</h2>
      <p class="lede">Kärnan fungerar på riktigt, men flera kringtjänster låtsas än så länge.</p>
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

