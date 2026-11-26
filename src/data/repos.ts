export type RepoCategory = "process" | "regel" | "tjanst" | "portal" | "ramverk" | "kontrakt" | "internt" | "drift";

export const categoryLabels: Record<RepoCategory, string> = {
  process: "Process",
  regel: "Regel",
  tjanst: "Tjänst",
  portal: "Portal & vy",
  ramverk: "Ramverk",
  kontrakt: "Kontrakt",
  internt: "Internt & mock",
  drift: "Drift & mall",
};

export type ContractKind = "openapi" | "asyncapi";

export const contractLabels: Record<ContractKind, string> = {
  openapi: "OpenAPI (anrop)",
  asyncapi: "AsyncAPI (meddelanden)",
};

/** A filter in the repo map: a category, one of the two kinds of contract, or everything. */
export type RepoFilter = RepoCategory | ContractKind | "alla";

/** Contract repos end in -openapi or -asyncapi; the one exception, vah-regel-rtf-api, is an AsyncAPI spec. */
export function contractKind(repo: Repo): ContractKind | undefined {
  if (repo.category !== "kontrakt") return undefined;
  return repo.name.endsWith("-openapi") ? "openapi" : "asyncapi";
}

export function matchesFilter(repo: Repo, filter: RepoFilter): boolean {
  if (filter === "alla") return true;
  if (filter === "openapi" || filter === "asyncapi") return contractKind(repo) === filter;
  return repo.category === filter;
}

export function filterLabel(filter: RepoFilter): string {
  if (filter === "alla") return "Alla";
  if (filter === "openapi" || filter === "asyncapi") return contractLabels[filter];
  return categoryLabels[filter];
}

export interface Repo {
  /** Name without the `rimfrost-` prefix. */
  name: string;
  category: RepoCategory;
  description: string;
}

export const repos: Repo[] = [
  { name: "process-vah", category: "process", description: "Exempelprocessen för vård av husdjur, en påhittad förmån utan lagstöd." },
  { name: "process-vab", category: "process", description: "Exempelprocessen för vård av boskap, också påhittad. Visar att plattformen kan återanvändas." },
  { name: "regel-rtf-maskinell-subprocess", category: "process", description: "Processteget som anropar maskinell RTF, med tidsgräns och nya försök." },
  { name: "regel-rtf-manuell-subprocess", category: "process", description: "Processteget som anropar komplettering och manuell RTF." },
  { name: "regel-bekraftabeslut-subprocess", category: "process", description: "Processteget som anropar Bekräfta beslut." },
  { name: "regel-kommunicering-subprocess", category: "process", description: "Processteget som anropar kommunicering. Om ingen svarar i tid tas uppgiften bort och processen går vidare." },
  { name: "process-vah-fe", category: "portal", description: "Processvyn för exempelprocessen VAH: processens steg och understeg ovanför uppgiften." },
  { name: "process-vah-bff", category: "portal", description: "BFF för processvyn för exempelprocessen VAH." },
  { name: "process-vab-fe", category: "portal", description: "Processvyn för exempelprocessen VAB." },
  { name: "process-vab-bff", category: "portal", description: "BFF för processvyn för exempelprocessen VAB." },
  { name: "process-asyncapi", category: "kontrakt", description: "Meddelandena för att starta en process och få dess resultat." },
  { name: "regel-rtf-maskinell", category: "regel", description: "Rätt till försäkring, maskinell kontroll av folkbokföring och anställning." },
  { name: "regel-rtf-manuell-komplettering", category: "regel", description: "Komplettering av yrkanden som saknar personnummer eller avsikt." },
  { name: "regel-rtf-manuell-komplettering-fe", category: "portal", description: "Vy för att komplettera ett yrkande som saknar personnummer eller avsikt." },
  { name: "regel-rtf-manuell-komplettering-bff", category: "portal", description: "BFF för kompletteringsvyn. Loggar vem som såg underlaget." },
  { name: "regel-rtf-manuell-komplettering-openapi", category: "kontrakt", description: "Anropen för komplettering." },
  { name: "regel-kommunicering", category: "regel", description: "Kommuniceringen som exempelprocessen VAH använder, byggd på den gemensamma byggstenen framework-regel-kommunicering. Handläggaren registrerar hur kunden har svarat på beslutet. Nytt i 1.3." },
  { name: "regel-kommunicering-fe", category: "portal", description: "Handläggarens vy för kommunicering." },
  { name: "regel-kommunicering-bff", category: "portal", description: "BFF för vyn för kommunicering. Loggar vem som såg underlaget." },
  { name: "regel-kommunicering-openapi", category: "kontrakt", description: "Anropen för kommunicering." },
  { name: "regel-rtf-manuell", category: "regel", description: "Rätt till försäkring när en handläggare behöver bedöma." },
  { name: "regel-rtf-manuell-fe", category: "portal", description: "Handläggarens vy för manuell RTF." },
  { name: "regel-rtf-manuell-bff", category: "portal", description: "BFF för vyn för manuell RTF." },
  { name: "regel-rtf-manuell-openapi", category: "kontrakt", description: "Anropen för manuell RTF." },
  { name: "regel-rtf-manuell-asyncapi", category: "kontrakt", description: "Meddelandena för manuell RTF." },
  { name: "regel-bekraftabeslut", category: "regel", description: "Handläggaren bekräftar beslutet." },
  { name: "regel-bekraftabeslut-fe", category: "portal", description: "Vyn för att bekräfta beslut." },
  { name: "regel-bekraftabeslut-bff", category: "portal", description: "BFF för vyn för att bekräfta beslut. Loggar vem som såg underlaget." },
  { name: "regel-bekraftabeslut-openapi", category: "kontrakt", description: "Anropen för att bekräfta beslut." },
  { name: "vah-regel-rtf-api", category: "kontrakt", description: "Äldre meddelandekontrakt för RTF i exempelprocessen VAH." },
  { name: "framework-regel", category: "ramverk", description: "Grund för alla regler: ta emot frågor, läsa konfiguration och svara." },
  { name: "framework-regel-maskinell", category: "ramverk", description: "Grund för maskinella regler." },
  { name: "framework-regel-manuell", category: "ramverk", description: "Grund för manuella regler: uppgifter i OUL, vyer och SID-kontroll." },
  { name: "framework-regel-komplettering", category: "ramverk", description: "Grund för kompletteringsregler: kontroll, vid behov en uppgift i OUL och, om regeln vill, ny kontroll när en identitet uppdateras." },
  { name: "framework-regel-komplettering-asyncapi", category: "kontrakt", description: "Gemensamma meddelanden för kompletteringsregler." },
  { name: "framework-regel-kommunicering", category: "ramverk", description: "Gemensam byggsten för kommunicering med kunden, som alla processer kan använda: en uppgift i OUL, vyns anrop och kundens svar som utfall." },
  { name: "framework-regel-kommuniceringsutfall-openapi", category: "kontrakt", description: "Anropet för att registrera hur kunden svarade i kommuniceringen." },
  { name: "framework-regel-uppgiftskommentar-openapi", category: "kontrakt", description: "Anropet för att lägga en kommentar på en uppgift." },
  { name: "framework-regel-oul", category: "ramverk", description: "Grund för regler som skapar uppgifter i OUL och svarar när de är klara." },
  { name: "framework-regel-error-codes", category: "ramverk", description: "Felkoderna som regler svarar med när något går fel." },
  { name: "framework-regel-openapi", category: "kontrakt", description: "Gemensamma anrop för alla regler." },
  { name: "framework-regel-oul-openapi", category: "kontrakt", description: "Gemensamma anrop för regler med uppgifter i OUL." },
  { name: "framework-regel-oul-asyncapi", category: "kontrakt", description: "Gemensamma meddelanden för regler med uppgifter i OUL." },
  { name: "framework-regel-asyncapi", category: "kontrakt", description: "Det gällande regelprotokollet: fråga och utfall." },
  { name: "framework-process", category: "ramverk", description: "Gemensam kod för processer, t.ex. att avsluta med fel och beskriva stegen i processvyn." },
  { name: "framework-process-openapi", category: "kontrakt", description: "Gemensamma anrop för processer, t.ex. stegen i processvyn." },
  { name: "framework-oul", category: "ramverk", description: "Låter regler skapa uppgifter och följa deras status i OUL." },
  { name: "framework-bff", category: "ramverk", description: "Gemensam grund för BFF:er: felhantering, hälsokontroll och loggning." },
  { name: "framework-handlaggning-adapter", category: "ramverk", description: "Färdig koppling till handläggningstjänsten." },
  { name: "framework-oul-adapter", category: "ramverk", description: "Färdig koppling till OUL." },
  { name: "framework-sid-adapter", category: "ramverk", description: "Färdig koppling till tjänsten för skyddad identitet." },
  { name: "framework-identitet-prenumeration-adapter", category: "ramverk", description: "Färdig koppling för att börja och sluta prenumerera på ändringar av en identitet." },
  { name: "framework-erbjudande-topic-adapter", category: "ramverk", description: "Färdig koppling till tjänsten för erbjudandens Kafka-topic." },
  { name: "service-workflow", category: "tjanst", description: "Tar emot nya yrkanden och startar handläggningen." },
  { name: "service-workflow-openapi", category: "kontrakt", description: "Anropen för att skapa yrkanden och starta processer." },
  { name: "service-oul", category: "tjanst", description: "Operativt uppgiftslager: kön, tilldelning, team, SID och prioritering." },
  { name: "service-oul-openapi", category: "kontrakt", description: "Handläggarens anrop till OUL." },
  { name: "service-oul-management-openapi", category: "kontrakt", description: "Admins anrop till OUL, inklusive sorteringsordning." },
  { name: "service-oul-management-regler-openapi", category: "kontrakt", description: "Reglernas anrop för att skapa och avsluta uppgifter." },
  { name: "service-oul-asyncapi", category: "kontrakt", description: "Statusnotiser från OUL." },
  { name: "service-handlaggning", category: "tjanst", description: "Handläggningen: yrkande, underlag och beslut. Sparar idag bara i minnet." },
  { name: "service-handlaggning-openapi", category: "kontrakt", description: "Anropen för handläggning." },
  { name: "service-handlaggning-asyncapi", category: "kontrakt", description: "Meddelanden om handläggning." },
  { name: "service-referensdata", category: "tjanst", description: "Referensdata, t.ex. idtyper, yrkandestatus och erbjudanden." },
  { name: "service-referensdata-openapi", category: "kontrakt", description: "Anropen för referensdata." },
  { name: "service-erbjudande-topic", category: "tjanst", description: "Talar om vilket Kafka-topic som hör till ett erbjudande." },
  { name: "service-erbjudande-topic-openapi", category: "kontrakt", description: "Anropen för erbjudandens Kafka-topic." },
  { name: "service-folkbokforing", category: "tjanst", description: "Folkbokföring. Stub som svarar med en testperson." },
  { name: "service-folkbokforing-ulf", category: "tjanst", description: "Variant av folkbokföringsstubben." },
  { name: "service-folkbokforing-openapi", category: "kontrakt", description: "Anropen för folkbokföring." },
  { name: "service-arbetsgivare", category: "tjanst", description: "Anställning och specificerad lön. Stub." },
  { name: "service-arbetsgivare-openapi", category: "kontrakt", description: "Anropen för arbetsgivare." },
  { name: "service-sid", category: "tjanst", description: "Har någon i ärendet skyddad identitet? Stub." },
  { name: "service-sid-openapi", category: "kontrakt", description: "Anropen för skyddad identitet." },
  { name: "service-team", category: "tjanst", description: "Team och deras medlemmar. Stub." },
  { name: "service-team-openapi", category: "kontrakt", description: "Anropen för team." },
  { name: "service-permissions", category: "tjanst", description: "Har handläggaren SID-behörighet? Stub med hårdkodade svar." },
  { name: "service-permissions-openapi", category: "kontrakt", description: "Anropen för behörighet, t.ex. SID-behörighet." },
  { name: "service-identity", category: "tjanst", description: "Vem är inloggad? Stub för FK:s identity-tjänst, som svarar med idtyp och idvärde." },
  { name: "service-identity-openapi", category: "kontrakt", description: "Vem är inloggad, utifrån en inloggningstoken." },
  { name: "service-identitet-prenumeration", category: "tjanst", description: "Håller reda på vem som vill veta när en identitet uppdateras och skickar ett meddelande när det händer." },
  { name: "service-identitet-prenumeration-openapi", category: "kontrakt", description: "Anropen för att börja och sluta prenumerera på en identitet." },
  { name: "service-identitet-prenumeration-test-openapi", category: "kontrakt", description: "Testanrop som låtsas att en identitet har uppdaterats." },
  { name: "identitet-uppdaterad-asyncapi", category: "kontrakt", description: "Meddelandet om att en identitet har uppdaterats." },
  { name: "service-informationsaccess-asyncapi", category: "kontrakt", description: "Meddelandet om vem som har sett vilken information." },
  { name: "regler", category: "internt", description: "Exempelapplikation." },
  { name: "framework-referensdata-interface", category: "internt", description: "Internt gränssnitt för att slå upp namn på erbjudanden." },
  { name: "adapter-folkbokford", category: "internt", description: "Intern koppling som låter regler hämta testdata från folkbokföringsstubben." },
  { name: "adapter-arbetsgivare", category: "internt", description: "Intern koppling som låter regler hämta testdata från arbetsgivarstubben." },
  { name: "adapter-team", category: "internt", description: "Intern koppling som låter regler hämta testdata från teamstubben." },
  { name: "adapter-referensdata", category: "internt", description: "Intern koppling som låter regler hämta referensdata." },
  { name: "adapter-identity", category: "internt", description: "Intern koppling som låter OUL och regler fråga identity-tjänsten vem som är inloggad." },
  { name: "adapter-permissions", category: "internt", description: "Intern koppling som låter OUL och regler fråga om SID-behörighet." },
  { name: "referensdata-erbjudande", category: "internt", description: "Intern hjälp för att slå upp namn på erbjudanden." },
  { name: "ersattning-data", category: "internt", description: "Intern datamodell för ersättningar som delas mellan regler." },
  { name: "datamodels", category: "internt", description: "Datamodeller för dataleveranser till Mimer. Används inte av Rimfrosts flöde." },
  { name: "pojo", category: "internt", description: "Äldre konceptuell domänmodell med kundbehov, ersättning och lagrum." },
  { name: "portal-handlaggare", category: "portal", description: "Handläggarportalen: mina uppgifter, hämta nästa, teamvy." },
  { name: "portal-bff", category: "portal", description: "BFF för portalen. Talar också om vilken vy som hör till vilken regel." },
  { name: "portal-admin-fe", category: "portal", description: "Adminportalen: alla uppgifter, flytta och sorteringsordningar." },
  { name: "portal-admin-bff", category: "portal", description: "BFF för adminportalen." },
  { name: "template-process", category: "drift", description: "Mall för en ny process." },
  { name: "template-regel-subprocess", category: "drift", description: "Mall för ett nytt processteg som anropar en regel." },
  { name: "template-regel-maskinell", category: "drift", description: "Mall för en ny maskinell regel." },
  { name: "template-regel-manuell", category: "drift", description: "Mall för en ny manuell regel." },
  { name: "template-regel-manuell-openapi", category: "drift", description: "Mall för anropen till en manuell regel." },
  { name: "template-regel-komplettering", category: "drift", description: "Mall för en ny kompletteringsregel." },
  { name: "template-regel-komplettering-openapi", category: "drift", description: "Mall för anropen till en kompletteringsregel." },
  { name: "template-regel-kommunicering", category: "drift", description: "Mall för en ny kommuniceringsregel." },
  { name: "template-regel-kommunicering-openapi", category: "drift", description: "Mall för anropen till en kommuniceringsregel." },
  { name: "template-referensdata-erbjudande", category: "drift", description: "Mall för uppslag av namn på erbjudanden." },
  { name: "template-micro-fe", category: "drift", description: "Mall för en ny regelvy." },
  { name: "template-micro-fe-bff", category: "drift", description: "Mall för en ny BFF." },
  { name: "kubernetes", category: "drift", description: "Kör hela Rimfrost lokalt, med demodata och helhetstester." },
  { name: "guide", category: "drift", description: "Den här guiden." },
];
