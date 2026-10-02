<template>
  <section id="arbetssatt">
    <div class="head">
      <p class="eyebrow">Arbetssätt</p>
      <h2>Så jobbar vi</h2>
      <p class="lede">Från idé till levererad ändring.</p>
    </div>
    <ol class="steps">
      <li><div><b>Idé eller ticket</b><span>Arbetet börjar som en beskrivning eller en Jira-ticket i projektet <code>FKPOC</code>.</span></div></li>
      <li><div><b>Krav</b><span>Kraven skrivs som numrerade ska-krav, till exempel <code>OUL-FR-03.2</code>, och läggs i repots <code>docs/krav.md</code>.</span></div></li>
      <li><div><b>Uppdelning</b><span>Arbetet delas upp i tunna skivor som var och en går att demonstrera. Kontraktsändringar kommer först.</span></div></li>
      <li><div><b>Bygge</b><span>En branch per ticket, till exempel <code>feat/FKPOC-1010-…</code>. Varje push byggs och testas automatiskt.</span></div></li>
      <li><div><b>Test i helhet</b><span>Hela systemet körs lokalt i Kubernetes (<code>rimfrost-kubernetes</code>), och skript fyller det med demodata.</span></div></li>
      <li><div><b>Release</b><span>Varje repo släpps för sig. Den nya versionen förs sedan in i driftsättningen.</span></div></li>
    </ol>
    <footer>
      <span>Rimfrost-guiden · innehållet bygger på kunskapsbasen i projektets governor, läget den 2 oktober 2026.</span>
      <span>Hittar du något som inte stämmer? Skriv det i en mötesanteckning eller öppna en pull request mot <code>rimfrost-guide</code>.</span>
    </footer>
  </section>
</template>

<style scoped>
.steps { max-width: 44rem; }
footer { margin-top: 5rem; color: var(--faint); font-size: 0.85rem; padding-top: 3rem; border-top: 1px solid var(--line); display: grid; gap: 0.4rem; }
</style>
