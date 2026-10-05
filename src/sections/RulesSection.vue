<template>
  <section id="regler">
    <div class="head">
      <p class="eyebrow">Regler</p>
      <h2>Maskinellt och manuellt</h2>
      <p class="lede">
        En regel avgör ett villkor och svarar med ett <b>utfall</b>: JA, NEJ, UTREDNING eller ERROR. Den kan göra det
        själv eller med hjälp av en handläggare.
      </p>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="kind">
          <span class="ic" data-c="regel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="3" /><path d="M9 11h.01M15 11h.01M9 15h6M12 6V3" /></svg>
          </span>
          <h3>Maskinell regel</h3>
        </div>
        <ol class="steps">
          <li><div><b>Tar emot frågan</b><span>Processen skickar ett meddelande med handläggningens id.</span></div></li>
          <li><div><b>Hämtar handläggningen</b><span>Läser yrkande och underlag. Vid störning försöker den igen med allt längre pauser.</span></div></li>
          <li><div><b>Avgör villkoret</b><span>Kör regelns logik, ofta en beslutstabell.</span></div></li>
          <li><div><b>Sparar och svarar</b><span>Skriver tillbaka underlaget och svarar processen med utfallet. Ingen människa är inblandad.</span></div></li>
        </ol>
      </div>
      <div class="card">
        <div class="kind">
          <span class="ic" data-c="portal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></svg>
          </span>
          <h3>Manuell regel</h3>
        </div>
        <ol class="steps">
          <li><div><b>Tar emot frågan</b><span>På samma sätt som en maskinell regel.</span></div></li>
          <li><div><b>Skapar en uppgift i OUL</b><span>Uppgiften får en beskrivning, en roll och en länk till regelns vy.</span></div></li>
          <li><div><b>Handläggaren arbetar</b><span>Vyn öppnas i portalen. Skyddad identitet kontrolleras varje gång underlaget visas.</span></div></li>
          <li><div><b>Klar</b><span>Uppgiften stängs i OUL och processen får svar. Under tiden har processen väntat.</span></div></li>
        </ol>
      </div>
    </div>
    <div class="tbl-wrap rules">
      <table>
        <thead><tr><th>Regel</th><th>Typ</th><th>Vad den avgör</th><th>Läge</th></tr></thead>
        <tbody>
          <tr><td><b>Rätt till försäkring</b><br /><span class="mono">regel-rtf-maskinell</span></td><td>Maskinell</td><td>Är personen folkbokförd och har den en anställning? JA om personen är folkbokförd, UTREDNING om den inte är folkbokförd men har en anställning, annars NEJ.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Komplettering</b><br /><span class="mono">regel-rtf-manuell-komplettering</span></td><td>Manuell</td><td>Körs alltid före den manuella prövningen. Saknas personnummer eller avsikt fyller en handläggare i det, annars svarar regeln JA direkt.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Rätt till försäkring, manuell</b><br /><span class="mono">regel-rtf-manuell</span></td><td>Manuell</td><td>Handläggaren går igenom folkbokföring och anställning och tar ställning till varje ersättningspost (JA, NEJ eller FU). Regeln svarar alltid JA till processen, och ställningstagandena används i Bekräfta beslut.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Bekräfta beslut</b><br /><span class="mono">regel-bekraftabeslut</span></td><td>Manuell</td><td>Handläggaren bekräftar beslutet. Utfallet blir JA om alla ersättningar är beviljade, annars NEJ.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Beräkna ersättning</b><br /><span class="mono">regel-beraknaersattning</span></td><td>Maskinell</td><td>Ska räkna fram beloppet. Svarar idag alltid JA.</td><td><span class="pill p-warn">Stub, inte i VAH</span></td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.kind { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1.25rem; }
.kind h3 { margin: 0; }
.ic { width: 2.4rem; height: 2.4rem; border-radius: 10px; display: grid; place-items: center; background: var(--ls); color: var(--lc); }
.ic svg { width: 1.3rem; height: 1.3rem; }
.rules { margin-top: 2rem; }
</style>
