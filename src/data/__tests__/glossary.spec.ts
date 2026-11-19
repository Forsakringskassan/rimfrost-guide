import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { glossary } from "../glossary";
import { sections } from "../sections";

/** Every id="…" in the section components, so links may also point to anchors inside a section. */
const sectionsDir = new URL("../../sections/", import.meta.url);
const anchors = new Set([
  ...sections.map((s) => s.id),
  ...readdirSync(sectionsDir).flatMap((f) =>
    [...readFileSync(new URL(f, sectionsDir), "utf8").matchAll(/\sid="([\w-]+)"/g)].map((m) => m[1]),
  ),
]);

const terms = glossary.map((g) => g.term);

describe("glossary", () => {
  it("is sorted in Swedish order without duplicates", () => {
    expect([...terms].sort((a, b) => a.localeCompare(b, "sv"))).toEqual(terms);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("explains the terms that are new in 1.3", () => {
    expect(terms).toEqual(expect.arrayContaining(["Kommunicering", "Id-nummer"]));
  });

  it("separates the person's SID from the case worker's SID permission and links to Uppgiftens liv", () => {
    const sid = glossary.find((g) => g.term === "SID");
    expect(sid?.definition).toMatch(/SID-behörighet/);
    expect(sid?.details?.length).toBeGreaterThan(0);
    expect(sid?.link?.href).toBe("#oul");
  });

  it("links only to anchors that exist in the guide", () => {
    const links = glossary.flatMap((g) => (g.link ? [g.link.href] : []));
    expect(links.length).toBeGreaterThan(0);
    for (const href of links) expect(anchors, href).toContain(href.slice(1));
  });
});
