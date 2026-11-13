// oxlint-disable-next-line import/extensions
import { JSONPathEnvironment, Match, Search } from "../../src/path";

const cases = [
  {
    expr: "$[?match(@, '^ab.*')]",
    data: ["abc", "axc", "ab", "xab"],
    wantEscapeTrue: [],
    wantEscapeFalse: ["abc", "ab"],
  },
  {
    expr: "$[?match(@, '.*bc$')]",
    data: ["abc", "axc", "ab", "abcx"],
    wantEscapeTrue: [],
    wantEscapeFalse: ["abc"],
  },
  {
    expr: "$[?match(@, '^ab.*')]",
    data: ["abc", "axc", "^ab", "xab"],
    wantEscapeTrue: ["^ab"],
    wantEscapeFalse: ["abc"],
  },
  {
    expr: "$[?match(@, '.*bc$')]",
    data: ["abc", "axc", "ab", "abc$"],
    wantEscapeTrue: ["abc$"],
    wantEscapeFalse: ["abc"],
  },
  {
    expr: "$[?search(@, 'a$')]",
    data: ["abc", "axc", "ab", "a$bc"],
    wantEscapeTrue: ["a$bc"],
    wantEscapeFalse: [],
  },
];

describe("escape anchors", () => {
  const escapeTrueEnv = new JSONPathEnvironment();
  escapeTrueEnv.functions["match"] = new Match({ escapeAnchors: true });
  escapeTrueEnv.functions["search"] = new Search({ escapeAnchors: true });

  const escapeFalseEnv = new JSONPathEnvironment();
  escapeFalseEnv.functions["match"] = new Match({ escapeAnchors: false });
  escapeFalseEnv.functions["search"] = new Search({ escapeAnchors: false });

  test.each(cases)("$expr", ({ expr, data, wantEscapeTrue, wantEscapeFalse }) => {
    expect(escapeTrueEnv.findAll(expr, data)).toStrictEqual(wantEscapeTrue);
    expect(escapeFalseEnv.findAll(expr, data)).toStrictEqual(wantEscapeFalse);
  });
});
