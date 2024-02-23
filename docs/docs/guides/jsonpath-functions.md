# JSONPath Functions

## Standard functions

These are the standard, built-in functions available to JSONPath [filters](./jsonpath-syntax.md#filters). You can also create your own [function extensions](#function-extensions).

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

Return the value associated with the first node in _nodes_, if _nodes_ has exactly one [`JSONPathNode`](../api/classes/jsonpath.JSONPathNode.md). Usually, `value()` will be called with a [filter query](./jsonpath-syntax.md#filter-queries) as its argument.

:::info
[Filter queries](./jsonpath-syntax.md#filter-queries) that can result in at most one node are known as "singular queries", and all singular queries will be implicitly replaced with their value as required, without the use of `value()`. `value()` is useful when you need the value from a query that can, theoretically, return multiple nodes.
:::

## Well-typedness

The JSONPath specification defines a [type system for function expressions](https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex), and rules for how those types can be used within an expression. JSON P3 will throw a [JSONPathTypeError](../api/classes/jsonpath.JSONPathTypeError.md) at query compile time if it contains expressions that are not deemed to be well-typed.

Please see [Section 2.4.3](https://datatracker.ietf.org/doc/html/rfc9535#name-well-typedness-of-function-) _Well-Typedness of Function Expressions_.

## Function extensions

Add, remove or replace [filter functions](./jsonpath-syntax.md#filter-functions) by updating the [function register](../api/classes/jsonpath.JSONPathEnvironment.md#functionregister) on a [`JSONPathEnvironment`](../api/classes/jsonpath.JSONPathEnvironment.md). It is a regular [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), mapping function names to objects implementing the [`FilterFunction`](../api/interfaces/jsonpath.functions.FilterFunction.md) interface.

:::info
You can update the function register on the _default environment_ (`import { DEFAULT_ENVIRONMENT } from "json-p3"`), and use convenience functions like [`query()`](../quick-start.md#jsonpath) and [`compile()`](../quick-start.md#compilation). Here we'll create a new `JSONPathEnvironment`, then use its methods directly.
:::

Every filter function must define the types of its parameters and the type of its return value, according to the JSONPath specification's [type system](https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex). This example implements a `typeof()` function, which accepts a parameter of [`ValueType`](../api/enums/jsonpath.functions.FunctionExpressionType.md) and returns a `ValueType`.

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
