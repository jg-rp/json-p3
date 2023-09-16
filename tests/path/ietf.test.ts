/**
 * Test cases from examples in draft-ietf-jsonpath-base-20.
 *
 * The test cases defined here are taken from version 20 of the JSONPath
 * internet draft, draft-ietf-jsonpath-base-20. In accordance with
 * https://trustee.ietf.org/license-info, Revised BSD License text
 * is included bellow.
 *
 * See https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20
 *
 * Copyright (c) 2023 IETF Trust and the persons identified as authors
 * of the code. All rights reserved.Redistribution and use in source and
 * binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the
 *   distribution.
 * - Neither the name of Internet Society, IETF or IETF Trust, nor the
 *   names of specific contributors, may be used to endorse or promote
 *   products derived from this software without specific prior written
 *   permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { JSONValue } from "../../src/types";
import { query } from "../../src";

type TestCase = {
  description: string;
  path: string;
  data: JSONValue;
  want: JSONValue;
};

const FILTER_SELECTOR_DATA = {
  a: [3, 5, 1, 2, 4, 6, { b: "j" }, { b: "k" }, { b: {} }, { b: "kilo" }],
  o: { p: 1, q: 2, r: 3, s: 5, t: { u: 6 } },
  e: "f",
};

const TEST_CASES: TestCase[] = [
  { description: "root", path: "$", data: { k: "v" }, want: [{ k: "v" }] },
  {
    description: "name selector - named value in nested object (single quote)",
    path: "$.o['j j']",
    data: { o: { "j j": { "k.k": 3 } }, "'": { "@": 2 } },
    want: [{ "k.k": 3 }],
  },
  {
    description: "name selector - Nesting further down (single quote)",
    path: "$.o['j j']['k.k']",
    data: { o: { "j j": { "k.k": 3 } }, "'": { "@": 2 } },
    want: [3],
  },
  {
    description: "name selector - Nesting further down (double quote)",
    path: '$.o["j j"]["k.k"]',
    data: { o: { "j j": { "k.k": 3 } }, "'": { "@": 2 } },
    want: [3],
  },
  {
    description: "name selector - unusual member names",
    path: '$["\'"]["@"]',
    data: { o: { "j j": { "k.k": 3 } }, "'": { "@": 2 } },
    want: [2],
  },
  {
    description: "wildcard selector - object values",
    path: "$[*]",
    data: { o: { j: 1, k: 2 }, a: [5, 3] },
    want: [{ j: 1, k: 2 }, [5, 3]],
  },
  {
    description: "wildcard selector - object values (dot property)",
    path: "$.o[*]",
    data: { o: { j: 1, k: 2 }, a: [5, 3] },
    want: [1, 2],
  },
  {
    description: "wildcard selector - double wild",
    path: "$.o[*, *]",
    data: { o: { j: 1, k: 2 }, a: [5, 3] },
    want: [1, 2, 1, 2],
  },
  {
    description: "wildcard selector - dot property wild",
    path: "$.a[*]",
    data: { o: { j: 1, k: 2 }, a: [5, 3] },
    want: [5, 3],
  },
  {
    description: "index selector - element of array",
    path: "$[1]",
    data: ["a", "b"],
    want: ["b"],
  },
  {
    description: "index selector - element of array, from the end",
    path: "$[-2]",
    data: ["a", "b"],
    want: ["a"],
  },
  {
    description: "array slice selector - slice with default step",
    path: "$[1:3]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["b", "c"],
  },
  {
    description: "array slice selector - slice with no end index",
    path: "$[5:]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["f", "g"],
  },
  {
    description: "array slice selector - slice with step 2",
    path: "$[1:5:2]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["b", "d"],
  },
  {
    description: "array slice selector - slice with negative step",
    path: "$[5:1:-2]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["f", "d"],
  },
  {
    description: "array slice selector - slice in reverse order",
    path: "$[::-1]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["g", "f", "e", "d", "c", "b", "a"],
  },
  {
    description: "filter selector - Member value comparison",
    path: "$.a[?(@.b == 'kilo')]",
    data: FILTER_SELECTOR_DATA,
    want: [{ b: "kilo" }],
  },
  {
    description: "filter selector - Array value comparison",
    path: "$.a[?(@>3.5)]",
    data: FILTER_SELECTOR_DATA,
    want: [5, 4, 6],
  },
  {
    description: "filter selector - Array value existence",
    path: "$.a[?(@.b)]",
    data: FILTER_SELECTOR_DATA,
    want: [{ b: "j" }, { b: "k" }, { b: {} }, { b: "kilo" }],
  },
  {
    description: "filter selector - Existence of non-singular queries",
    path: "$[?(@.*)]",
    data: FILTER_SELECTOR_DATA,
    want: [
      [3, 5, 1, 2, 4, 6, { b: "j" }, { b: "k" }, { b: {} }, { b: "kilo" }],
      { p: 1, q: 2, r: 3, s: 5, t: { u: 6 } },
    ],
  },
  {
    description: "filter selector - Nested filters",
    path: "$[?(@[?(@.b)])]",
    data: FILTER_SELECTOR_DATA,
    want: [
      [3, 5, 1, 2, 4, 6, { b: "j" }, { b: "k" }, { b: {} }, { b: "kilo" }],
    ],
  },
  {
    description: "filter selector - Array value logical OR",
    path: '$.a[?(@<2 || @.b == "k")]',
    data: FILTER_SELECTOR_DATA,
    want: [1, { b: "k" }],
  },
  {
    description: "filter selector - Array value regular expression match",
    path: '$.a[?match(@.b, "[jk]")]',
    data: FILTER_SELECTOR_DATA,
    want: [{ b: "j" }, { b: "k" }],
  },
  {
    description: "filter selector - Array value regular expression search",
    path: '$.a[?search(@.b, "[jk]")]',
    data: FILTER_SELECTOR_DATA,
    want: [{ b: "j" }, { b: "k" }, { b: "kilo" }],
  },
  {
    description: "filter selector - Object value logical AND",
    path: "$.o[?(@>1 && @<4)]",
    data: FILTER_SELECTOR_DATA,
    want: [2, 3],
  },
  {
    description: "filter selector - Object value logical OR",
    path: "$.o[?(@.u || @.x)]",
    data: FILTER_SELECTOR_DATA,
    want: [{ u: 6 }],
  },
  {
    description: "filter selector - Comparison of queries with no values",
    path: "$.a[?(@.b == $.x)]",
    data: FILTER_SELECTOR_DATA,
    want: [3, 5, 1, 2, 4, 6],
  },
  {
    description:
      "filter selector - Comparisons of primitive and of structured values",
    path: "$.a[?(@ == @)]",
    data: FILTER_SELECTOR_DATA,
    want: [3, 5, 1, 2, 4, 6, { b: "j" }, { b: "k" }, { b: {} }, { b: "kilo" }],
  },
  {
    description: "child segment - Indices",
    path: "$[0, 3]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["a", "d"],
  },
  {
    description: "child segment - Slice and index",
    path: "$[0:2, 5]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["a", "b", "f"],
  },
  {
    description: "child segment - Duplicated entries",
    path: "$[0, 0]",
    data: ["a", "b", "c", "d", "e", "f", "g"],
    want: ["a", "a"],
  },
  {
    description: "descendant segment - Object values",
    path: "$..j",
    data: { o: { j: 1, k: 2 }, a: [5, 3, [{ j: 4 }, { k: 6 }]] },
    want: [1, 4],
  },
  {
    description: "descendant segment - Array values",
    path: "$..[0]",
    data: { o: { j: 1, k: 2 }, a: [5, 3, [{ j: 4 }, { k: 6 }]] },
    want: [5, { j: 4 }],
  },
  {
    description: "descendant segment - All values",
    path: "$..[*]",
    data: { o: { j: 1, k: 2 }, a: [5, 3, [{ j: 4 }, { k: 6 }]] },
    want: [
      { j: 1, k: 2 },
      [5, 3, [{ j: 4 }, { k: 6 }]],
      1,
      2,
      5,
      3,
      [{ j: 4 }, { k: 6 }],
      { j: 4 },
      { k: 6 },
      4,
      6,
    ],
  },
  {
    description: "descendant segment - Input value is visited",
    path: "$..o",
    data: { o: { j: 1, k: 2 }, a: [5, 3, [{ j: 4 }, { k: 6 }]] },
    want: [{ j: 1, k: 2 }],
  },
  {
    description: "descendant segment - Multiple segments",
    path: "$.a..[0, 1]",
    data: { o: { j: 1, k: 2 }, a: [5, 3, [{ j: 4 }, { k: 6 }]] },
    want: [5, 3, { j: 4 }, { k: 6 }],
  },
  {
    description: "null semantics - Object value",
    path: "$.a",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [null],
  },
  {
    description: "null semantics - null used as array",
    path: "$.a[0]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [],
  },
  {
    description: "null semantics - null used as object",
    path: "$.a.d",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [],
  },
  {
    description: "null semantics - Array value",
    path: "$.b[0]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [null],
  },
  {
    description: "null semantics - Array value wild",
    path: "$.b[*]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [null],
  },
  {
    description: "null semantics - Existence",
    path: "$.b[?(@)]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [null],
  },
  {
    description: "null semantics - Comparison",
    path: "$.b[?(@==null)]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [null],
  },
  {
    description: "null semantics - Comparison with 'missing' value",
    path: "$.c[?(@.d==null)]",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [],
  },
  {
    description:
      "null semantics - Not JSON null at all, just a member name string",
    path: "$.null",
    data: { a: null, b: [null], c: [{}], null: 1 },
    want: [1],
  },
  {
    description: "filter, length function, string data",
    path: "$[?(length(@.a)>=2)]",
    data: [{ a: "ab" }, { a: "d" }],
    want: [{ a: "ab" }],
  },
  {
    description: "filter, length function, array data",
    path: "$[?(length(@.a)>=2)]",
    data: [{ a: [1, 2, 3] }, { a: [1] }],
    want: [{ a: [1, 2, 3] }],
  },
  {
    description: "filter, length function, missing data",
    path: "$[?(length(@.a)>=2)]",
    data: [{ d: "f" }],
    want: [],
  },
  {
    description: "filter, count function",
    path: "$[?(count(@..*)>2)]",
    data: [{ a: [1, 2, 3] }, { a: [1], d: "f" }, { a: 1, d: "f" }],
    want: [{ a: [1, 2, 3] }, { a: [1], d: "f" }],
  },
];

describe("IETF examples", () => {
  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ path, data, want }: TestCase) => {
      expect(query(path, data).values()).toStrictEqual(want);
    },
  );
});
