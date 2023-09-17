/**
 * Function well-typedness tests from IETF spec examples.
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

import {
  FilterFunction,
  FunctionExpressionType,
  JSONPathEnvironment,
  JSONPathTypeError,
} from "../../src";

type TestCase = {
  description: string;
  path: string;
  valid: boolean;
};

const TEST_CASES: TestCase[] = [
  {
    description: "length, singular query, compared",
    path: "$[?length(@) < 3]",
    valid: true,
  },
  {
    description: "length, non-singular query, compared",
    path: "$[?length(@.*) < 3]",
    valid: false,
  },
  {
    description: "count, non-singular query, compared",
    path: "$[?count(@.*) == 1]",
    valid: true,
  },
  {
    description: "count, int literal, compared",
    path: "$[?count(1) == 1]",
    valid: false,
  },
  {
    description: "nested function, LogicalType -> NodesType",
    path: "$[?count(foo(@.*)) == 1]",
    valid: true,
  },
  {
    description: "match, singular query, string literal",
    path: "$[?match(@.timezone, 'Europe/.*')]",
    valid: true,
  },
  {
    description: "match, singular query, string literal, compared",
    path: "$[?match(@.timezone, 'Europe/.*') == true]",
    valid: false,
  },
  {
    description: "value, comparison",
    path: "$[?value(@..color) == 'red']",
    valid: true,
  },
  {
    description: "value, existence",
    path: "$[?value(@..color)]",
    valid: false,
  },
  {
    description: "function, logical return type, existence",
    path: "$[?bar(@.a)]",
    valid: true,
  },
];

class MockFooFunction implements FilterFunction {
  argTypes = [FunctionExpressionType.NodesType];
  returnType = FunctionExpressionType.NodesType;

  call(nodes: NodeList): NodeList {
    return nodes;
  }
}

class MockBarFunction implements FilterFunction {
  argTypes = [FunctionExpressionType.NodesType];
  returnType = FunctionExpressionType.LogicalType;

  call(): boolean {
    return false;
  }
}

describe("IETF function well-typedness examples", () => {
  const env = new JSONPathEnvironment();
  env.functionRegister.set("foo", new MockFooFunction());
  env.functionRegister.set("bar", new MockBarFunction());
  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ path, valid }: TestCase) => {
      if (!valid) {
        expect(() => env.compile(path)).toThrow(JSONPathTypeError);
      } else {
        env.compile(path);
      }
    },
  );
});
