/** Test cases derived from https://github.com/glyn/jsonpath-nondeterminism.
 *
 * The test cases in this file are taken from glyn/jsonpath-nondeterminism and
 * its accompanying blog post, https://underlap.org/testing-non-determinism. The
 * license for which is included below.
 *
 * BSD 3-Clause License
 *
 * Copyright (c) 2024, Glyn Normington
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { JSONPathEnvironment } from "../../src";
import { JSONValue } from "../../src/types";

type TestCase = {
  description: string;
  query: string;
  data: JSONValue;
  want: JSONValue[][];
};

const TEST_CASES: TestCase[] = [
  {
    description: "interesting example",
    query: "$..[*]",
    data: [[[1]], [2]],
    want: [
      [[[1]], [2], [1], 1, 2],
      [[[1]], [2], [1], 2, 1],
    ],
  },
  {
    description: "explosive example",
    query: "$..[*]",
    data: { a: [5, 3, [{ j: 4 }, { k: 6 }]], o: { j: 1, k: 2 } },
    want: [
      [
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
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        2,
        1,
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        1,
        2,
        4,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        2,
        1,
        4,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        1,
        2,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        2,
        1,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
        1,
        2,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
        2,
        1,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        1,
        2,
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
      [
        { j: 1, k: 2 },
        [5, 3, [{ j: 4 }, { k: 6 }]],
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        2,
        1,
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
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
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        2,
        1,
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        1,
        2,
        4,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        2,
        1,
        4,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        1,
        2,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        2,
        1,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
        1,
        2,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        { j: 4 },
        { k: 6 },
        4,
        6,
        2,
        1,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        1,
        2,
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
      [
        [5, 3, [{ j: 4 }, { k: 6 }]],
        { j: 1, k: 2 },
        5,
        3,
        [{ j: 4 }, { k: 6 }],
        2,
        1,
        { j: 4 },
        { k: 6 },
        4,
        6,
      ],
    ],
  },
  {
    description: "appendix example 1",
    query: "$[*]",
    data: { j: 1, k: 2 },
    want: [
      [1, 2],
      [2, 1],
    ],
  },
  {
    description: "appendix example 2",
    query: "$[*, *]",
    data: { j: 1, k: 2 },
    want: [
      [1, 2, 1, 2],
      [1, 2, 2, 1],
      [2, 1, 1, 2],
      [2, 1, 2, 1],
    ],
  },
  {
    description: "appendix example 3",
    query: "$[*][*]",
    data: { x: { a: 1, b: 2 }, y: { c: 3, d: 4 } },
    want: [
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [2, 1, 3, 4],
      [2, 1, 4, 3],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
      [4, 3, 1, 2],
      [4, 3, 2, 1],
    ],
  },
  {
    description: "appendix example 4",
    query: "$[*][*]",
    data: { x: { a: 1, b: 2 }, y: [3, 4] },
    want: [
      [1, 2, 3, 4],
      [2, 1, 3, 4],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
    ],
  },
  {
    description: "appendix example 5",
    query: "$..[*]",
    data: { x: 1, y: 2 },
    want: [
      [1, 2],
      [2, 1],
    ],
  },
  {
    description: "appendix example 6",
    query: "$..[*]",
    data: { x: [1], y: [2] },
    want: [
      [[1], [2], 1, 2],
      [[1], [2], 2, 1],
      [[2], [1], 1, 2],
      [[2], [1], 2, 1],
    ],
  },
  {
    description: "appendix example 7",
    query: "$..[*]",
    data: { x: { a: 1 }, y: [3] },
    want: [
      [{ a: 1 }, [3], 1, 3],
      [{ a: 1 }, [3], 3, 1],
      [[3], { a: 1 }, 1, 3],
      [[3], { a: 1 }, 3, 1],
    ],
  },
  {
    description: "appendix example 8",
    query: "$..[*]",
    data: { x: { a: 1 }, y: { c: 3 } },
    want: [
      [{ a: 1 }, { c: 3 }, 1, 3],
      [{ a: 1 }, { c: 3 }, 3, 1],
      [{ c: 3 }, { a: 1 }, 1, 3],
      [{ c: 3 }, { a: 1 }, 3, 1],
    ],
  },
];

describe("nondeterministic examples", () => {
  const nondeterministicEnv = new JSONPathEnvironment({
    nondeterministic: true,
  });

  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ query, data, want }: TestCase) => {
      const perms: Set<string> = new Set();

      for (let i = 0; i < 1000; i++) {
        perms.add(
          JSON.stringify(nondeterministicEnv.query(query, data).values()),
        );
      }

      // expect(perms.size).toBe(want.length);
      expect(perms).toStrictEqual(
        new Set(want.map((rv) => JSON.stringify(rv))),
      );
    },
  );
});
