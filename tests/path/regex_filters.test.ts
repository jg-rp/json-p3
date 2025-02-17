import { JSONPathEnvironment } from "../../src/path";
import { IRegexpError } from "../../src/path/errors";
import { Has, Match, Search } from "../../src/path/functions";

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

describe("has filter, search semantics", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: true, cacheSize: 10 }));

    let rv = env.query("$[?has(@, 'a.*')]", [
      { "the end is ab": 1 },
      { "the end is bb": 2 },
    ]);
    expect(rv.values()).toStrictEqual([{ "the end is ab": 1 }]);

    rv = env.query("$[?has(@, 'a.*')]", [
      { "the end is bb": 2 },
      { "the end is ac": 1 },
    ]);
    expect(rv.values()).toStrictEqual([{ "the end is ac": 1 }]);
  });

  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: true, cacheSize: 0 }));

    let rv = env.query("$[?has(@, 'a.*')]", [
      { "the end is ab": 1 },
      { "the end is bb": 2 },
    ]);
    expect(rv.values()).toStrictEqual([{ "the end is ab": 1 }]);

    rv = env.query("$[?has(@, 'a.*')]", [
      { "the end is bb": 2 },
      { "the end is ac": 1 },
    ]);
    expect(rv.values()).toStrictEqual([{ "the end is ac": 1 }]);
  });

  test("object data", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: true }));

    const rv = env.query("$.obj[?has(@, 'a.*')]", {
      obj: {
        a: { "the end is ab": 1 },
        b: { "the end is bb": 2 },
      },
    });

    expect(rv.values()).toStrictEqual([{ "the end is ab": 1 }]);
  });

  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();

    env.functionRegister.set(
      "has",
      new Has({ cacheSize: 0, throwErrors: true, search: true }),
    );

    expect(() =>
      env.query("$[?has(@, 'a.*(')]", [{ a: "the end is ab" }]),
    ).toThrow(IRegexpError);
  });
});

describe("has filter, match semantics", () => {
  test("with caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: false, cacheSize: 10 }));

    let rv = env.query("$[?has(@, 'a.*')]", [
      { ab: 1 },
      { "the end is ab": 2 },
    ]);
    expect(rv.values()).toStrictEqual([{ ab: 1 }]);

    rv = env.query("$[?has(@, 'a.*')]", [{ ac: 1 }, { "the end is ac": 2 }]);
    expect(rv.values()).toStrictEqual([{ ac: 1 }]);
  });

  test("without caching", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: false, cacheSize: 0 }));

    let rv = env.query("$[?has(@, 'a.*')]", [
      { ab: 1 },
      { "the end is ab": 2 },
    ]);
    expect(rv.values()).toStrictEqual([{ ab: 1 }]);

    rv = env.query("$[?has(@, 'a.*')]", [{ ac: 1 }, { "the end is ac": 2 }]);
    expect(rv.values()).toStrictEqual([{ ac: 1 }]);
  });

  test("object data", () => {
    const env = new JSONPathEnvironment();
    env.functionRegister.set("has", new Has({ search: false }));

    const rv = env.query("$.obj[?has(@, 'a.*')]", {
      obj: {
        a: { "the end is ab": 1 },
        b: { ab: 2 },
      },
    });

    expect(rv.values()).toStrictEqual([{ ab: 2 }]);
  });

  test("throw error without caching", () => {
    const env = new JSONPathEnvironment();

    env.functionRegister.set(
      "has",
      new Has({ cacheSize: 0, throwErrors: true, search: false }),
    );

    expect(() =>
      env.query("$[?has(@, 'a.*(')]", [{ a: "the end is ab" }]),
    ).toThrow(IRegexpError);
  });
});
