# JSONPath Functions

## Standard functions

These are the standard, built-in function available to JSONPath [filters](./jsonpath-syntax.md#filters). You can also create your own [function extensions](#function-extensions).

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

The JSONPath specification defines a [type system for function expressions](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20#name-type-system-for-function-ex), and rules for how those types can be used within an expression. JSON P3 will throw a [JSONPathTypeError](../api/classes/jsonpath.JSONPathTypeError.md) as query compile time if it contains expressions that are not deemed to be well-typed.

Please see [Section 2.4.3](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20#name-well-typedness-of-function-) _Well-Typedness of Function Expressions_.

## Function extensions

TODO:
