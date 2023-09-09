/**
 * Test cases from rfc6902 examples.
 *
 * Most of the test cases defined here are taken from rfc6902. The appropriate
 * Simplified BSD License is included below.
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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS”
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

import { JSONValue } from "../../src/types";
import { JSONPatch, OpObject, apply } from "../../src/patch";

type Case = {
  description: string;
  data: JSONValue;
  patch: JSONPatch;
  op: OpObject;
  want: JSONValue;
};

const TEST_CASES: Case[] = [
  {
    description: "add an object member",
    data: { foo: "bar" },
    patch: new JSONPatch().add("/baz", "qux"),
    op: { op: "add", path: "/baz", value: "qux" },
    want: { foo: "bar", baz: "qux" },
  },
  {
    description: "add an array element",
    data: { foo: ["bar", "baz"] },
    patch: new JSONPatch().add("/foo/1", "qux"),
    op: { op: "add", path: "/foo/1", value: "qux" },
    want: { foo: ["bar", "qux", "baz"] },
  },
  {
    description: "append to an array",
    data: { foo: ["bar", "baz"] },
    patch: new JSONPatch().add("/foo/-", "qux"),
    op: { op: "add", path: "/foo/-", value: "qux" },
    want: { foo: ["bar", "baz", "qux"] },
  },
  {
    description: "add to the root",
    data: { foo: "bar" },
    patch: new JSONPatch().add("", { some: "thing" }),
    op: { op: "add", path: "", value: { some: "thing" } },
    want: { some: "thing" },
  },
  {
    description: "remove an object member",
    data: { baz: "qux", foo: "bar" },
    patch: new JSONPatch().remove("/baz"),
    op: { op: "remove", path: "/baz" },
    want: { foo: "bar" },
  },
  {
    description: "remove an array element",
    data: { foo: ["bar", "qux", "baz"] },
    patch: new JSONPatch().remove("/foo/1"),
    op: { op: "remove", path: "/foo/1" },
    want: { foo: ["bar", "baz"] },
  },
  {
    description: "replace an object member",
    data: { baz: "qux", foo: "bar" },
    patch: new JSONPatch().replace("/baz", "boo"),
    op: { op: "replace", path: "/baz", value: "boo" },
    want: { baz: "boo", foo: "bar" },
  },
  {
    description: "replace an array element",
    data: { foo: [1, 2, 3] },
    patch: new JSONPatch().replace("/foo/0", 9),
    op: { op: "replace", path: "/foo/0", value: 9 },
    want: { foo: [9, 2, 3] },
  },
  {
    description: "move a value",
    data: { foo: { bar: "baz", waldo: "fred" }, qux: { corge: "grault" } },
    patch: new JSONPatch().move("/foo/waldo", "/qux/thud"),
    op: { op: "move", from: "/foo/waldo", path: "/qux/thud" },
    want: { foo: { bar: "baz" }, qux: { corge: "grault", thud: "fred" } },
  },
  {
    description: "move an array element",
    data: { foo: ["all", "grass", "cows", "eat"] },
    patch: new JSONPatch().move("/foo/1", "/foo/3"),
    op: { op: "move", from: "/foo/1", path: "/foo/3" },
    want: { foo: ["all", "cows", "eat", "grass"] },
  },
  {
    description: "copy a value",
    data: { foo: { bar: "baz", waldo: "fred" }, qux: { corge: "grault" } },
    patch: new JSONPatch().copy("/foo/waldo", "/qux/thud"),
    op: { op: "copy", from: "/foo/waldo", path: "/qux/thud" },
    want: {
      foo: { bar: "baz", waldo: "fred" },
      qux: { corge: "grault", thud: "fred" },
    },
  },
  {
    description: "copy an array element",
    data: { foo: ["all", "grass", "cows", "eat"] },
    patch: new JSONPatch().copy("/foo/1", "/foo/3"),
    op: { op: "copy", path: "/foo/3", from: "/foo/1" },
    want: { foo: ["all", "grass", "cows", "grass", "eat"] },
  },
  {
    description: "test a value",
    data: { baz: "qux", foo: ["a", 2, "c"] },
    patch: new JSONPatch().test("/baz", "qux").test("/foo/1", 2),
    op: { op: "test", path: "/baz", value: "qux" },
    want: { baz: "qux", foo: ["a", 2, "c"] },
  },
  {
    description: "add a nested member object",
    data: { foo: "bar" },
    patch: new JSONPatch().add("/child", { grandchild: {} }),
    op: { op: "add", path: "/child", value: { grandchild: {} } },
    want: { foo: "bar", child: { grandchild: {} } },
  },
  {
    description: "add an array value",
    data: { foo: ["bar"] },
    patch: new JSONPatch().add("/foo/-", ["abc", "def"]),
    op: { op: "add", path: "/foo/-", value: ["abc", "def"] },
    want: { foo: ["bar", ["abc", "def"]] },
  },
];

function deepCopy(value: JSONValue): JSONValue {
  return JSON.parse(JSON.stringify(value));
}

describe("RFC6902", () => {
  test.each<Case>(TEST_CASES)("$description", ({ data, patch, want }: Case) => {
    expect(patch.apply(deepCopy(data))).toStrictEqual(want);
  });
});

describe("JSONPatch constructor", () => {
  test.each<Case>(TEST_CASES)("$description", ({ data, op, want }: Case) => {
    expect(new JSONPatch([op]).apply(deepCopy(data))).toStrictEqual(want);
  });
});

describe("convenience function", () => {
  test.each<Case>(TEST_CASES)("$description", ({ data, op, want }: Case) => {
    expect(apply([op], deepCopy(data))).toStrictEqual(want);
  });
});
