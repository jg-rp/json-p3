# Quick start

This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See [JSONPath Syntax](./guides/jsonpath-syntax.md) for an introduction to JSONPath syntax.

## JSONPath

Find all values matching a JSONPath query with [`jsonpath.query()`](./api/namespaces/jsonpath.md#query). It takes a string (the query) and some data to apply the query to. It always returns an instance of [`JSONPathNodeList`](./api/classes/jsonpath.JSONPathNodeList.md). Use [`JSONPathNodeList.values()`](./api/classes/jsonpath.JSONPathNodeList.md#values) to get an array of values matching the query.

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

`query()` is re-exported to JSON P3's top-level namespace, so you could do the following instead.

```javascript
import { query } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

const nodes = query("$.users[?@.score < 100].name", data);
console.log(nodes.values()); // [ 'John', 'Sally', 'Jane' ]
```

A [`JSONPathNodeList`](./api/classes/jsonpath.JSONPathNodeList.md) is a list of [`JSONPathNode`](./api/classes/jsonpath.JSONPathNode.md) objects, one for each value in the target document matching the query. Each node has a:

- `value` - The value found in the target JSON document. This could be an array, object or primitive value.
- `location` - An array of property names and array indices that were required to reach the node's value in the target JSON document.
- `path` - The normalized JSONPath to this node in the target JSON document.

### Normalized paths

A normalized path is one that uniquely identifies the node's value within the target document. Use `JSONPathNodeList.paths()` to retrieve all paths from a node list.

```javascript
// .. continued from above
console.log(nodes.paths());
```

```plain title="output"
[
  "$['users']['1']['name']",
  "$['users']['2']['name']",
  "$['users']['3']['name']"
]
```

### Locations

Use `JSONPathNodeList.locations()` to get an array of locations for each node in the list.

```javascript
// .. continued from above
console.log(nodes.locations());
```

```plain title="output"
[
  [ 'users', 1, 'name' ],
  [ 'users', 2, 'name' ],
  [ 'users', 3, 'name' ]
]
```

### Iterating node lists

Node lists are iterable too.

```javascript
// .. continued from above
for (const node of nodes) {
  console.log(`${node.value} @ ${node.path}`);
}
```

```plain title="output"
John @ $['users'][1]['name']
Sally @ $['users'][2]['name']
Jane @ $['users'][3]['name']
```

### Lazy queries

[`lazyQuery()`](./api/namespaces/jsonpath.md#lazyquery) is an alternative to `query()`. `lazyQuery()` can be faster and more memory efficient if querying large datasets, especially when using recursive descent selectors. Conversely, `query()` is usually the better choice when working with small datasets.

`lazyQuery()` returns an iterable sequence of [`JSONPathNode`](./api/classes/jsonpath.JSONPathNode.md) objects which is not a `JSONPathNodeList`.

```javascript
import { lazyQuery } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
    { name: "Jane", score: 55 },
  ],
};

for (const node of lazyQuery("$.users[?@.score < 100].name", data)) {
  console.log(node.value);
}

// John
// Sally
// Jane
```

### Compilation

`query()` is a convenience function equivalent to `new JSONPathEnvironment().compile(path).query(data)`. Use `jsonpath.compile()` to construct a [`JSONPath`](./api/classes/jsonpath.JSONPath.md) object that can be applied to different data repeatedly.

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

`compile()` is also re-exported to JSON P3's top-level namespace.

## JSON Pointer

Resolve a JSON Pointer ([RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)) against some data using `jsonpointer.resolve()`.

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

`resolve()` is a convenience function equivalent to `new JSONPointer(pointer).resolve(data)`. Use the [`JSONPointer`](./api/classes/jsonpointer.JSONPointer.md) constructor when you need to resolve the same pointer repeatedly against different data.

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

### Errors and fallbacks

If the pointer can't be resolved against the argument JSON value, one of [`JSONPointerIndexError`](./api/classes/jsonpointer.JSONPointerIndexError.md), [`JSONPointerKeyError`](./api/classes/jsonpointer.JSONPointerKeyError.md) or [`JSONPointerTypeError`](./api/classes/jsonpointer.JSONPointerTypeError.md) is thrown. All three exceptions inherit from [`JSONPointerResolutionError`](./api/classes/jsonpointer.JSONPointerResolutionError.md).

```javascript
// .. continued from above
const rv = pointer.resolve("/users/1/age", data);
// JSONPointerKeyError: no such property ("/users/1/age")
```

A fallback value can be given as a third argument, which will be returned in the event of a `JSONPointerResolutionError`.

```javascript
// .. continued from above
const rv = pointer.resolve("/users/1/age", data, -1);
console.log(rv); // -1
```

### Relative JSON Pointers

We support [Relative JSON Pointers](https://www.ietf.org/id/draft-hha-relative-json-pointer-00.html) via the [`to(rel)`](./api/classes/jsonpointer.JSONPointer.md#to) method of `JSONPointer`, where `rel` is a relative JSON pointer string, and a new `JSONPointer` is returned.

```javascript
import { JSONPointer } from "json-p3";

const data = { foo: { bar: [1, 2, 3], baz: [4, 5, 6] } };
const pointer = new JSONPointer("/foo/bar/2");

console.log(pointer.resolve(data)); // 3
console.log(pointer.to("0-1").resolve(data)); // 2
console.log(pointer.to("2/baz/2").resolve(data)); // 6
```

## JSON Patch

Apply a JSON Patch ([RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902)) to some data with `jsonpatch.apply()`. **Data is modified in place.**.

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

`apply()` is also re-exported from JSON P3's top-level namespace.

### JSONPatch constructor

`jsonpatch.apply()` is a convenience function equivalent to `new JSONPatch(ops).apply(data)`. Use the [`JSONPatch`](./api/classes/jsonpatch.JSONPatch.md) constructor when you need to apply the same patch to multiple different data structures.

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

### Builder API

`JSONPatch` objects offer a builder interface for constructing JSON patch documents. We use strings as JSON Pointers in this example, but existing `JSONPointer` objects are OK too.

```javascript
import { JSONPatch } from "json-p3";

const data = { some: { other: "thing" } };

const patch = new JSONPatch()
  .add("/some/foo", { foo: [] })
  .add("/some/foo", { bar: [] })
  .copy("/some/other", "/some/foo/else")
  .copy("/some/foo/else", "/some/foo/bar/-");

patch.apply(data);
console.log(JSON.stringify(data, undefined, "  "));
```

```json title="output"
{
  "some": {
    "other": "thing",
    "foo": {
      "bar": ["thing"],
      "else": "thing"
    }
  }
}
```
