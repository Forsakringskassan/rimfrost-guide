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
    <h3 class="sub-head">Så hänger de ihop i ett ärende</h3>
    <ol class="steps order">
      <li><div><b>Maskinell regel</b><span>Rätt till försäkring kontrolleras automatiskt. Blir svaret UTREDNING går ärendet vidare till den manuella prövningen.</span></div></li>
      <li><div><b>Komplettering</b><span>Det första steget i den manuella prövningen. Saknas något i yrkandet får en handläggare fylla i det.</span></div></li>
      <li><div><b>Manuell regel</b><span>En handläggare går igenom underlaget och tar ställning till varje ersättningspost.</span></div></li>
      <li><div><b>Bekräfta beslut</b><span>En handläggare bekräftar beslutet. Det här steget körs i alla ärenden.</span></div></li>
      <li><div><b>Kommunicering</b><span>Nytt i 1.3. En gemensam byggsten för processer som behöver kommunicera med kunden, hittills inkopplad i exempelprocessen VAH. En handläggare registrerar hur kunden har svarat på beslutet. Godtas kundens invändning börjar ärendet om från den maskinella regeln.</span></div></li>
    </ol>
    <div class="tbl-wrap rules">
      <table>
        <thead><tr><th>Regel</th><th>Typ</th><th>Vad den avgör</th><th>Läge</th></tr></thead>
        <tbody>
          <tr><td><b>Rätt till försäkring</b><br /><span class="mono">regel-rtf-maskinell</span></td><td>Maskinell</td><td>Är personen folkbokförd och har den en anställning? JA om personen är folkbokförd, UTREDNING om den inte är folkbokförd men har en anställning, annars NEJ.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Komplettering</b><br /><span class="mono">regel-rtf-manuell-komplettering</span></td><td>Manuell</td><td>Körs alltid först i den manuella prövningen. Saknas personnummer eller avsikt fyller en handläggare i det, annars svarar regeln JA direkt. Uppdateras en persons identitet medan kompletteringen väntar kontrolleras yrkandet igen, och är det komplett blir kompletteringen klar av sig själv.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Rätt till försäkring, manuell</b><br /><span class="mono">regel-rtf-manuell</span></td><td>Manuell</td><td>Handläggaren går igenom folkbokföring och anställning och tar ställning till varje ersättningspost (JA, NEJ eller FU). Regeln svarar alltid JA till processen, och ställningstagandena används i Bekräfta beslut.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Bekräfta beslut</b><br /><span class="mono">regel-bekraftabeslut</span></td><td>Manuell</td><td>Handläggaren bekräftar beslutet. Utfallet blir JA om alla ersättningar är beviljade, annars NEJ.</td><td><span class="pill p-ok">I drift</span></td></tr>
          <tr><td><b>Kommunicering</b><br /><span class="mono">regel-kommunicering</span></td><td>Manuell</td><td>Gemensam byggsten för kommunikation med kunden, hittills inkopplad i VAH. Handläggaren registrerar hur kunden har svarat på beslutet. Godtas kundens invändning blir utfallet NEJ och ärendet prövas om, annars JA.</td><td><span class="pill p-warn">På gång i 1.3</span></td></tr>
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
.order { max-width: 44rem; }
</style>
