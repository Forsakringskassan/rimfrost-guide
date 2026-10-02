<template>
  <section id="kontrakt">
    <div class="head">
      <p class="eyebrow">Integration</p>
      <h2>Hur delarna pratar</h2>
      <p class="lede">
        Delarna pratar med varandra på två sätt: med <b>meddelanden</b> som skickas och besvaras senare, och med
        <b>anrop</b> som får svar direkt.
      </p>
    </div>
    <div class="grid2">
      <div class="card">
        <p class="eyebrow">Meddelanden · Kafka · AsyncAPI</p>
        <h3>Ungefär som brev</h3>
        <p>Processen skickar en fråga till en regel och väntar, ibland i flera dagar om en människa ska göra jobbet. Svaret kommer när det kommer.</p>
        <ul>
          <li>Process → regel: <i>gör din bedömning</i></li>
          <li>Regel → process: <i>utfallet blev JA</i></li>
          <li>OUL → regel: <i>uppgiften är nu tilldelad</i></li>
          <li>BFF → iloggning: <i>Lisa såg uppgifter om person X</i> (planerat)</li>
        </ul>
      </div>
      <div class="card">
        <p class="eyebrow">Anrop · REST · OpenAPI</p>
        <h3>Ungefär som telefonsamtal</h3>
        <p>När någon behöver ett svar direkt ringer den upp, till exempel för att hämta ett ärende eller skapa en uppgift.</p>
        <ul>
          <li>Regel → handläggning: <i>ge mig yrkandet</i></li>
          <li>Regel → OUL: <i>skapa en uppgift</i></li>
          <li>OUL → SID: <i>har någon i ärendet skyddad identitet?</i></li>
          <li>Portal → BFF → OUL: <i>ge mig nästa uppgift</i></li>
        </ul>
      </div>
    </div>
    <p class="callout after">
      Varje kontrakt ligger i ett eget repo som slutar på <code>-openapi</code> eller <code>-asyncapi</code>. Om en
      ändring påverkar ett kontrakt görs den ändringen först, i en egen ticket, och sedan anpassas tjänsterna.
    </p>
  </section>
</template>

<style scoped>
.card h3 { margin-bottom: 0.6rem; }
.card > p:not(.eyebrow) { margin-bottom: 1rem; }
ul { margin: 0; padding-left: 1.1rem; color: var(--muted); font-size: 0.9rem; display: grid; gap: 0.35rem; }
.after { margin-top: 2rem; }
</style>
