import { JSONPathEnvironment } from "../../src/path";
import { IRegexpError } from "../../src/path/errors";
import { Match, Search } from "../../src/path/functions";

describe("match filter", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("match", new Match({ cacheSize: 10 }));
    let rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "ab" }]);
    rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ac" }]);
    expect(rv.values()).toStrictEqual([{ a: "ac" }]);
  });
  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("match", new Match({ cacheSize: 0 }));
    const rv = env.query("$[?match(@.a, 'a.*')]", [{ a: "ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "ab" }]);
  });
  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set(
      "match",
      new Match({ cacheSize: 0, throwErrors: true }),
    );
    expect(() => env.query("$[?match(@.a, 'a.*(')]", [{ a: "ab" }])).toThrow(
      IRegexpError,
    );
  });
  test("don't replace dot in character group", () => {
    const env = new JSONPathEnvironment();
    const query = "$[?match(@, 'ab[.c]d')]";
    const data = ["abcd", "ab.d", "abxd"];
    const rv = env.query(query, data);
    expect(rv.values()).toStrictEqual(["abcd", "ab.d"]);
  });
  test("don't replace escaped dots", () => {
    const env = new JSONPathEnvironment();
    const query = "$[?match(@, 'ab\\\\.d')]";
    const data = ["abcd", "ab.d", "abxd"];
    const rv = env.query(query, data);
    expect(rv.values()).toStrictEqual(["ab.d"]);
  });
  test("handle escaped right square bracket in character group", () => {
    const env = new JSONPathEnvironment();
    const query = "$[?match(@, 'ab[\\\\].c]d')]";
    const data = ["abcd", "ab.d", "abxd"];
    const rv = env.query(query, data);
    expect(rv.values()).toStrictEqual(["abcd", "ab.d"]);
  });
  test("explicit start caret", () => {
    const env = new JSONPathEnvironment();
    const query = "$[?match(@, '^ab.*')]";
    const data = ["abcd", "ab.d", "axc"];
    const rv = env.query(query, data);
    expect(rv.values()).toStrictEqual(["abcd", "ab.d"]);
  });
  test("explicit end dollar", () => {
    const env = new JSONPathEnvironment();
    const query = "$[?match(@, '.bc$')]";
    const data = ["abcd", "abc", "axc"];
    const rv = env.query(query, data);
    expect(rv.values()).toStrictEqual(["abc"]);
  });
  // test("handle escaped left square bracket", () => {
  //   const env = new JSONPathEnvironment();
  //   const query = "$[?match(@, 'ab\\\\[.d')]";
  //   const data = ["abcd", "ab.d", "ab[d"];
  //   const rv = env.query(query, data);
  //   expect(rv.values()).toStrictEqual(["ab[d"]);
  // });

  // test("handle escaped backslash before dot", () => {
  //   const env = new JSONPathEnvironment();
  //   const query = "$[?match(@, 'ab\\\\\\\\.d')]";
  //   const data = ["abcd", "ab.d", "ab\\d"];
  //   const rv = env.query(query, data);
  //   expect(rv.values()).toStrictEqual(["ab\\d"]);
  // });
});

describe("search filter", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("search", new Search({ cacheSize: 10 }));
    let rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ab" }]);
    rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ac" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ac" }]);
  });
  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("search", new Search({ cacheSize: 0 }));
    const rv = env.query("$[?search(@.a, 'a.*')]", [{ a: "the end is ab" }]);
    expect(rv.values()).toStrictEqual([{ a: "the end is ab" }]);
  });
  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set(
      "search",
      new Search({ cacheSize: 0, throwErrors: true }),
    );
    expect(() =>
      env.query("$[?search(@.a, 'a.*(')]", [{ a: "the end is ab" }]),
    ).toThrow(IRegexpError);
  });
});
