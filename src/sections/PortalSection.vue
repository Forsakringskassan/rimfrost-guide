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
            <div class="mock-task on"><b>Rätt till försäkring</b><small>Vård av husdjur · tilldelad idag</small></div>
            <div class="mock-task"><b>Bekräfta beslut</b><small>Vård av husdjur · igår</small></div>
            <div class="mock-task"><b>Komplettering</b><small>Vård av husdjur · igår</small></div>
            <div class="mock-btn">Hämta nästa uppgift</div>
            <div class="mock-btn secondary">Teamvy</div>
          </div>
          <div class="mock-main">
            <div class="mock-title">Rubrik</div>
            <div class="mock-slot">
              <b>Mikrofrontend för regeln</b>
              <span>t.ex. <code>regel-rtf-manuell-fe</code>, med en egen BFF</span>
              <span class="note">Laddas in vid körning. Vilken vy som hör till vilken regel står i portalens route-manifest.</span>
            </div>
            <div class="mock-toast">En eller flera uppgifter har tagits bort av behörighetsskäl</div>
          </div>
        </div>
      </div>
      <div class="grid3">
        <div class="card">
          <h3>Handläggarportalen</h3>
          <p>Här finns <i>mina uppgifter</i>, <i>hämta nästa</i>, <i>lämna tillbaka</i> och <i>teamvyn</i>. Handläggarna är än så länge påhittade testpersoner.</p>
        </div>
        <div class="card">
          <h3>Adminportalen</h3>
          <p>Här ser admin alla uppgifter, kan avtilldela eller flytta dem till en viss handläggare och kan skapa och förhandsgranska sorteringsordningar.</p>
        </div>
        <div class="card">
          <h3>BFF</h3>
          <p>En <i>backend-for-frontend</i> är en liten server för en enda vy. Den hämtar och tvättar data och kontrollerar behörighet, så att webbläsaren aldrig pratar direkt med tjänsterna.</p>
        </div>
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
.mock-main { padding: 1rem; display: grid; grid-template-rows: auto 1fr auto; gap: 0.6rem; }
.mock-title { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 0.6rem 0.8rem; font: 600 0.95rem var(--f-display); }
.mock-slot { border: 1.5px dashed var(--c-portal); background: var(--c-portal-s); border-radius: 10px; display: grid; place-items: center; text-align: center; padding: 1rem; color: var(--c-portal); gap: 0.25rem; }
.mock-slot b { font: 600 0.95rem var(--f-display); }
.mock-slot .note { font-size: 0.75rem; opacity: 0.8; }
.mock-toast { border-radius: 8px; background: var(--warn-s); color: var(--warn); padding: 0.5rem 0.7rem; font-size: 0.75rem; }
@media (max-width: 620px) {
  .mock-body { grid-template-columns: minmax(0, 1fr); }
  .mock-side { border-right: 0; border-bottom: 1px solid var(--line); }
}
</style>
