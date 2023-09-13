/**
 * Test cases from draft-hha-relative-json-pointer-00.
 *
 * The test cases defined here are taken from draft-hha-relative-json-pointer-00.
 * The appropriate Revised BSD License is included below.
 *
 * Copyright (c) 2023 IETF Trust and the persons identified as authors of the
 * code. All rights reserved.Redistribution and use in source and binary forms,
 * with or without modification, are permitted provided that the following
 * conditions are met:
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
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { JSONPointer, RelativeJSONPointer } from "../../src/pointer";
import { JSONValue } from "../../src/types";

type TestCase = {
  pointer: string;
  rel: string;
  want: JSONValue;
};

const DOCUMENT = {
  foo: ["bar", "baz", "biz"],
  highly: { nested: { objects: true } },
};

const TEST_CASES: TestCase[] = [
  { pointer: "/foo/1", rel: "0", want: "baz" },
  { pointer: "/foo/1", rel: "1/0", want: "bar" },
  { pointer: "/foo/1", rel: "0-1", want: "bar" },
  { pointer: "/foo/1", rel: "2/highly/nested/objects", want: true },
  { pointer: "/foo/1", rel: "0#", want: 1 },
  { pointer: "/foo/1", rel: "0+1#", want: 2 },
  { pointer: "/foo/1", rel: "1#", want: "foo" },
  { pointer: "/highly/nested", rel: "0/objects", want: true },
  { pointer: "/highly/nested", rel: "1/nested/objects", want: true },
  { pointer: "/highly/nested", rel: "2/foo/0", want: "bar" },
  { pointer: "/highly/nested", rel: "0#", want: "nested" },
  { pointer: "/highly/nested", rel: "1#", want: "highly" },
];

describe("IETF examples", () => {
  test.each<TestCase>(TEST_CASES)(
    "$pointer -> $rel",
    ({ pointer, rel, want }: TestCase) => {
      const p = new JSONPointer(pointer);
      const r = new RelativeJSONPointer(rel);
      const newPointer = r.to(p);
      expect(newPointer.resolve(DOCUMENT)).toStrictEqual(want);
      expect(p.to(rel).toString()).toBe(newPointer.toString());
      expect(r.toString()).toBe(rel);
    },
  );
});
