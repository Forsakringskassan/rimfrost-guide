<script setup lang="ts">
interface News {
  title: string;
  text: string;
  /** Anchor of the section that describes the news in more detail. */
  href: string;
  linkText: string;
  /** Set when the news exists in the code but isn't running in the joint environment yet. */
  pending?: string;
  repos: string[];
  tickets: string;
  note?: string;
}

const news: News[] = [
  {
    title: "Processvyn visar var ärendet är",
    text: "Ovanför uppgiften ser handläggaren nu processens steg: vilka som är klara, vilket som pågår och vilka som kommer. Ett steg kan ha understeg, i upp till tre nivåer.",
    href: "#portal",
    linkText: "Det handläggaren ser",
    repos: ["process-vah-fe", "process-vab-fe", "process-vah-bff", "process-vab-bff", "framework-process", "framework-process-openapi", "portal-handlaggare", "portal-bff", "service-oul"],
    tickets: "FKPOC-1116, FKPOC-1161 till 1175, FKPOC-1304 till 1314",
    note: "Processen beskriver sina steg och svarar på GET /processvy/steg. Vyn för varje process laddas in i portalen som en egen mikrofrontend.",
  },
  {
    title: "Sök uppgift på personnummer",
    text: "Handläggaren kan söka fram uppgifter för en viss person med personnumret. Uppgifter där någon har skyddad identitet visas bara för den som har SID-behörighet.",
    href: "#portal",
    linkText: "Det handläggaren ser",
    repos: ["portal-handlaggare", "portal-bff", "service-oul", "service-oul-openapi"],
    tickets: "FKPOC-1122, FKPOC-1131",
    note: "Portalen anropar portal-bff (POST /tasks/search), som frågar OUL (POST /uppgifter/individ/unassignable).",
  },
  {
    title: "SID-behörighet i egen tjänst och uppdaterade identiteter",
    text: "Om handläggaren har SID-behörighet avgörs nu av en egen tjänst för behörighet. En kompletteringsregel kan välja att följa personerna i yrkandet. Uppdateras en identitet medan kompletteringen väntar kontrolleras yrkandet igen, och är det komplett blir kompletteringen klar av sig själv. Manuell RTF-komplettering gör så.",
    href: "#oul",
    linkText: "Uppgiftens liv",
    repos: ["service-permissions", "adapter-permissions", "service-identitet-prenumeration", "framework-identitet-prenumeration-adapter", "identitet-uppdaterad-asyncapi", "framework-regel-komplettering"],
    tickets: "FKPOC-1108, FKPOC-1267, FKPOC-1269, FKPOC-1290, FKPOC-1300",
    note: "Team-tjänsten innehåller nu bara team och medlemmar. SID-behörigheten har flyttat till permissions (POST /hasSidPermission). Prenumerationen är frivillig: regeln returnerar vilka identiteter den vill följa i getPrenumerationsIdentiteter(), och som standard följs inga.",
  },
  {
    title: "Kommunicering, en ny byggsten",
    text: "Kommunicering är en gemensam byggsten för alla processer som behöver kommunicera med kunden. Efter att beslutet bekräftats får en handläggare en uppgift för kommunicering och registrerar hur kunden har svarat. Godtas kundens invändning prövas ärendet om. Hittills är den inkopplad i exempelprocessen VAH.",
    href: "#resan",
    linkText: "Ett ärendes resa",
    repos: ["regel-kommunicering", "regel-kommunicering-fe", "regel-kommunicering-bff", "regel-kommunicering-openapi", "regel-kommunicering-subprocess", "framework-regel-kommunicering", "framework-regel-kommuniceringsutfall-openapi", "framework-regel-uppgiftskommentar-openapi", "process-vah"],
    tickets: "FKPOC-1144, FKPOC-1272, FKPOC-1282, FKPOC-1292",
    note: "Kopplades in i process-vah 1.3.0. Kommuniceringens regel, vy och BFF körs i den gemensamma miljön (rimfrost-kubernetes). process-vab anropar den inte än.",
  },
  {
    title: "Iloggning när någon ser uppgifter om en person",
    text: "När en handläggare öppnar underlaget i manuell RTF, kompletteringen, Bekräfta beslut eller kommuniceringen loggas vem som såg uppgifter om vilken person.",
    href: "#kontrakt",
    linkText: "Hur delarna pratar",
    repos: ["framework-bff", "regel-rtf-manuell-bff", "regel-rtf-manuell-komplettering-bff", "regel-bekraftabeslut-bff", "regel-kommunicering-bff", "framework-regel-komplettering", "service-informationsaccess-asyncapi"],
    tickets: "FKPOC-1102, FKPOC-1103, FKPOC-1498",
    note: "BFF:erna skickar ett meddelande på Kafka-topicen informationsaccess med stöd från framework-bff. För kompletteringen skickar ramverket med uppgifterna som behövs för loggningen i svaret på GET /{handlaggningId}.",
  },
];
</script>

<template>
  <section id="nytt">
    <div class="head">
      <p class="eyebrow">Version 1.3</p>
      <h2>Nytt i 1.3 (kommande)</h2>
      <p class="lede">
        Det här har tillkommit sedan version 1.2. Version 1.3 är ännu inte släppt, så innehållet kan ändras innan den
        blir klar.
      </p>
    </div>
    <div class="news">
      <div v-for="n in news" :key="n.title" class="card">
        <h3>
          {{ n.title }}
          <span v-if="n.pending" class="pill p-warn">{{ n.pending }}</span>
        </h3>
        <p>{{ n.text }}</p>
        <p class="go">Läs mer: <a :href="n.href">{{ n.linkText }}</a></p>
        <details class="more">
          <summary>För utvecklare</summary>
          <div>
            <p v-if="n.note">{{ n.note }}</p>
            <p>
              Repon:
              <template v-for="(r, i) in n.repos" :key="r"><code>rimfrost-{{ r }}</code><template v-if="i < n.repos.length - 1">, </template></template>
            </p>
            <p>Jira: {{ n.tickets }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news { display: grid; gap: 1rem; max-width: 44rem; }
.card h3 { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.card > p.go { margin-top: 0.6rem; font-size: 0.9rem; }
</style>
