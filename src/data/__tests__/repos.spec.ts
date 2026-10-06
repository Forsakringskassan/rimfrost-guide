import { describe, expect, it } from "vitest";
import { matchesFilter, repos } from "../repos";

const names = (filter: Parameters<typeof matchesFilter>[1]) =>
  repos.filter((r) => matchesFilter(r, filter)).map((r) => r.name);

describe("repo map filters", () => {
  it("splits Kontrakt into OpenAPI and AsyncAPI without losing or doubling any repo", () => {
    const kontrakt = names("kontrakt");
    const openapi = names("openapi");
    const asyncapi = names("asyncapi");
    expect([...openapi, ...asyncapi].sort()).toEqual([...kontrakt].sort());
    expect(openapi.every((n) => n.endsWith("-openapi"))).toBe(true);
  });

  it("puts vah-regel-rtf-api under AsyncAPI", () => {
    expect(names("asyncapi")).toContain("vah-regel-rtf-api");
  });

  it("leaves templates for contracts out of the contract filters", () => {
    expect(names("openapi")).not.toContain("template-regel-manuell-openapi");
  });
});
