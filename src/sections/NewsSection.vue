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
    title: "Identitet och behörighet i egna tjänster",
    text: "Vem handläggaren är och om hen har SID-behörighet avgörs nu av två egna tjänster, identity och permissions. Om en persons identitet uppdateras medan en komplettering väntar kontrolleras yrkandet igen, och är det komplett blir kompletteringen klar av sig själv.",
    href: "#identitet",
    linkText: "Hur Rimfrost vet vem handläggaren är",
    repos: ["service-identity", "service-permissions", "adapter-identity", "adapter-permissions", "service-identitet-prenumeration", "framework-identitet-prenumeration-adapter", "identitet-uppdaterad-asyncapi", "framework-regel-komplettering"],
    tickets: "FKPOC-1108, FKPOC-1267, FKPOC-1269, FKPOC-1290, FKPOC-1300",
    note: "Team-tjänsten innehåller nu bara team och medlemmar. SID-behörigheten har flyttat till permissions (POST /hasSidPermission).",
  },
  {
    title: "Kommunicering, en ny byggsten",
    text: "Kommunicering är en gemensam byggsten för alla processer som behöver kommunicera med kunden. Efter att beslutet bekräftats får en handläggare en uppgift för kommunicering och registrerar hur kunden har svarat. Godtas kundens invändning prövas ärendet om. Hittills är den inkopplad i exempelprocessen VAH.",
    href: "#resan",
    linkText: "Ett ärendes resa",
    pending: "På gång",
    repos: ["regel-kommunicering", "regel-kommunicering-fe", "regel-kommunicering-bff", "regel-kommunicering-openapi", "regel-kommunicering-subprocess", "framework-regel-kommunicering", "framework-regel-kommuniceringsutfall-openapi", "framework-regel-uppgiftskommentar-openapi", "process-vah"],
    tickets: "FKPOC-1144, FKPOC-1272, FKPOC-1282, FKPOC-1292",
    note: "Finns i process-vah 1.3.0, men den versionen körs ännu inte i den gemensamma miljön och kommunicering har ingen image i rimfrost-kubernetes. Det är inte bestämt om kommunicering ingår i 1.3.",
  },
  {
    title: "Iloggning när någon ser uppgifter om en person",
    text: "När en handläggare öppnar underlaget i manuell RTF eller i kommuniceringen loggas vem som såg uppgifter om vilken person.",
    href: "#kontrakt",
    linkText: "Hur delarna pratar",
    repos: ["framework-bff", "regel-rtf-manuell-bff", "regel-kommunicering-bff", "service-informationsaccess-asyncapi"],
    tickets: "FKPOC-1102, FKPOC-1103",
    note: "BFF:erna skickar ett meddelande på Kafka-topicen informationsaccess. Vyerna för komplettering och Bekräfta beslut loggar inte än.",
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
