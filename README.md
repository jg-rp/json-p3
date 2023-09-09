<h1 align="center">JSON P3</h1>

<p align="center">
JSONPath, JSON Patch and JSON Pointer for JavaScript.
</p>

---

## Install

TODO: Work in progress.

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

- `value` - The value found in the target JSON value. This could be an array, object or primitive value.
- `location` - An array of property names and array indices that were required to reach the node's value in the target JSON value.
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

TODO: node lists are iterable

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
import { jsonpointer } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

const rv = jsonpointer.resolve("/users/1/age", data);
// JSONPointerKeyError: no such property ("/users/1/age")
```

A fallback value can be given as a third argument, which will be returned in the event of a `JSONPointerResolutionError`.

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

const rv = jsonpointer.resolve("/users/1/age", data, -1);
console.log(rv); // -1
```

TODO: "compile" a pointer for later use

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

Use the JSONPatch class to create a patch for repeated application.

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

TODO: patch builder api
