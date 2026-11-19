export interface GlossaryTerm {
  term: string;
  definition: string;
  /** Technical detail for developers, shown in a collapsible part. */
  details?: string[];
  /** A section of the guide that explains the term further. */
  link?: { href: string; text: string };
}

const terms: GlossaryTerm[] = [
  {
    term: "Yrkande",
    definition: "Kundens ansökan eller anspråk, t.ex. om ersättning i exempelförmånen vård av husdjur.",
    details: [
      "Tas emot av: rimfrost-service-workflow, POST /yrkande.",
      "Sparas i: handläggningen i rimfrost-service-handlaggning, som yrkande i handläggningen.",
    ],
    link: { href: "#resan", text: "Ett ärendes resa" },
  },
  {
    term: "Handläggning",
    definition: "Behandlingen av ett yrkande, alltså ärendet. Har ett eget id som följer med genom hela flödet.",
    details: [
      "Ägs av: rimfrost-service-handlaggning, GET och PUT /handlaggning/{handlaggningId}. Yrkande, underlag och beslut ligger inne i handläggningen.",
      "Sparas bara i minnet och försvinner vid omstart.",
      "Regler når tjänsten via rimfrost-framework-handlaggning-adapter.",
    ],
    link: { href: "#nulage", text: "Nuläge och luckor" },
  },
  { term: "Handläggare", definition: "Den på Försäkringskassan som utreder och bedömer ärenden." },
  { term: "Underlag", definition: "Information som samlats in i ärendet, t.ex. folkbokföring och anställning." },
  {
    term: "Erbjudande",
    definition: "En förmån man kan ansöka om. Hör till en produkt.",
    details: [
      "Listas i: rimfrost-service-referensdata, GET /erbjudande.",
      "Vilken process som hör till ett erbjudande: rimfrost-service-erbjudande-topic, GET /topic/{erbjudandeId}, svarar med Kafka-topicen som workflow startar processen på.",
    ],
    link: { href: "#kontrakt", text: "Hur delarna pratar" },
  },
  {
    term: "Avsikt",
    definition: "Vad yrkandet vill: nytt, ändring, borttag eller återtaget.",
    details: ["Typerna finns i rimfrost-service-referensdata, GET /avsiktstyp. Saknas avsikt i yrkandet blir det en komplettering."],
  },
  {
    term: "Roll i yrkande",
    definition: "Vilken roll en person har i ärendet, t.ex. ägare.",
    details: ["Rollerna finns i rimfrost-service-referensdata, GET /yrkanderoll."],
  },
  {
    term: "Process",
    definition: "Flödet för en förmån som bestämmer i vilken ordning reglerna körs.",
    details: [
      "Exempel: rimfrost-process-vah (vah.bpmn) och rimfrost-process-vab (vab.bpmn).",
      "Startas av workflow med ett meddelande på Kafka (kontraktet rimfrost-process-asyncapi, kanalerna handlaggning.requests och handlaggning.responses).",
      "Anropar regler via processteg, rimfrost-regel-…-subprocess. Processens läge sparas i Postgres.",
    ],
    link: { href: "#resan", text: "Ett ärendes resa" },
  },
  {
    term: "Regel",
    definition: "En fristående del som avgör ett villkor. Den kan vara maskinell eller manuell.",
    details: [
      "Grund: rimfrost-framework-regel. Frågan och svaret följer kontraktet rimfrost-framework-regel-asyncapi (regel.requests och regel.responses).",
      "Varje regel har en egen topic per riktning, t.ex. rtf-maskinell-requests och rtf-maskinell-responses.",
      "Regelns inställningar, som lagrum och uppgiftens text, står i src/main/resources/config.yaml i regelns repo.",
    ],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Maskinell",
    definition: "Sköts automatiskt av systemet.",
    details: ["Maskinella regler bygger på rimfrost-framework-regel-maskinell. Mall: rimfrost-template-regel-maskinell."],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Manuell",
    definition: "Görs av en handläggare.",
    details: [
      "Manuella regler bygger på rimfrost-framework-regel-manuell. Mall: rimfrost-template-regel-manuell.",
      "Regeln skapar en uppgift i OUL och har en egen vy (…-fe) med en egen BFF (…-bff).",
    ],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Utfall",
    definition: "Regelns svar: JA, NEJ, UTREDNING eller ERROR.",
    details: ["Värdena är JA, NEJ, UTREDNING och ERROR i rimfrost-framework-regel-asyncapi. De skickas i regelns svarsmeddelande till processen."],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  { term: "Utredning", definition: "Ärendet behöver bedömas av en människa.", link: { href: "#resan", text: "Ett ärendes resa" } },
  {
    term: "RTF",
    definition: "Rätt till försäkring: omfattas personen av försäkringen?",
    details: ["Repon: rimfrost-regel-rtf-maskinell och rimfrost-regel-rtf-manuell, med vyn rimfrost-regel-rtf-manuell-fe och rimfrost-regel-rtf-manuell-bff."],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Komplettering",
    definition: "Att fylla i information som saknas i yrkandet.",
    details: [
      "Repon: rimfrost-regel-rtf-manuell-komplettering, med vy och BFF (…-fe, …-bff). Grund: rimfrost-framework-regel-komplettering.",
      "Körs först i processteget rimfrost-regel-rtf-manuell-subprocess.",
      "Prenumererar på ändringar av identitet via rimfrost-service-identitet-prenumeration. När meddelandet kommer kontrolleras yrkandet igen.",
    ],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Kommunicering",
    definition: "Steget där handläggaren registrerar hur kunden har svarat på beslutet. Godtas kundens invändning prövas ärendet om. En gemensam byggsten för alla processer som behöver kommunicera med kunden. Hittills inkopplad i exempelprocessen VAH, från version 1.3.",
    details: [
      "Grund: rimfrost-framework-regel-kommunicering. Exempelprocessen VAH använder rimfrost-regel-kommunicering med vy och BFF (…-fe, …-bff) och processteget rimfrost-regel-kommunicering-subprocess.",
      "Kundens svar registreras med PATCH /kommuniceringsutfall/{handlaggningId} (rimfrost-framework-regel-kommuniceringsutfall-openapi): KundAccepterat, NekatBestridande eller AccepteratBestridande.",
    ],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  {
    term: "Bekräfta beslut",
    definition: "Steget där en handläggare bekräftar beslutet. Det körs i alla ärenden.",
    details: [
      "Repon: rimfrost-regel-bekraftabeslut, med vy och BFF (…-fe, …-bff), och processteget rimfrost-regel-bekraftabeslut-subprocess.",
      "Regeln lägger beslutet i yrkandet och sparar handläggningen. Utfallet blir JA om alla ersättningar har beslutsutfall JA, annars NEJ.",
    ],
    link: { href: "#resan", text: "Ett ärendes resa" },
  },
  {
    term: "Lagrum",
    definition: "Det lagstöd som en regel bygger på, t.ex. en paragraf och ett stycke.",
    details: ["Står under lagrum i regelns config.yaml. Exempelförmånerna hänvisar till en påhittad lag, Husdjursbalken."],
  },
  {
    term: "Uppgift",
    definition: "Ett arbetsmoment för en handläggare.",
    details: [
      "Skapas av en manuell regel: POST /uppgifter och avslutas med POST /uppgifter/{uppgiftId}/end (rimfrost-service-oul-management-regler-openapi).",
      "Status: NY, TILLDELAD, AVSLUTAD eller AVBRUTEN.",
      "Uppgiftens text och roll står under specifikation i regelns config.yaml.",
    ],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "OUL",
    definition: "Operativt uppgiftslager, den gemensamma kön av uppgifter.",
    details: [
      "Repo: rimfrost-service-oul. Sparar i Postgres.",
      "Kontrakt: rimfrost-service-oul-openapi (handläggare), -management-openapi (admin), -management-regler-openapi (regler) och -asyncapi (statusnotiser).",
    ],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Tilldelad",
    definition: "Uppgiften ligger hos en viss handläggare.",
    details: ["Status TILLDELAD i OUL. Admin kan flytta en uppgift med PATCH /uppgifter/{uppgiftId} och lägga tillbaka den i kön med POST /uppgifter/{uppgiftId}/unassign."],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Hämta nästa",
    definition: "Handläggaren får den högst prioriterade lediga uppgiften.",
    details: ["POST /uppgifter/handlaggare i rimfrost-service-oul. Ordningen styrs av den aktiva sorteringsordningen."],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Sorteringsordning",
    definition: "Admins regler för i vilken ordning uppgifterna delas ut.",
    details: [
      "Ändras i adminportalen (rimfrost-portal-admin-fe).",
      "Anrop i rimfrost-service-oul-management-openapi: POST /sorteringsordning skapar, POST /sorteringsordning/preview förhandsgranskar och PUT /sorteringsordning/{id}/aktiv gör en ordning aktiv.",
    ],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Team",
    definition: "En grupp handläggare. Handläggaren ser teamets uppgifter och kan ta över en kollegas uppgift.",
    details: [
      "Ägs av: rimfrost-service-team, en stub med fyra team och tre testhandläggare.",
      "Anrop: GET /individ/{idTyp}/{idVarde}/team och GET /team/{teamId}/individer. OUL når tjänsten via rimfrost-adapter-team.",
    ],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Teamvy",
    definition: "Lista över de uppgifter som handläggarens team har.",
    details: ["GET /uppgifter/team i rimfrost-service-oul."],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Ta över",
    definition: "Att ta en kollegas uppgift inom samma team.",
    details: ["POST /uppgifter/{uppgift_id}/handlaggare i rimfrost-service-oul. Svarar 403 om uppgiften inte får tas över, t.ex. på grund av SID."],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Lämna tillbaka",
    definition: "Handläggaren ger tillbaka en uppgift till kön, t.ex. på grund av jäv. Samma handläggare får den inte automatiskt igen.",
    details: ["DELETE /uppgifter/{uppgift_id}/handlaggare i rimfrost-service-oul. Handläggaren spärras för just den uppgiften, så hämta nästa hoppar över den."],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  { term: "Jäv", definition: "Intressekonflikt som gör att en handläggare inte får hantera ärendet.", link: { href: "#oul", text: "Uppgiftens liv" } },
  {
    term: "SID",
    definition:
      "Skyddad identitet. Två saker hålls isär: personens skyddade identitet, alltså att någon i ärendet har skyddade personuppgifter, och handläggarens SID-behörighet, alltså att handläggaren får hantera sådana ärenden. " +
      "Det kontrolleras när en uppgift tilldelas, i listorna över mina uppgifter och teamets uppgifter, när någon tar över en uppgift och varje gång en manuell regel, en komplettering eller kommuniceringen visar underlag. " +
      "Personens skyddade identitet bestäms av sid-tjänsten och handläggarens behörighet av behörighetstjänsten. Båda är hårdkodade i PoC:n, och det finns inget gränssnitt för att ändra dem.",
    details: [
      "Personens SID: rimfrost-service-sid, POST /sid/status. En person räknas som skyddad om personnumret slutar på 4444, t.ex. demopersonen 19900101-4444.",
      "Handläggarens SID-behörighet: rimfrost-service-permissions, POST /hasSidPermission. Svaren är hårdkodade, och bara en av de tre testhandläggarna har behörighet. Den går inte att ändra i adminportalen.",
      "OUL frågar båda tjänsterna vid tilldelning, listning och ta över. Ramverken för manuella regler, komplettering och kommunicering gör samma kontroll när underlaget hämtas.",
    ],
    link: { href: "#oul", text: "Uppgiftens liv" },
  },
  {
    term: "Behörighet",
    definition: "Vad en handläggare har rätt att se och göra.",
    details: [
      "Idag finns bara SID-behörighet: rimfrost-service-permissions, POST /hasSidPermission, hårdkodad.",
      "Regelns vy kontrollerar också att det är den inloggade handläggaren som har uppgiften. Annars svarar den 403.",
    ],
    link: { href: "#identitet", text: "Hur Rimfrost vet vem handläggaren är" },
  },
  {
    term: "Beslut",
    definition: "Det formella beslutet i ärendet. Består av beslutsrader.",
    details: ["Sparas i yrkandet i rimfrost-service-handlaggning. Skrivs av rimfrost-regel-bekraftabeslut."],
    link: { href: "#resan", text: "Ett ärendes resa" },
  },
  {
    term: "Beslutsutfall",
    definition: "Vad beslutet blev, t.ex. beviljat eller avslag.",
    details: ["För varje ersättning är beslutsutfallet JA, NEJ eller FU (rimfrost-regel-bekraftabeslut-openapi). Typerna finns också i referensdata, GET /beslutsutfallstyp."],
  },
  { term: "Avslag", definition: "Nej till yrkandet." },
  { term: "Ersättning", definition: "Pengar som betalas ut." },
  {
    term: "Ersättningspost",
    definition: "En rad ersättning som handläggaren tar ställning till.",
    details: ["I koden heter den Ersattning: typ, omfattning, belopp, beräkningsgrund, beslutsutfall och period (rimfrost-regel-bekraftabeslut-openapi)."],
    link: { href: "#regler", text: "Maskinellt och manuellt" },
  },
  { term: "Beräkningsgrund", definition: "Underlaget som beloppet räknas fram ur." },
  {
    term: "Folkbokföring",
    definition: "Registret över var personer bor i Sverige.",
    details: ["I Rimfrost en stub: rimfrost-service-folkbokforing, GET /folkbokforing/{persnr}. Svarar alltid med testpersonen Lisa Tass i Luleå. Regler når den via rimfrost-adapter-folkbokford."],
    link: { href: "#nulage", text: "Nuläge och luckor" },
  },
  {
    term: "FSSÄ-information",
    definition: "Status som kunden ser, t.ex. att handläggaren väntar på information från hen.",
    details: ["Typerna finns i rimfrost-service-referensdata, GET /fssainformationstyp."],
  },
  {
    term: "Id-nummer",
    definition: "Numret som identifierar en handläggare. Det är det idvärde som identity-tjänsten svarar med för en handläggare.",
    details: ["rimfrost-service-identity, GET /identity med headern Authorization: Bearer …, svarar med idtyp och idvärde. I PoC:n en stub som läser värdena direkt ur token."],
    link: { href: "#identitet", text: "Hur Rimfrost vet vem handläggaren är" },
  },
  {
    term: "Iloggning",
    definition: "Loggning av vem som har tagit del av information om en person.",
    details: [
      "Meddelandet InformationsaccessEvent skickas på Kafka-topicen informationsaccess (rimfrost-service-informationsaccess-asyncapi).",
      "Skickas idag av rimfrost-regel-rtf-manuell-bff och rimfrost-regel-kommunicering-bff. Stödet finns i rimfrost-framework-bff.",
    ],
    link: { href: "#kontrakt", text: "Hur delarna pratar" },
  },
  {
    term: "BFF",
    definition: "Backend-for-frontend, en liten server bakom en enda vy.",
    details: ["Gemensam grund: rimfrost-framework-bff, ett bibliotek med felhantering, hälsokontroll, vidarebefordran av inloggningen, loggning och iloggning."],
    link: { href: "#portal", text: "Det handläggaren ser" },
  },
  {
    term: "Mikrofrontend",
    definition: "En liten separat vy som portalen laddar in.",
    details: ["Portalen laddar in vyerna med Module Federation när uppgiften öppnas. Vilken vy som hör till vilken uppgift står i route-manifestet."],
    link: { href: "#portal", text: "Det handläggaren ser" },
  },
  {
    term: "Route-manifest",
    definition: "Listan som talar om vilken vy portalen ska ladda in för en viss uppgift.",
    details: [
      "Ligger i rimfrost-portal-bff (src/main/resources/remotes.json) och hämtas med GET /api/route-manifest. I klustret sätts det i rimfrost-kubernetes, helm-chart/values.yaml.",
      "Nyckeln är sista delen av uppgiftens länk, t.ex. rtf-manuell.",
    ],
    link: { href: "#portal", text: "Det handläggaren ser" },
  },
  {
    term: "Processvy",
    definition: "Visar processens steg ovanför en öppen uppgift: klara, pågående och kommande. Ett steg kan ha understeg.",
    details: [
      "Vyer: rimfrost-process-vah-fe och rimfrost-process-vab-fe (stegindikatorn), med varsin BFF.",
      "Processen beskriver sina steg i processbeskrivning.json och svarar på GET /processvy/steg?aktivitetId=… (rimfrost-framework-process, rimfrost-framework-process-openapi).",
    ],
    link: { href: "#portal", text: "Det handläggaren ser" },
  },
  {
    term: "Kafka",
    definition: "Meddelandesystemet som processer och regler använder för att skicka meddelanden till varandra.",
    details: [
      "Meddelanden skickas på en topic. Exempel: vah-handlaggning-requests startar exempelprocessen VAH, rtf-maskinell-requests frågar maskinell RTF och informationsaccess tar emot iloggningar.",
      "Hur meddelandena ser ut står i repon som slutar på -asyncapi.",
    ],
    link: { href: "#kontrakt", text: "Hur delarna pratar" },
  },
  {
    term: "Kontrakt",
    definition: "Överenskommelse om hur anrop och meddelanden ser ut (OpenAPI och AsyncAPI).",
    link: { href: "#repon", text: "Repo-kartan" },
  },
  {
    term: "Adapter",
    definition: "En färdig koppling som en tjänst eller regel använder för att anropa en annan tjänst.",
    details: ["Bibliotek som rimfrost-framework-handlaggning-adapter, rimfrost-framework-sid-adapter, rimfrost-adapter-team och rimfrost-adapter-permissions. Var och en bygger en klient från tjänstens OpenAPI-kontrakt."],
    link: { href: "#repon", text: "Repo-kartan" },
  },
  {
    term: "Stub",
    definition: "En låtsastjänst som svarar med testdata.",
    details: ["Stubbar idag: rimfrost-service-folkbokforing, -arbetsgivare, -sid, -permissions, -team och -identity."],
    link: { href: "#nulage", text: "Nuläge och luckor" },
  },
  {
    term: "VAH",
    definition: "Vård av husdjur. En påhittad exempelförmån utan lagstöd, som inte finns hos Försäkringskassan. Den visar hur Rimfrost fungerar.",
    details: ["Repo: rimfrost-process-vah (src/main/resources/vah.bpmn). Startas på topicen vah-handlaggning-requests."],
    link: { href: "#resan", text: "Ett ärendes resa" },
  },
  {
    term: "VAB",
    definition: "Här vård av boskap. Också en påhittad exempelförmån utan lagstöd. Den visar att samma byggstenar går att återanvända.",
    details: ["Repo: rimfrost-process-vab (src/main/resources/vab.bpmn). Startas på topicen vab-handlaggning-requests."],
    link: { href: "#start", text: "På en minut" },
  },
  { term: "Kundbehov", definition: "Äldre ord för yrkande som finns kvar i en del kod." },
  { term: "FKPOC", definition: "Projektnyckeln i Jira.", link: { href: "#arbetssatt", text: "Så jobbar vi" } },
];

export const glossary: GlossaryTerm[] = [...terms].sort((a, b) => a.term.localeCompare(b.term, "sv"));
