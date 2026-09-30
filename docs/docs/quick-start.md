# Quick start

This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See [JSONPath Syntax](./guides/jsonpath-syntax.md) for an introduction to JSONPath syntax.

## JSONPath

Find _nodes_ matching a JSONPath query expression with [`jsonpath.find(expr, data)`](./api/globals.md#find).

The first argument must be a string conforming to [RFC 9535](https://datatracker.ietf.org/doc/html/rfc9535). The second argument should be JSON-like data, as you'd get from `JSON.parse()`.

`find` always returns an array of [`JSONPathNode`](./api/classes/JSONPathNode.md) instances.

```javascript
import { jsonpath } from "json-p3";

const expr = "$.users[?@.status == 'pending'].name";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const nodes = jsonpath.find(expr, data);

console.log(nodes.map((n) => n.value)); // [ "Alice", "Charlie" ]
console.log(nodes.map((n) => n.location)); // [ [ "users", 0, "name" ], [ "users", 2, "name" ] ]
console.log(nodes.map((n) => n.normalizedPath())); // [ "$['users'][0]['name']", "$['users'][2]['name']" ]
console.log(nodes.map((n) => n.shorthandPath())); // [ "$.users[0].name", "$.users[2].name" ]
console.log(nodes.map((n) => n.pointer.toString())); // [ "/users/0/name", "/users/2/name" ]
```

`find` is re-exported to JSON P3's top-level namespace, so `import { find } from "json-p3"` works too.

[`query(expr, data)`](./api/json-p3/namespaces/jsonpath/functions/query.md) is a depreciated alias for `find(expr, data)`.

### Just values

If you don't need node locations or any of the methods available on `JSONPathNode`, use [`jsonpath.findAll(expr, data)`](./api/globals.md#findall) instead. It always returns an array of type [`JSONLike`](./api/type-aliases/JSONLike.md).

`findAll` can be significantly faster and more memory efficient than `find`.

```javascript
import { jsonpath } from "json-p3";

const expr = "$.users[?@.status == 'pending'].name";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const values = jsonpath.findAll(expr, data);

console.log(values); // [ "Alice", "Charlie" ]
```

### Iterators

[`findIter(expr, data)`](./api/globals.md#finditer) is an alternative to `find()` that generates nodes lazily. `findIter` can be a good choice if you're working with very large datasets.

```javascript
import { jsonpath } from "json-p3";

const expr = "$.users[?@.status == 'pending'].name";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

for (const node of jsonpath.findIter(expr, data)) {
  console.log(node.value);
}
```

There's also [`jsonpath.findAllIter(expr, data)`](./api/globals.md#findalliter) that generates values lazily instead of nodes.

```javascript
// ... continued from above

for (const value of jsonpath.findAllIter(expr, data)) {
  console.log(value);
}
```

### First match

[`jsonpath.findOne(expr, data)`](./api/globals.md#findone) returns the first available node, or `undefined` if there were no matches.

```javascript
import { jsonpath } from "json-p3";

const expr = "$.users[?@.status == 'pending'].name";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const match = jsonpath.findOne(expr, data);

if (match) {
  console.log(match.value); // Alice
  console.log(match.location); // [ "users", 0, "name" ]
}
```

And [`jsonpath.test(expr, data)`](./api/globals.md#test) returns `true` if there's at least one match, or `false` otherwise.

```javascript
// ... continued from above

if (!jsonpath.test(expr, data)) {
  console.error("bad data!");
}
```

### Compilation

[`find`](#jsonpath) is a convenience function equivalent to `new JSONPathEnvironment().compile(path).find(data)`. Use [`jsonpath.compile(expr)`](./api/globals.md#compile) to construct a [`JSONPathQuery`](./api/classes/JSONPathQuery.md) object that can be applied to different data repeatedly.

```javascript
import { jsonpath } from "json-p3";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const query = jsonpath.compile("$.users[?@.status == 'pending'].name");

console.log(query.findAll(data)); // [ "Alice", "Charlie" ]
```

`compile` is re-exported to JSON P3's top-level namespace, so `import { compile } from "json-p3"` works too.

## JSON Pointer

Resolve a JSON Pointer against some data using [`jsonpointer.resolve(pointer, data)`](./api/globals.md#resolve).

The first argument must be a string following [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901). The second argument should be JSON-like data, as you'd get from `JSON.parse()`.

```javascript
import { jsonpointer } from "json-p3";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const rv = jsonpointer.resolve("/users/1", data);
console.log(rv); // { id: "usr_102", name: "Bob", status: "active" }
```

`resolve` is a convenience function equivalent to `JSONPointer.fromString(pointer).resolve(data)`. Use [`JSONPointer.fromString`](./api/classes/JSONPointer.md#fromstring) when you need to resolve the same pointer repeatedly against different data.

```javascript
import { JSONPointer } from "json-p3";

const someData = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const otherData = {
  users: [{ name: "Brian" }, { name: "Roy" }],
};

const pointer = JSONPointer.fromString("/users/1");
console.log(pointer.resolve(someData)); // { id: "usr_102", name: "Bob", status: "active" }
console.log(pointer.resolve(otherData)); // { name: 'Roy' }
```

### Errors and fallbacks

If the pointer can't be resolved against the argument JSON value, one of [`JSONPointerIndexError`](./api/classes/JSONPointerIndexError.md), [`JSONPointerKeyError`](./api/classes/JSONPointerKeyError.md) or [`JSONPointerTypeError`](./api/classes/JSONPointerTypeError.md) is thrown. All three exceptions inherit from [`JSONPointerResolutionError`](./api/classes/JSONPointerResolutionError.md).

```javascript
import { jsonpointer } from "json-p3";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const rv = jsonpointer.resolve("/users/1/age", data);
// JSONPointerKeyError: no such property '/users/1/age'
```

A fallback value can be given as a third argument, which will be returned in the event of a `JSONPointerResolutionError`.

```javascript
import { jsonpointer } from "json-p3";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const rv = jsonpointer.resolve("/users/1/age", data, -1);
console.log(rv); // -1
```

### Relative JSON Pointers

[Relative JSON Pointers](https://datatracker.ietf.org/doc/html/draft-hha-relative-json-pointer) are supported with the [`to(rel)`](./api/classes/JSONPointer.md#to) method of `JSONPointer`, where `rel` is a relative JSON pointer string and a new `JSONPointer` is returned.

```javascript
import { JSONPointer } from "json-p3";

const data = { foo: { bar: [1, 2, 3], baz: [4, 5, 6] } };
const pointer = JSONPointer.fromString("/foo/bar/2");

console.log(pointer.resolve(data)); // 3
console.log(pointer.to("0-1").resolve(data)); // 2
console.log(pointer.to("2/baz/2").resolve(data)); // 6
```

## JSON Patch

Apply a JSON Patch ([RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902)) to some data with [`jsonpatch.apply(ops, data)`](./api/globals.md#apply). **Data is modified in place.**.

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

`apply` is also re-exported from JSON P3's top-level namespace, so `import { apply } from "json-p3"` works too.

### JSONPatch constructor

`apply` is a convenience function equivalent to `new JSONPatch(ops).apply(data)`. Use the [`JSONPatch`](./api/classes/JSONPatch.md) constructor when you need to apply the same patch to multiple different data structures.

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
