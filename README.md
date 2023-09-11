<h1 align="center">JSON P3</h1>

<p align="center">
JSONPath, JSON Patch and JSON Pointer for JavaScript.
</p>

<p align="center">
  <a href="https://github.com/jg-rp/json-p3/blob/main/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/npm/l/json-p3?style=flat-square">
  </a>
  <a href="https://github.com/jg-rp/json-p3/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/jg-rp/json-p3/tests.yaml?branch=main&label=tests&style=flat-square" alt="Tests">
  </a>
  <a href="https://www.npmjs.com/package/json-p3">
    <img alt="NPM" src="https://img.shields.io/npm/v/json-p3?style=flat-square">
  </a>
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/json-p3">
</p>

---

## Install

### Node.js

Use npm:

```console
npm install --save json-p3
```

Or yarn:

```console
yarn add json-p3
```

Or pnpm:

```console
pnpm add json-p3
```

And use ES module imports:

```javascript
import { query } from "json-p3";

const data = {
  players: [{ name: "Sue" }, { name: "John" }, { name: "Sally" }],
  visitors: [{ name: "Brian" }, { name: "Roy" }],
};

const nodes = query("$..name", data);
console.log(nodes.values());
// [ 'Sue', 'John', 'Sally', 'Brian', 'Roy' ]
```

Or CommonJS modules:

```javascript
const { query } = require("json-p3");

const data = {
  players: [{ name: "Sue" }, { name: "John" }, { name: "Sally" }],
  visitors: [{ name: "Brian" }, { name: "Roy" }],
};

const nodes = query("$..name", data);
console.log(nodes.values());
// [ 'Sue', 'John', 'Sally', 'Brian', 'Roy' ]
```

### Browser

TODO:

## JSONPath

Retrieve values from JSON-like data using JSONPath query expressions. We strictly follow standards described in the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20).

```javascript
import { jsonpath } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

const nodes = jsonpath.query("$.users[?@.score < 100].name", data);
console.log(nodes.values()); // [ 'John', 'Sally', 'Jane' ]
```

The result of `jsonpath.query()` is an instance of `JSONPathNodeList`. That is a list of `JSONPathNode` objects, one node for each value in the target JSON document matching the query. Each node has a:

- `value` - The value found in the target JSON document. This could be an array, object or primitive value.
- `location` - An array of property names and array indices that were required to reach the node's value in the target JSON document.
- `path` - The normalized JSONPath to this node in the target JSON document.

Use `JSONPathNodeList.paths()` to retrieve all node paths.

```javascript
// .. continued from above
console.log(nodes.paths());
```

**Output:**

```plain
[
  "$['users']['1']['name']",
  "$['users']['2']['name']",
  "$['users']['3']['name']"
]
```

And `JSONPathNodeList.locations()` to get an array of node locations.

```javascript
// .. continued from above
console.log(nodes.locations());
```

**Output:**

```plain
[
  [ 'users', 1, 'name' ],
  [ 'users', 2, 'name' ],
  [ 'users', 3, 'name' ]
]
```

`JSONPathNodeList` objects are iterable too.

```javascript
// .. continued from above
for (const node of nodes) {
  console.log(`${node.value} @ ${node.path}`);
}
```

**Output:**

```plain
John @ $['users'][1]['name']
Sally @ $['users'][2]['name']
Jane @ $['users'][3]['name']
```

You can also compile a JSONPath query for repeated use against different data.

```javascript
import { jsonpath } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

const path = jsonpath.compile("$.users[?@.score < 100].name");
const nodes = path.query(data);
console.log(nodes.values()); // [ 'John', 'Sally', 'Jane' ]
```

## JSON Pointer

Identify a single value in JSON-like data, as per RFC 6901. Use `jsonpointer.resolve()` to retrieve the value.

```javascript
import { jsonpointer } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

const rv = jsonpointer.resolve("/users/1", data);
console.log(rv); // { name: 'John', score: 86 }
```

If the pointer can't be resolved against the argument JSON value, one of `JSONPointerIndexError`, `JSONPointerKeyError` or `JSONPointerTypeError` is thrown. All three exceptions inherit from `JSONPointerResolutionError`.

```javascript
// .. continued from above
const rv = jsonpointer.resolve("/users/1/age", data);
// JSONPointerKeyError: no such property ("/users/1/age")
```

A fallback value can be given as a third argument, which will be returned in the event of a `JSONPointerResolutionError`.

```javascript
// .. continued from above
const rv = jsonpointer.resolve("/users/1/age", data, -1);
console.log(rv); // -1
```

You can create an instance of `JSONPointer` then resolve it against different data.

```javascript
import { JSONPointer } from "json-p3";

const someData = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
  ],
};

const otherData = {
  users: [{ name: "Brian" }, { name: "Roy" }],
};

const pointer = new JSONPointer("/users/1");
console.log(pointer.resolve(someData)); // { name: 'John', score: 86 }
console.log(pointer.resolve(otherData)); // { name: 'Roy' }
```

## JSON Patch

Apply a JSON Patch ([RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902)) to some data. A JSON Patch defines update operation to perform on a JSON document. **Data is modified in place.**.

```javascript
import { jsonpatch } from "json-p3";

const ops = [
  { op: "add", path: "/some/foo", value: { foo: {} } },
  { op: "add", path: "/some/foo", value: { bar: [] } },
  { op: "copy", from: "/some/other", path: "/some/foo/else" },
  { op: "add", path: "/some/foo/bar/-", value: 1 },
];

const data = { some: { other: "thing" } };
jsonpatch.apply(ops, data);
console.log(data);
// { some: { other: 'thing', foo: { bar: [Array], else: 'thing' } } }
```

Use the `JSONPatch` class to create a patch for repeated application.

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch([
  { op: "add", path: "/some/foo", value: { foo: {} } },
  { op: "add", path: "/some/foo", value: { bar: [] } },
  { op: "copy", from: "/some/other", path: "/some/foo/else" },
  { op: "add", path: "/some/foo/bar/-", value: 1 },
]);

const data = { some: { other: "thing" } };
patch.apply(data);
console.log(data);
// { some: { other: 'thing', foo: { bar: [Array], else: 'thing' } } }
```

`JSONPatch` also offers a builder API for constructing JSON patch documents. We use strings as JSON Pointers in this example, but existing `JSONPointer` objects are OK too.

```javascript
import { JSONPatch } from "json-p3";

const data = { some: { other: "thing" } };

const patch = new JSONPatch()
  .add("/some/foo", { foo: [] })
  .add("/some/foo", { bar: [] })
  .copy("/some/other", "/some/foo/else")
  .add("/some/foo/bar/-", "/some/foo/else");

patch.apply(data);
console.log(JSON.stringify(data, undefined, "  "));
```

**Output:**

```json
{
  "some": {
    "other": "thing",
    "foo": {
      "bar": ["/some/foo/else"],
      "else": "thing"
    }
  }
}
```
