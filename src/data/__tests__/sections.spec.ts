import { describe, expect, it } from "vitest";
import { sections } from "../sections";

describe("sections", () => {
  it("puts Nytt i 1.3 right after På en minut", () => {
    expect(sections.map((s) => s.id).slice(0, 2)).toEqual(["start", "nytt"]);
  });

  it("has unique anchors", () => {
    const ids = sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
