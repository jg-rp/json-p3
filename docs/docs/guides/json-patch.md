# JSON Patch

JSON Patch ([RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902)) is a standard for describing update operations to perform on JSON-like data. Each operation includes, at least, an `op` string and a `path`, which is a [JSON Pointer](./json-pointer.md).

Use [`jsonpatch.apply(ops, data)`](../api/namespaces/jsonpatch/functions/apply.md) to apply _ops_ to _data_, where _ops_ should be an array of [`OpObject`s](../api/namespaces/jsonpatch/type-aliases/OpObject.md), as per RFC 6902. Patch operation are applied sequentially and, unless the target JSON document's root value is replaced, **data is modified in place**.

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

Use the [`JSONPatch`](../api/namespaces/jsonpatch/classes/JSONPatch.md) constructor to create a patch for repeated application.

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

## Builder API

[`JSONPatch`](../api/namespaces/jsonpatch/classes/JSONPatch.md) implements a builder interface for constructing JSON Patch documents. Each of the following methods appends an operation to the patch and returns the patch instance, so method calls can be chained.

### `add()`

[`JSONPatch.add(pointer, value)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#add) appends an [_add_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.1) operation to the patch. _pointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().add("/some/foo", { foo: [] });
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "add",
    "path": "/some/foo",
    "value": {
      "foo": []
    }
  }
]
```

### `remove()`

[`JSONPatch.remove(pointer)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#remove) appends a [_remove_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.2) operation to the patch. _pointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().remove("/some/foo");
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "remove",
    "path": "/some/foo"
  }
]
```

### `replace()`

[`JSONPatch.replace(pointer, value)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#replace) appends a [_replace_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.3) operation to the patch. _pointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().replace("/some/foo", [1, 2, 3]);
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "replace",
    "path": "/some/foo",
    "value": [1, 2, 3]
  }
]
```

### `move()`

[`JSONPatch.move(fromPointer, toPointer)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#move) appends a [_move_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.4) operation to the patch. _fromPointer_ and _toPointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().move("/some/foo", "/other/bar");
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "move",
    "from": "/some/foo",
    "path": "/other/bar"
  }
]
```

### `copy()`

[`JSONPatch.copy(fromPointer, toPointer)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#copy) appends a [_copy_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.5) operation to the patch. _fromPointer_ and _toPointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().copy("/some/foo", "/other/bar");
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "copy",
    "from": "/some/foo",
    "path": "/other/bar"
  }
]
```

### `test()`

[`JSONPatch.copy(pointer, value)`](../api/namespaces/jsonpatch/classes/JSONPatch.md#test) appends a [_test_](https://datatracker.ietf.org/doc/html/rfc6902#section-4.6) operation to the patch. _pointer_ can be a string following RFC 6901 or an instance of [`JSONPointer`](../api/namespaces/jsonpointer/classes/JSONPointer.md).

```javascript
import { JSONPatch } from "json-p3";

const patch = new JSONPatch().test("/some/foo", "hello");
console.log(JSON.stringify(patch.toArray(), undefined, "  "));
```

```json title="output"
[
  {
    "op": "test",
    "path": "/some/foo",
    "value": "hello"
  }
]
```
