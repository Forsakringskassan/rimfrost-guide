<template>
  <section id="resan">
    <div class="head">
      <p class="eyebrow">Processen VAH</p>
      <h2>Ett ärendes resa</h2>
      <p class="lede">
        Så går ett yrkande om vård av husdjur genom systemet. Gröna steg sköts av systemet självt och orange steg görs av
        en handläggare.
      </p>
    </div>
    <div class="stack">
      <figure class="figure">
        <div class="scroll">
          <svg viewBox="0 0 960 340" role="img" aria-label="Flödesschema för VAH-processen">
            <defs>
              <marker id="ar-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path class="ah" d="M0 0 10 5 0 10z" />
              </marker>
            </defs>
            <circle cx="46" cy="110" r="20" class="n-accent" />
            <text x="46" y="152" text-anchor="middle" class="d-sub">Yrkande in</text>
            <path d="M66 110H104" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="106" y="78" width="176" height="64" rx="12" class="n-machine" />
            <text x="194" y="104" text-anchor="middle" class="d-text">Rätt till försäkring</text>
            <text x="194" y="124" text-anchor="middle" class="d-sub">maskinell kontroll</text>
            <path d="M282 110H310" class="d-line" marker-end="url(#ar-flow)" />
            <path d="M340 82 368 110 340 138 312 110Z" class="n-neutral" />
            <text x="340" y="114" text-anchor="middle" class="d-lbl">?</text>
            <text x="340" y="70" text-anchor="middle" class="d-lbl">UTFALL</text>
            <path d="M368 110H654" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="462" y="96" width="92" height="22" rx="11" fill="var(--surface)" />
            <text x="508" y="111" text-anchor="middle" class="d-lbl">JA · NEJ</text>
            <path d="M340 138V240H392" class="d-line" marker-end="url(#ar-flow)" />
            <text x="350" y="196" class="d-lbl">UTREDNING</text>
            <rect x="394" y="208" width="154" height="64" rx="12" class="n-human" stroke-dasharray="5 4" />
            <text x="471" y="234" text-anchor="middle" class="d-text">Komplettering</text>
            <text x="471" y="254" text-anchor="middle" class="d-sub">om pnr eller avsikt saknas</text>
            <path d="M548 240H578" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="580" y="208" width="164" height="64" rx="12" class="n-human" />
            <text x="662" y="234" text-anchor="middle" class="d-text">Rätt till försäkring</text>
            <text x="662" y="254" text-anchor="middle" class="d-sub">manuell kontroll</text>
            <path d="M744 240H790V144" class="d-line" marker-end="url(#ar-flow)" />
            <rect x="656" y="78" width="168" height="64" rx="12" class="n-human" />
            <text x="740" y="104" text-anchor="middle" class="d-text">Bekräfta beslut</text>
            <text x="740" y="124" text-anchor="middle" class="d-sub">handläggaren godkänner</text>
            <path d="M824 110H872" class="d-line" marker-end="url(#ar-flow)" />
            <circle cx="894" cy="110" r="20" class="n-process" />
            <circle cx="894" cy="110" r="14" fill="none" stroke="var(--c-process)" stroke-width="1.5" />
            <text x="894" y="152" text-anchor="middle" class="d-sub">Informera</text>
            <text x="894" y="168" text-anchor="middle" class="d-sub">om beslut</text>
            <text x="894" y="40" text-anchor="middle" class="d-lbl">GODKÄND</text>
            <text x="894" y="56" text-anchor="middle" class="d-lbl">EJ GODKÄND</text>
            <path d="M120 316H860" class="d-line d-dash d-bad" />
            <circle cx="120" cy="316" r="4" class="n-bad" />
            <text x="134" y="306" class="d-lbl t-bad">ERROR I NÅGOT STEG → FELVÄG → RESULTAT FEL</text>
          </svg>
        </div>
        <figcaption class="caption">
          <span class="key"><span class="sw" style="background: var(--c-regel-s); border-color: var(--c-regel)"></span>Maskinell regel</span>
          <span class="key"><span class="sw" style="background: var(--c-portal-s); border-color: var(--c-portal)"></span>Manuell regel (handläggare)</span>
          <span class="key"><span class="sw" style="background: var(--c-portal-s); border-color: var(--c-portal); border-style: dashed"></span>Bara vid behov</span>
        </figcaption>
      </figure>
      <div class="grid3">
        <div class="card">
          <p class="eyebrow">Steg 1</p>
          <h3>Systemet kontrollerar</h3>
          <p>Regeln hämtar folkbokföring och anställning för personerna i yrkandet. En beslutstabell ger JA, NEJ eller UTREDNING.</p>
        </div>
        <div class="card">
          <p class="eyebrow">Steg 2, vid behov</p>
          <h3>Handläggaren utreder</h3>
          <p>Vid UTREDNING skapas en uppgift. Handläggaren går igenom underlaget och tar ställning till varje ersättningspost.</p>
        </div>
        <div class="card">
          <p class="eyebrow">Steg 3</p>
          <h3>Beslutet bekräftas</h3>
          <p>En handläggare bekräftar beslutet. Processen svarar sedan GODKÄND, EJ GODKÄND eller FEL.</p>
        </div>
      </div>
      <p class="callout">
        Varje steg har en tidsgräns. Om en regel inte svarar i tid (för manuell RTF tio minuter) försöker processen igen.
        Processen sparar sitt läge i en databas, så ett ärende som väntar på en handläggare överlever en omstart.
      </p>
    </div>
  </section>
</template>
