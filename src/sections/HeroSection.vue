<template>
  <section id="start">
    <div class="hero">
      <p class="eyebrow">Försäkringskassan · PoC · läget 2 oktober 2026</p>
      <h1>Rimfrost<span>.</span></h1>
      <p class="lede">
        En ny plattform för handläggning. Den byggs upp av små, utbytbara delar: processer som styr flödet, regler som
        fattar delbeslut och en gemensam kö av uppgifter för handläggarna.
      </p>
      <div class="facts">
        <span><b>77</b>repon</span>
        <span><b>2</b>processer (VAH, VAB)</span>
        <span><b>4</b>regler i drift</span>
        <span><b>1</b>uppgiftslager</span>
        <span><b>FKPOC</b>i Jira</span>
      </div>
      <svg class="frost" viewBox="0 0 900 120" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".55">
          <path d="M0 100 C120 60 220 110 330 70 S560 40 660 80 820 50 900 64" />
          <path d="M0 110 C150 80 260 118 380 88 S600 64 720 96 860 76 900 84" opacity=".5" />
        </g>
        <g stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".7">
          <path d="M120 40v24M109.6 46l20.8 12M130.4 46l-20.8 12" />
          <path d="M470 22v16M463 26l14 8M477 26l-14 8" opacity=".6" />
          <path d="M760 34v20M751.3 39l17.4 10M768.7 39l-17.4 10" opacity=".8" />
          <path d="M300 18v10M295.7 20.5l8.6 5M304.3 20.5l-8.6 5" opacity=".5" />
        </g>
      </svg>
    </div>
    <div class="prose">
      <p>
        Rimfrost är ett proof of concept som Försäkringskassan bygger för att pröva en ny arkitektur för handläggning. I
        stället för ett stort system per förmån finns här gemensamma byggstenar, och en ny förmån ska kunna sättas ihop
        av dem.
      </p>
      <p>
        Pilotförmånen är den påhittade <b>vård av husdjur (VAH)</b>. Den har en tvilling, <b>vård av boskap (VAB)</b>,
        som finns för att visa att samma delar går att återanvända. Förmånerna är fiktiva, men flödet är realistiskt: ett
        yrkande kommer in, rätten till försäkring prövas, en handläggare utreder vid behov och ett beslut bekräftas.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero { padding-block: 2rem 1rem; display: grid; gap: 1.6rem; }
h1 { font-size: clamp(2.6rem, 6.5vw, 4.6rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
h1 span { color: var(--accent); }
.hero .lede { font-size: 1.25rem; max-width: 40rem; }
.facts { display: flex; flex-wrap: wrap; gap: 0.6rem 1.8rem; color: var(--muted); font-size: 0.92rem; padding-top: 0.4rem; }
.facts b { font: 600 1.05rem var(--f-display); color: var(--ink); font-variant-numeric: tabular-nums; margin-right: 0.3rem; }
.frost { height: 120px; width: 100%; color: var(--accent); opacity: 0.9; }
</style>
