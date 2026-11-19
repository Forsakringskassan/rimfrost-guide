import { describe, expect, it } from "vitest";
import { glossary } from "../glossary";

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
});
