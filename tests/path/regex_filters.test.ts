import { JSONPathEnvironment } from "../../src/path";
import { Match, Search } from "../../src/path/functions";

describe("match filter", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set("match", new Match({ cacheSize: 10 }));
    let rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "ab" }]);
    rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ac" }]);
    expect(rv.values()).toStrictEqual([{ a: "ac" }]);
  });
  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set("match", new Match({ cacheSize: 0 }));
    const rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "ab" }]);
  });
  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set(
      "match",
      new Match({ cacheSize: 0, throwErrors: true }),
    );
    expect(() => env.query("$[?match(@.a, 'a.*(')]", [{ a: "ab" }])).toThrow(
      SyntaxError,
    );
  });
});

describe("search filter", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set("search", new Search({ cacheSize: 10 }));
    let rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ab" }]);
    rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ac" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ac" }]);
  });
  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set("search", new Search({ cacheSize: 0 }));
    const rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ab" }]);
  });
  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();
    env.filterRegister.set(
      "search",
      new Search({ cacheSize: 0, throwErrors: true }),
    );
    expect(() =>
      env.query("$[?search(@.a, 'a.*(')]", [{ a: "the end is ab" }]),
    ).toThrow(SyntaxError);
  });
});
