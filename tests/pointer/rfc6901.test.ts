/*
 * Test cases from rfc6901 examples.
 *
 * The test cases defined here are taken from rfc6901. The appropriate Simplified
 * BSD License is included below.
 *
 * Copyright (c) 2013 IETF Trust and the persons identified as authors of the
 * code. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * - Neither the name of Internet Society, IETF or IETF Trust, nor the names of
 *   specific contributors, may be used to endorse or promote products derived
 *   from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import { JSONPointer } from "../../src/pointer";
import { JSONValue } from "../../src/types";

type Case = {
  pointer: string;
  want: JSONValue;
};

const RFC6901_DOCUMENT = {
  foo: ["bar", "baz"],
  "": 0,
  "a/b": 1,
  "c%d": 2,
  "e^f": 3,
  "g|h": 4,
  "i\\j": 5,
  'k"l': 6,
  " ": 7,
  "m~n": 8,
};

const RFC6901_TEST_CASES: Case[] = [
  { pointer: "", want: RFC6901_DOCUMENT },
  { pointer: "/foo", want: ["bar", "baz"] },
  { pointer: "/foo/0", want: "bar" },
  { pointer: "/", want: 0 },
  { pointer: "/a~1b", want: 1 },
  { pointer: "/c%d", want: 2 },
  { pointer: "/e^f", want: 3 },
  { pointer: "/g|h", want: 4 },
  { pointer: "/i\\j", want: 5 },
  { pointer: '/k"l', want: 6 },
  { pointer: "/ ", want: 7 },
  { pointer: "/m~0n", want: 8 },
];

describe("RFC6901", () => {
  test.each<Case>(RFC6901_TEST_CASES)("$pointer", ({ pointer, want }: Case) => {
    const p = new JSONPointer(pointer);
    expect(p.resolve(RFC6901_DOCUMENT)).toStrictEqual(want);
  });
});
