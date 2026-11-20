<template>
  <section id="resan">
    <div class="head">
      <p class="eyebrow">Exempelprocessen VAH</p>
      <h2>Ett ärendes resa</h2>
      <p class="lede">
        Så går ett yrkande i exempelprocessen VAH, den påhittade förmånen vård av husdjur, genom systemet. Yrkandet kommer in via workflow-tjänsten, som startar rätt
        process för förmånen. Gröna steg sköts av systemet självt och orange steg görs av en handläggare.
      </p>
    </div>
    <div class="stack">
      <figure class="figure">
        <div class="scroll">
          <svg viewBox="0 0 1000 360" role="img" aria-label="Flödesschema för exempelprocessen VAH">
            <defs>
              <marker id="ar-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path class="ah" d="M0 0 10 5 0 10z" />
              </marker>
            </defs>
            <circle cx="46" cy="130" r="20" class="n-accent" />
            <text x="46" y="172" text-anchor="middle" class="d-sub">Yrkande in</text>
            <text x="46" y="188" text-anchor="middle" class="d-sub">via workflow</text>
            <path d="M66 130H104" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="106" y="98" width="176" height="64" rx="12" class="n-machine" />
            <text x="194" y="124" text-anchor="middle" class="d-text">Rätt till försäkring</text>
            <text x="194" y="144" text-anchor="middle" class="d-sub">maskinell kontroll</text>
            <path d="M282 130H310" class="d-line" marker-end="url(#ar-flow)" />
            <path d="M340 102 368 130 340 158 312 130Z" class="n-neutral" />
            <text x="340" y="134" text-anchor="middle" class="d-lbl">?</text>
            <text x="340" y="90" text-anchor="middle" class="d-lbl">UTFALL</text>
            <path d="M368 130H538" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="407" y="116" width="92" height="22" rx="11" fill="var(--surface)" />
            <text x="453" y="131" text-anchor="middle" class="d-lbl">JA · NEJ</text>
            <path d="M340 158V260H392" class="d-line" marker-end="url(#ar-flow)" />
            <text x="350" y="216" class="d-lbl">UTREDNING</text>
            <rect x="394" y="228" width="154" height="64" rx="12" class="n-human" stroke-dasharray="5 4" />
            <text x="471" y="254" text-anchor="middle" class="d-text">Komplettering</text>
            <text x="471" y="274" text-anchor="middle" class="d-sub">uppgift bara vid behov</text>
            <path d="M548 260H578" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="580" y="228" width="164" height="64" rx="12" class="n-human" />
            <text x="662" y="254" text-anchor="middle" class="d-text">Rätt till försäkring</text>
            <text x="662" y="274" text-anchor="middle" class="d-sub">manuell kontroll</text>
            <path d="M640 228V164" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="540" y="98" width="150" height="64" rx="12" class="n-human" />
            <text x="615" y="124" text-anchor="middle" class="d-text">Bekräfta beslut</text>
            <text x="615" y="144" text-anchor="middle" class="d-sub">handläggaren godkänner</text>
            <path d="M690 130H718" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="720" y="98" width="160" height="64" rx="12" class="n-human" />
            <text x="800" y="124" text-anchor="middle" class="d-text">Kommunicering</text>
            <text x="800" y="144" text-anchor="middle" class="d-sub">kundens svar på beslutet</text>
            <text x="800" y="188" text-anchor="middle" class="d-lbl">NYTT I 1.3 · PÅ GÅNG</text>
            <path d="M780 98V36H194V96" class="d-line d-dash" marker-end="url(#ar-flow)" />
            <text x="487" y="28" text-anchor="middle" class="d-lbl">INVÄNDNINGEN GODTAS → ÄRENDET PRÖVAS OM</text>
            <path d="M880 130H912" class="d-line" marker-end="url(#ar-flow)" />
            <circle cx="938" cy="130" r="20" class="n-process" />
            <circle cx="938" cy="130" r="14" fill="none" stroke="var(--c-process)" stroke-width="1.5" />
            <text x="938" y="172" text-anchor="middle" class="d-sub">Kunden</text>
            <text x="938" y="188" text-anchor="middle" class="d-sub">informeras</text>
            <text x="938" y="76" text-anchor="middle" class="d-lbl">GODKÄND</text>
            <text x="938" y="92" text-anchor="middle" class="d-lbl">EJ GODKÄND</text>
            <path d="M120 336H900" class="d-line d-dash d-bad" />
            <circle cx="120" cy="336" r="4" class="n-bad" />
            <text x="134" y="326" class="d-lbl t-bad">ERROR I NÅGOT STEG → FELVÄG → RESULTAT FEL</text>
          </svg>
        </div>
        <figcaption class="caption">
          <span class="key"><span class="sw" style="background: var(--c-regel-s); border-color: var(--c-regel)"></span>Maskinell regel</span>
          <span class="key"><span class="sw" style="background: var(--c-portal-s); border-color: var(--c-portal)"></span>Manuell regel (handläggare)</span>
          <span class="key"><span class="sw" style="background: var(--c-portal-s); border-color: var(--c-portal); border-style: dashed"></span>Uppgift bara vid behov</span>
        </figcaption>
      </figure>
      <div class="grid2">
        <div class="card">
          <p class="eyebrow">Steg 1</p>
          <h3>Systemet kontrollerar</h3>
          <p>Regeln hämtar folkbokföring och anställning för personerna i yrkandet. En beslutstabell ger JA, NEJ eller UTREDNING.</p>
        </div>
        <div class="card">
          <p class="eyebrow">Steg 2, vid behov</p>
          <h3>Handläggaren utreder</h3>
          <p>Vid UTREDNING kontrolleras först om personnummer eller avsikt saknas. I så fall får en handläggare kompletteringen som uppgift. Sedan går en handläggare igenom underlaget och tar ställning till varje ersättningspost.</p>
        </div>
        <div class="card">
          <p class="eyebrow">Steg 3</p>
          <h3>Beslutet bekräftas</h3>
          <p>En handläggare bekräftar beslutet. Processen svarar GODKÄND om alla ersättningar är beviljade och annars EJ GODKÄND. Blir det fel i något steg blir svaret FEL.</p>
        </div>
        <div class="card">
          <p class="eyebrow">Steg 4, nytt i 1.3 <span class="pill p-warn">På gång</span></p>
          <h3>Kunden får säga sitt</h3>
          <p>Kommunicering är en gemensam byggsten som alla processer kan använda när de behöver kommunicera med kunden. Hittills är den bara inkopplad i VAH. En handläggare får en uppgift och registrerar hur kunden har svarat på beslutet. Godtar kunden beslutet, eller står handläggaren fast vid det, går ärendet vidare. Godtas kundens invändning prövas ärendet om från början. Sist informeras kunden om beslutet.</p>
          <details class="more">
            <summary>För utvecklare</summary>
            <div>
              <p>Kommunicering finns i <code>rimfrost-process-vah</code> 1.3.0, men den versionen körs ännu inte i den gemensamma miljön och kommunicering har ingen image i <code>rimfrost-kubernetes</code>. <code>rimfrost-process-vab</code> anropar den inte än.</p>
              <p>Utfallen är <code>KundAccepterat</code> och <code>NekatBestridande</code> (JA, processen går vidare) samt <code>AccepteratBestridande</code> (NEJ, processen börjar om vid maskinell RTF). Steget <i>Informera om beslut</i> körs efter kommuniceringen och avslutar processen.</p>
            </div>
          </details>
        </div>
      </div>
      <p class="callout">
        Varje steg har en tidsgräns. Om maskinell RTF eller Bekräfta beslut inte svarar i tid försöker processen igen,
        upp till tre gånger. För manuell RTF är gränsen tio minuter och processen försöker inte igen: hinner
        handläggaren inte bli klar avslutas ärendet med FEL. Kommuniceringen har också tio minuter på sig. Går tiden ut
        tas uppgiften bort och ärendet går vidare som om kunden godtagit beslutet. Processen sparar sitt läge i en
        databas.
      </p>
    </div>
  </section>
</template>
