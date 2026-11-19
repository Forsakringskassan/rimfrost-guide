<template>
  <section id="portal">
    <div class="head">
      <p class="eyebrow">Användargränssnitt</p>
      <h2>Det handläggaren ser</h2>
      <p class="lede">
        Portalen är en ram med inloggning, uppgiftslista och navigering. Själva arbetsytan för varje regel är en egen
        liten app, en <b>mikrofrontend</b>, som portalen laddar in när en uppgift öppnas.
      </p>
    </div>
    <div class="stack">
      <div class="mock" aria-label="Skiss av handläggarportalen">
        <div class="mock-top"><i></i><i></i><i></i><span>portal-handlaggare · inloggad som Kim Berg</span></div>
        <div class="mock-body">
          <div class="mock-side">
            <div class="mock-task on"><b>Rätt till försäkring</b><small>Exempel: vård av husdjur · tilldelad idag</small></div>
            <div class="mock-task"><b>Bekräfta beslut</b><small>Exempel: vård av husdjur · igår</small></div>
            <div class="mock-task"><b>Komplettering</b><small>Exempel: vård av husdjur · igår</small></div>
            <div class="mock-btn">Hämta nästa uppgift</div>
            <div class="mock-btn secondary">Teamvy</div>
            <div class="mock-btn secondary">Sök uppgift</div>
          </div>
          <div class="mock-main">
            <div class="mock-title">Rubrik</div>
            <div class="mock-steps" aria-label="Processvy">
              <span class="done">Maskinell kontroll</span>
              <span class="now">Manuell kontroll</span>
              <span>Bekräfta beslut</span>
              <span>Kommunicering</span>
            </div>
            <div class="mock-slot">
              <b>Mikrofrontend för regeln</b>
              <span>t.ex. <code>regel-rtf-manuell-fe</code>, med en egen BFF</span>
              <span class="note">Laddas in vid körning. Vilken vy som hör till vilken regel står i portalens route-manifest.</span>
            </div>
            <div class="mock-toast">En eller flera uppgifter har tagits bort av behörighetsskäl</div>
          </div>
        </div>
      </div>
      <div class="grid2">
        <div class="card">
          <h3>Handläggarportalen</h3>
          <p>Här finns <i>mina uppgifter</i>, <i>hämta nästa</i>, <i>lämna tillbaka</i>, <i>teamvyn</i> och <i>sök uppgift</i>, där handläggaren kan söka fram uppgifter på en persons personnummer. Handläggarna är än så länge påhittade testpersoner.</p>
          <details class="more">
            <summary>För utvecklare</summary>
            <div>
              <p>Repon: <code>rimfrost-portal-handlaggare</code> och <code>rimfrost-portal-bff</code>.</p>
              <p>Portalen hämtar route-manifestet med <code>GET /api/route-manifest</code> och laddar in regelns vy med Module Federation. Sök uppgift går via <code>POST /tasks/search</code> i portal-bff.</p>
            </div>
          </details>
        </div>
        <div class="card">
          <h3>Processvyn</h3>
          <p>Ovanför en öppen uppgift visar processvyn processens steg: klara, pågående och kommande. Ett steg kan ha understeg i upp till tre nivåer. Varje process har en egen liten vy för det.</p>
          <details class="more">
            <summary>För utvecklare</summary>
            <div>
              <p>Vyer: <code>rimfrost-process-vah-fe</code> och <code>rimfrost-process-vab-fe</code>, med varsin BFF.</p>
              <p>Processen beskriver sina steg i <code>processbeskrivning.json</code> och svarar på <code>GET /processvy/steg</code> (<code>rimfrost-framework-process-openapi</code>).</p>
            </div>
          </details>
        </div>
        <div class="card">
          <h3>Adminportalen</h3>
          <p>Här ser admin alla uppgifter, kan avtilldela eller flytta dem till en viss handläggare och kan skapa och förhandsgranska sorteringsordningar.</p>
          <details class="more">
            <summary>För utvecklare</summary>
            <div>
              <p>Repon: <code>rimfrost-portal-admin-fe</code> och <code>rimfrost-portal-admin-bff</code>. Anropen till OUL står i <code>rimfrost-service-oul-management-openapi</code>.</p>
            </div>
          </details>
        </div>
        <div class="card">
          <h3>BFF</h3>
          <p>En <i>backend-for-frontend</i> är en liten server för en enda vy. Den hämtar och tvättar data och kontrollerar behörighet, så att webbläsaren aldrig pratar direkt med tjänsterna.</p>
          <details class="more">
            <summary>För utvecklare</summary>
            <div>
              <p>Gemensam grund: <code>rimfrost-framework-bff</code>, ett bibliotek med felhantering, hälsokontroll, vidarebefordran av inloggningen, loggning och iloggning.</p>
            </div>
          </details>
        </div>
      </div>
      <div id="identitet" class="card ident">
        <p class="eyebrow">Identitet</p>
        <h3>Hur Rimfrost vet vem handläggaren är</h3>
        <ol class="steps">
          <li><div><b>Inloggning</b><span>Handläggaren loggar in med Försäkringskassans vanliga inloggning. En intern tjänst för inloggning lägger på uppgifter om vem som är inloggad, och med varje anrop skickas ett bevis på det, en token.</span></div></li>
          <li><div><b>Identity-tjänsten svarar</b><span>Rimfrost frågar FK:s identity-tjänst vem token tillhör och får tillbaka en idtyp och ett idvärde. För en handläggare är idvärdet hens id-nummer.</span></div></li>
          <li><div><b>Rimfrost tolkar inte själv</b><span>Identity är en svart låda för Rimfrost. Rimfrost läser aldrig innehållet i token, utan använder bara svaret.</span></div></li>
          <li><div><b>Svaret används för behörighet</b><span>Med svaret kontrollerar regelns vy att det är handläggaren som har uppgiften, och tjänsten för behörighet svarar på om hen får se personer med skyddad identitet.</span></div></li>
        </ol>
        <p class="note">Roller och grupper används inte idag. Om de behövs senare beställs de från den interna tjänsten för inloggning och behörigheter.</p>
        <details class="more">
          <summary>För utvecklare</summary>
          <div>
            <p><code>rimfrost-service-identity</code> svarar på <code>GET /identity</code> med headern <code>Authorization: Bearer …</code> och returnerar idtyp och idvärde. I PoC:n är den en stub som läser värdena direkt ur token.</p>
            <p><code>rimfrost-service-permissions</code> svarar på <code>POST /hasSidPermission</code> med idtyp och idvärde i kroppen. Svaren är hårdkodade.</p>
            <p>Ramverken för manuella regler, komplettering och kommunicering anropar tjänsterna via <code>rimfrost-adapter-identity</code> och <code>rimfrost-adapter-permissions</code>. OUL anropar permissions.</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mock { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--bg); font-size: 0.82rem; }
.mock-top { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; background: var(--surface); border-bottom: 1px solid var(--line); }
.mock-top i { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: var(--line); }
.mock-top span { margin-left: 0.6rem; color: var(--muted); font-family: var(--f-mono); font-size: 0.72rem; }
.mock-body { display: grid; grid-template-columns: 13rem minmax(0, 1fr); min-height: 15rem; }
.mock-side { background: var(--surface); border-right: 1px solid var(--line); padding: 0.9rem; display: grid; gap: 0.5rem; align-content: start; }
.mock-btn { background: var(--accent); color: var(--bg); border-radius: 8px; padding: 0.5rem 0.7rem; font-weight: 700; text-align: center; }
.mock-task { border: 1px solid var(--line); border-radius: 8px; padding: 0.5rem 0.6rem; display: grid; gap: 0.1rem; }
.mock-task b { font-weight: 700; }
.mock-task small { color: var(--muted); }
.mock-task.on { border-color: var(--accent); background: var(--accent-soft); }
.mock-btn.secondary { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
.mock-main { padding: 1rem; display: grid; grid-template-rows: auto auto 1fr auto; gap: 0.6rem; }
.mock-steps { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.mock-steps span { border: 1px solid var(--line); border-radius: 999px; padding: 0.2rem 0.6rem; color: var(--muted); font-size: 0.72rem; }
.mock-steps .done { background: var(--ok-s); color: var(--ok); border-color: transparent; }
.mock-steps .now { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.mock-title { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 0.6rem 0.8rem; font: 600 0.95rem var(--f-display); }
.mock-slot { border: 1.5px dashed var(--c-portal); background: var(--c-portal-s); border-radius: 10px; display: grid; place-items: center; text-align: center; padding: 1rem; color: var(--c-portal); gap: 0.25rem; }
.mock-slot b { font: 600 0.95rem var(--f-display); }
.mock-slot .note { font-size: 0.75rem; opacity: 0.8; }
.mock-toast { border-radius: 8px; background: var(--warn-s); color: var(--warn); padding: 0.5rem 0.7rem; font-size: 0.75rem; }
.ident { max-width: 44rem; }
.ident .steps { margin-top: 0.75rem; }
.ident .note { margin-top: 1rem; color: var(--muted); font-size: 0.95rem; }
@media (max-width: 620px) {
  .mock-body { grid-template-columns: minmax(0, 1fr); }
  .mock-side { border-right: 0; border-bottom: 1px solid var(--line); }
}
</style>
