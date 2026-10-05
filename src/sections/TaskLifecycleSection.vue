<template>
  <section id="oul">
    <div class="head">
      <p class="eyebrow">Operativt uppgiftslager (OUL)</p>
      <h2>Uppgiftens liv</h2>
      <p class="lede">
        OUL är den gemensamma kön för allt manuellt arbete. Alla manuella regler lägger sina uppgifter här, och alla
        handläggare hämtar sitt arbete härifrån.
      </p>
    </div>
    <div class="stack">
      <figure class="figure">
        <div class="scroll">
          <svg viewBox="0 0 880 300" role="img" aria-label="Tillståndsdiagram för en uppgift i OUL">
            <defs>
              <marker id="ar-oul" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path class="ah" d="M0 0 10 5 0 10z" />
              </marker>
            </defs>
            <text x="20" y="128" class="d-sub">Manuell regel</text>
            <text x="20" y="144" class="d-sub">skapar uppgift</text>
            <path d="M112 134H168" class="d-line" marker-end="url(#ar-oul)" />
            <rect x="170" y="108" width="130" height="52" rx="26" class="n-accent" />
            <text x="235" y="139" text-anchor="middle" class="d-state">NY</text>
            <path d="M300 126H458" class="d-line" marker-end="url(#ar-oul)" />
            <text x="379" y="114" text-anchor="middle" class="d-lbl">HÄMTA NÄSTA · ADMIN FLYTTAR</text>
            <rect x="460" y="108" width="150" height="52" rx="26" class="n-human" />
            <text x="535" y="139" text-anchor="middle" class="d-state">TILLDELAD</text>
            <path d="M480 160C430 214 330 214 262 164" class="d-line" marker-end="url(#ar-oul)" />
            <text x="372" y="226" text-anchor="middle" class="d-lbl">LÄMNA TILLBAKA · AVTILLDELA · SID-SPÄRR</text>
            <path d="M512 108C500 60 570 60 558 106" class="d-line" marker-end="url(#ar-oul)" />
            <text x="535" y="52" text-anchor="middle" class="d-lbl">TA ÖVER (TEAM)</text>
            <path d="M610 134H718" class="d-line" marker-end="url(#ar-oul)" />
            <text x="664" y="124" text-anchor="middle" class="d-lbl">REGEL KLAR</text>
            <text x="664" y="152" text-anchor="middle" class="d-lbl">AVBRYTS</text>
            <rect x="720" y="110" width="140" height="48" rx="24" class="n-ok" />
            <text x="790" y="139" text-anchor="middle" class="d-state">AVSLUTAD</text>
            <text x="790" y="184" text-anchor="middle" class="d-sub">Uppgiften raderas</text>
            <text x="790" y="200" text-anchor="middle" class="d-sub">ur kön</text>
          </svg>
        </div>
      </figure>
      <div class="grid2">
        <div class="card">
          <h3>Vem får vilken uppgift?</h3>
          <p>
            När handläggaren trycker <i>Hämta nästa</i> får hen den högst prioriterade lediga uppgiften. Prioriteten
            styrs av en <b>sorteringsordning</b> som admin ställer in, och bara en ordning är aktiv åt gången. Två
            handläggare kan aldrig få samma uppgift.
          </p>
        </div>
        <div class="card">
          <h3>Skyddad identitet (SID)</h3>
          <p>
            Om någon person i ärendet har skyddade personuppgifter får bara handläggare med SID-behörighet se uppgiften.
            Det kontrolleras vid tilldelning och vid varje listning. Om svaret är oklart nekar systemet hellre än att
            gissa.
          </p>
        </div>
        <div class="card">
          <h3>Team</h3>
          <p>
            I <b>teamvyn</b> ser handläggaren vad kollegorna i teamet har. Hen kan också <i>ta över</i> en kollegas
            uppgift, men bara inom samma team. För ärenden med skyddad identitet krävs SID-behörighet.
          </p>
        </div>
        <div class="card">
          <h3>Lämna tillbaka</h3>
          <p>
            En handläggare kan ge tillbaka en uppgift, t.ex. på grund av jäv. Uppgiften går då tillbaka till kön,
            och samma handläggare får den inte automatiskt igen.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
