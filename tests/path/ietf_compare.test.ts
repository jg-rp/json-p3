/**
 * Filter expression comparison examples.
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
import { Nothing } from "../../src";
import { compare } from "../../src/path/expression";

const DATA = { obj: { x: "y" }, arr: [2, 3] };

type TestCase = {
  description: string;
  left: JSONValue | typeof Nothing;
  op: string;
  right: JSONValue | typeof Nothing;
  want: boolean;
};

const TEST_CASES: TestCase[] = [
  {
    description: "$.absent1 == $.absent2",
    left: Nothing,
    op: "==",
    right: Nothing,
    want: true,
  },
  {
    description: "$.absent1 <= $.absent2",
    left: Nothing,
    op: "<=",
    right: Nothing,
    want: true,
  },
  {
    description: "$.absent == 'g'",
    left: Nothing,
    op: "==",
    right: "g",
    want: false,
  },
  {
    description: "$.absent1 != $.absent2",
    left: Nothing,
    op: "!=",
    right: Nothing,
    want: false,
  },
  {
    description: "$.absent != 'g'",
    left: Nothing,
    op: "!=",
    right: "g",
    want: true,
  },
  {
    description: "1 <= 2",
    left: 1,
    op: "<=",
    right: 2,
    want: true,
  },
  {
    description: "1 > 2",
    left: 1,
    op: ">",
    right: 2,
    want: false,
  },
  {
    description: "13 == '13'",
    left: 13,
    op: "==",
    right: "13",
    want: false,
  },
  {
    description: "'a' <= 'b'",
    left: "a",
    op: "<=",
    right: "b",
    want: true,
  },
  {
    description: "'a' > 'b'",
    left: "a",
    op: ">",
    right: "b",
    want: false,
  },
  {
    description: "$.obj == $.arr",
    left: DATA["obj"],
    op: "==",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "$.obj != $.arr",
    left: DATA["obj"],
    op: "!=",
    right: DATA["arr"],
    want: true,
  },
  {
    description: "$.obj == $.obj",
    left: DATA["obj"],
    op: "==",
    right: DATA["obj"],
    want: true,
  },
  {
    description: "$.obj != $.obj",
    left: DATA["obj"],
    op: "!=",
    right: DATA["obj"],
    want: false,
  },
  {
    description: "$.arr == $.arr",
    left: DATA["arr"],
    op: "==",
    right: DATA["arr"],
    want: true,
  },
  {
    description: "$.arr != $.arr",
    left: DATA["arr"],
    op: "!=",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "$.arr == 17",
    left: DATA["arr"],
    op: "==",
    right: 17,
    want: false,
  },
  {
    description: "$.arr != 17",
    left: DATA["arr"],
    op: "!=",
    right: 17,
    want: true,
  },
  {
    description: "$.obj <= $.arr",
    left: DATA["obj"],
    op: "<=",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "$.obj < $.arr",
    left: DATA["obj"],
    op: "<",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "$.obj <= $.obj",
    left: DATA["obj"],
    op: "<=",
    right: DATA["obj"],
    want: true,
  },
  {
    description: "$.arr <= $.arr",
    left: DATA["arr"],
    op: "<=",
    right: DATA["arr"],
    want: true,
  },
  {
    description: "1 <= $.arr",
    left: 1,
    op: "<=",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "1 >= $.arr",
    left: 1,
    op: ">=",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "1 > $.arr",
    left: 1,
    op: ">",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "1 < $.arr",
    left: 1,
    op: "<",
    right: DATA["arr"],
    want: false,
  },
  {
    description: "true <= true",
    left: true,
    op: "<=",
    right: true,
    want: true,
  },
  {
    description: "true > true",
    left: true,
    op: ">",
    right: true,
    want: false,
  },
];

describe("IETF comparison examples", () => {
  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ left, op, right, want }: TestCase) => {
      expect(compare(left, op, right)).toStrictEqual(want);
    },
  );
});
