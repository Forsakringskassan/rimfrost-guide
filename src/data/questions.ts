export interface OpenQuestion {
  /** Same id as in the governor's knowledge/open-questions.md. */
  id: string;
  question: string;
  context?: string;
}

export const openQuestions: OpenQuestion[] = [
  { id: "OQ-01", question: "Var ska behörighetsdatan, t.ex. SID-behörighet, ligga permanent?", context: "Idag ligger den tillfälligt i team-stubben." },
  { id: "OQ-03", question: "Varifrån ska handläggarnas identiteter och namn komma?", context: "Idag är handläggarna påhittade." },
  { id: "OQ-04", question: "Ska jävsskäl loggas när en uppgift lämnas tillbaka? I så fall var?" },
  { id: "OQ-05", question: "Ska en handläggare som lämnat tillbaka en uppgift också spärras från adminflytt och övertagande?", context: "Idag spärras hen bara från automatisk tilldelning." },
  { id: "OQ-06", question: "Vilken BFF ska skicka iloggningshändelser, och när?", context: "Kontraktet finns, men ingen skickar händelserna." },
  { id: "OQ-07", question: "Vilka statusvärden ska gälla för en uppgift?", context: "OUL, de andra specarna och FK:s modell använder olika listor." },
  { id: "OQ-08", question: "Vad betyder beslutsutfallet FU, och vilken lista över beslutsutfall ska gälla?" },
  { id: "OQ-09", question: "Står RTF för rätt till försäkring eller rätt till förmån?" },
  { id: "OQ-11", question: "Är det avsiktligt att en folkbokförd person utan anställning får JA i den maskinella RTF-kontrollen?" },
  { id: "OQ-13", question: "Ska Rimfrosts yrkandestatus få FK-modellens Återtaget och Makulerat?", context: "FK:s datamodell har sju statusvärden, Rimfrost har fem." },
];
