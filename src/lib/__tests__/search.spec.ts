import { describe, expect, it } from "vitest";
import { fold, highlight, score, tokenize } from "../search";

const join = (segs: { text: string; hit: boolean }[]) =>
  segs.map((s) => (s.hit ? `[${s.text}]` : s.text)).join("");

describe("fold", () => {
  it("strips Swedish diacritics and keeps the length", () => {
    expect(fold("Handläggning ÅÄÖ")).toBe("handlaggning aao");
    expect(fold("Handläggning").length).toBe("Handläggning".length);
  });
});

describe("tokenize", () => {
  it("splits on whitespace and folds", () => {
    expect(tokenize("  Skyddad   IDENTITET ")).toEqual(["skyddad", "identitet"]);
  });
});

describe("score", () => {
  it("requires every word to match", () => {
    expect(score("Team", "Handläggargrupp", ["team", "sid"])).toBeNull();
  });
  it("ranks title start above title and text matches", () => {
    const start = score("SID", "", ["sid"])!;
    const inside = score("Skyddad SID", "", ["sid"])!;
    const text = score("Behörighet", "SID-behörighet", ["sid"])!;
    expect(start).toBeGreaterThan(inside);
    expect(inside).toBeGreaterThan(text);
  });
  it("matches without diacritics", () => {
    expect(score("Handläggning", "", ["handlaggning"])).not.toBeNull();
  });
});

describe("highlight", () => {
  it("marks every occurrence of every word, on the original text", () => {
    expect(join(highlight("Hämta nästa uppgift", ["hamta", "uppgift"]))).toBe("[Hämta] nästa [uppgift]");
  });
  it("cuts a window around the first hit with ellipses", () => {
    const long = "a".repeat(100) + " beslut " + "b".repeat(100);
    const out = join(highlight(long, ["beslut"], 60));
    expect(out.startsWith("… ")).toBe(true);
    expect(out.endsWith(" …")).toBe(true);
    expect(out).toContain("[beslut]");
  });
  it("returns the whole text when it fits", () => {
    expect(join(highlight("kort", ["x"], 60))).toBe("kort");
  });
});
