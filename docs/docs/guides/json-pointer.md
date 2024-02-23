# JSON Pointer

JSON Pointer ([RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)) is a syntax for targeting a single value in JSON-like data. JSON Pointers can be _resolved_ against data to retrieve the value, or used as part of a JSON Patch operation.

A JSON Pointer is a Unicode string containing slash (`/`) separated tokens. Each token is either a potential property name for a JSON object, or a potential index for a JSON array. When a property name contains a slash (`/`) or a tilde (`~`), they are encoded as `~1` and `~0`, respectively.

:::info
We have extended RFC 6901 to handle index/property pointers from [Relative JSON Pointer](https://datatracker.ietf.org/doc/html/draft-hha-relative-json-pointer).
:::

## Pointer resolution

Resolve a JSON Pointer against some data using [`jsonpointer.resolve(pointer, data)`](../api/namespaces/jsonpointer.md#resolve).

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

`resolve()` is a convenience function equivalent to `new JSONPointer(pointer).resolve(data)`. Use the [`JSONPointer`](../api/classes/jsonpointer.JSONPointer.md) constructor when you need to resolve the same pointer repeatedly against different data.

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

If the pointer can't be resolved against the argument JSON value, one of [`JSONPointerIndexError`](../api/classes/jsonpointer.JSONPointerIndexError.md), [`JSONPointerKeyError`](../api/classes/jsonpointer.JSONPointerKeyError.md) or [`JSONPointerTypeError`](../api/classes/jsonpointer.JSONPointerTypeError.md) is thrown. All three exceptions inherit from [`JSONPointerResolutionError`](../api/classes/jsonpointer.JSONPointerResolutionError.md).

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

### With parent

[`resolveWithParent()`](../api/classes/jsonpointer.JSONPointer.md#resolvewithparent) is similar to `resolve()`, but returns the target's parent value and the target value as a two-element array.

```javascript
import { JSONPointer } from "json-p3";

const data = {
  users: [
    { name: "Sue", score: 100 },
    { name: "John", score: 86 },
    { name: "Sally", score: 84 },
  ],
};

const pointer = new JSONPointer("/users/1");
const [parent, target] = pointer.resolveWithParent(data);
```

If the target value does not exist but the parent does, you'll get the parent object and the special [`UNDEFINED`](../api/namespaces/jsonpointer.md#undefined) symbol. Similarly, if the pointer is pointing to the JSON document root, you'll get `UNDEFINED` and the target document in its entirety.

Otherwise, if the pointer's parent does not exist, a [`JSONPointerResolutionError`](../api/classes/jsonpointer.JSONPointerResolutionError.md) is thrown.

## Utility methods

### `exists()`

Test for existence with [`JSONPointer.exists(data)`](../api/classes/jsonpointer.JSONPointer.md#exists). It returns `true` if the target exists in _data_, even if the target is falsy, and `false` otherwise.

```javascript
import { JSONPointer } from "json-p3";

const data = { foo: { bar: [1, 2, 3] }, baz: false };

let pointer = new JSONPointer("/foo/bar/0");
console.log(pointer.exists(data)); // true

pointer = new JSONPointer("/foo/bar/9");
console.log(pointer.exists(data)); // false

pointer = new JSONPointer("/baz");
console.log(pointer.exists(data)); // true
```

### `join()`

Build child pointers using [`JSONPointer.join(...tokens)`](../api/classes/jsonpointer.JSONPointer.md#join). It takes any number of JSON Pointer tokens and returns a new `JSONPointer`. Similar to joining a file system path, if a token has a leading slash, the previous pointer is ignored and a new `JSONPointer` is created, before processing of remaining tokens continues.

```javascript
import { JSONPointer } from "json-p3";

const pointer = new JSONPointer("/foo/bar");

console.log(pointer.toString()); // /foo/bar
console.log(pointer.join("baz").toString()); // /foo/bar/baz
console.log(pointer.join("baz", "0").toString()); // /foo/bar/baz/0
console.log(pointer.join("baz/qux", "0").toString()); // /foo/bar/baz/qux/0
```

### `parent()`

Get a pointer to the parent of an existing JSON Pointer using [`JSONPointer.parent()`](../api/classes/jsonpointer.JSONPointer.md#parent). If the pointer is pointing to the document root, `this` is returned.

```javascript
import { JSONPointer } from "json-p3";

const pointer = new JSONPointer("/foo/bar");

console.log(pointer.toString()); // /foo/bar
console.log(pointer.parent().toString()); // /foo
```

### `isRelativeTo()`

Test if a pointer is a child of another using [`JSONPointer.isRelativeTo()`](../api/classes/jsonpointer.JSONPointer.md#isrelativeto).

```javascript
import { JSONPointer } from "json-p3";

const pointer = new JSONPointer("/foo/bar");

let anotherPointer = new JSONPointer("/foo/bar/0");
console.log(anotherPointer.isRelativeTo(pointer)); // true

anotherPointer = new JSONPointer("/foo/baz");
console.log(anotherPointer.isRelativeTo(pointer)); // false
```

## Relative JSON Pointer

Use [Relative JSON Pointer](https://datatracker.ietf.org/doc/html/draft-hha-relative-json-pointer) syntax with [`JSONPointer.to(rel)`](../api/classes/jsonpointer.JSONPointer.md#to) to create a new pointer relative to an existing one.

```javascript
import { JSONPointer } from "json-p3";

const data = { foo: { bar: [1, 2, 3], baz: [4, 5, 6] } };
const pointer = new JSONPointer("/foo/bar/2");

console.log(pointer.resolve(data)); // 3
console.log(pointer.to("0-1").resolve(data)); // 2
console.log(pointer.to("2/baz/2").resolve(data)); // 6
```
