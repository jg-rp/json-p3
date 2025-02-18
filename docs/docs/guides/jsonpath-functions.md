# JSONPath Functions

This page describes functions that can be called as part of a [filter expression](./jsonpath-syntax.md#filters). Some of these functions are defined by [RFC 9535](https://datatracker.ietf.org/doc/html/rfc9535#name-function-extensions) and are available by default. Others are bundled with JSON P3 but need to be explicitly registered with a [`JSONPathEnvironment`](../api/namespaces/jsonpath/classes/JSONPathEnvironment.md). You can create your own [function extensions](#function-extensions) too.

:::info
The JSONPath specification defines a [type system for function expressions](https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex), and rules for how those types can be used within an expression. JSON P3 will throw a [JSONPathTypeError](../api/namespaces/jsonpath/classes/JSONPathTypeError.md) at query compile time if it contains expressions that are not deemed to be well-typed.

Please see [Section 2.4.3](https://datatracker.ietf.org/doc/html/rfc9535#name-well-typedness-of-function-) _Well-Typedness of Function Expressions_.
:::

## Standard functions

These are the standard JSONPath [filter selector](./jsonpath-syntax.md#filters) functions defined by RFC 9535. They are registered with every [`JSONPathEnvironment`](../api/namespaces/jsonpath/classes/JSONPathEnvironment.md) by default.

### `count()`

```typescript
count(nodes: JSONPathNodeList): number
```

Return the number of nodes in a node list. Usually, `count()` will be given a [filter query](./jsonpath-syntax.md#filter-queries) as its argument, and a call to `count()` must be part of a comparison expression.

```text title="Example query"
$.users[?count(@.*) > 2]
```

### `length()`

```typescript
length(value: JSONValue): number | undefined
```

Return the length of a string or array, or the number of items in an object. Usually, `length()` will be given a [filter query](./jsonpath-syntax.md#filter-queries) as its argument, and a call to `length()` must be part of a comparison expression.

```text title="Example query"
$.users[?length(@) > 2]
```

### `match()`

```typescript
match(value: string, pattern: string): boolean
```

Return `true` if _value_ is a full match to the regular expression _pattern_, or `false` otherwise.

```text title="Example query"
$.users[?match(@.name, '[Ss].*')]
```

### `search()`

```typescript
search(value: string, pattern: string): boolean
```

Return `true` if _value_ contains _pattern_, or `false` otherwise.

```text title="Example query"
$.users[?search(@.name, '[Aa]')]
```

### `value()`

```typescript
value(nodes: JSONPathNodeList): JSONValue | undefined
```

Return the value associated with the first node in _nodes_, if _nodes_ has exactly one [`JSONPathNode`](../api/namespaces/jsonpath/classes/JSONPathNode.md). Usually, `value()` will be called with a [filter query](./jsonpath-syntax.md#filter-queries) as its argument.

:::info
[Filter queries](./jsonpath-syntax.md#filter-queries) that can result in at most one node are known as "singular queries", and all singular queries will be implicitly replaced with their value as required, without the use of `value()`. `value()` is useful when you need the value from a query that can, theoretically, return multiple nodes.
:::

## Extra functions

These are function extensions that are included with JSON P3, but are not registered by default.

### `has()`

```typescript
search(value: object, pattern: string): boolean
```

Return `true` if the first argument is an object value and it contains a property name matching the second argument, or `false` otherwise. _pattern_ should be an I-Regexp string.

To use `has()` in your JSONPath queries, register an instance of `jsonpath.functions.Has` with a [`JSONPathEnvironment`](../api/namespaces/jsonpath/classes/JSONPathEnvironment.md).

```js
import { jsonpath } from "json-p3";

const env = new jsonpath.JSONPathEnvironment();
env.functionRegister.set("has", new jsonpath.functions.Has());

const data = [{ abc: 1 }, 42, { abb: 2 }, { a_c: 3 }];
const nodes = env.query(`$[?has(@, 'ab.')]`, data);
```

By default, instances of `Has` use search semantics. Set the `search` option to `false` when constructing a `Has` instance to use match semantics instead.

```js
env.functionRegister.set("has", new jsonpath.functions.Has({ search: false }));
```

See [HasFilterFunctionOptions](../api/namespaces/jsonpath/namespaces/functions/type-aliases/HasFilterFunctionOptions.md) for details of all available option.

## Function extensions

Add, remove or replace [filter functions](./jsonpath-syntax.md#filter-functions) by updating the [function register](../api/namespaces/jsonpath/classes/JSONPathEnvironment.md#functionregister) on a [`JSONPathEnvironment`](../api/namespaces/jsonpath/classes/JSONPathEnvironment.md). It is a regular [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), mapping function names to objects implementing the [`FilterFunction`](../api/namespaces/jsonpath/namespaces/functions/interfaces/FilterFunction.md) interface.

:::info
You can update the function register on the _default environment_ (`import { DEFAULT_ENVIRONMENT } from "json-p3"`), and use convenience functions like [`query()`](../quick-start.md#jsonpath) and [`compile()`](../quick-start.md#compilation). Here we'll create a new `JSONPathEnvironment`, then use its methods directly.
:::

Every filter function must define the types of its parameters and the type of its return value, according to the JSONPath specification's [type system](https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex). This example implements a `typeof()` function, which accepts a parameter of [`ValueType`](../api/namespaces/jsonpath/namespaces/functions/enumerations/FunctionExpressionType.md) and returns a `ValueType`.

```typescript
import {
  FilterFunction,
  FunctionExpressionType,
  JSONPathEnvironment,
} from "json-p3";

class TypeOfFilterFunction implements FilterFunction {
  readonly argTypes = [FunctionExpressionType.ValueType];
  readonly returnType = FunctionExpressionType.ValueType;

  public call(value: unknown): string {
    return typeof value;
  }
}
```

We would then register an instance of `TypeOfFilterFunction` with a `JSONPathEnvironment`, and use the environment's `query()`, `compile()` or `match()` methods.

```typescript
// .. continued from above
const env = new JSONPathEnvironment();
env.functionRegister.set("typeof", new TypeOfFilterFunction());

const nodes = env.query("$.users[?typeof(@.score) == 'number']", data);
```
