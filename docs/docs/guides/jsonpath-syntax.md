# JSONPath Query Syntax

This page provides a short introduction to JSONPath syntax. We follow [RFC 6535](https://datatracker.ietf.org/doc/html/rfc9535) closely and test against the [JSONPath Compliance Test Suite](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite).

## JSONPath Terminology

Think of a JSON document as a tree, objects and arrays can contain other objects, arrays, or scalar values. Each of these (object, array, or scalar) is a _node_ in the tree. The outermost object or array is called the _root_ node.

A JSONPath expression (aka "query") is made up of a sequence of **segments**. Each segment contains one or more **selectors**:

- A _segment_ corresponds to a step in the path from one set of nodes to the next.
- A _selector_ describes how to choose nodes within that step (for example, by name, by index, or by wildcard).

## Selectors and identifiers

### Root identifier

The root identifier, `$`, refers to the outermost node in the target document. This can be an object, an array, or a scalar value.

A query containing only the root identifier simply returns the entire input document.

**Example query**

```
$
```

```json title="data"
{
  "categories": [
    { "id": 1, "name": "fiction" },
    { "id": 2, "name": "non-fiction" }
  ]
}
```

```json title="results"
[
  {
    "categories": [
      { "id": 1, "name": "fiction" },
      { "id": 2, "name": "non-fiction" }
    ]
  }
]
```

### Name selector

A _name selector_ matches the value of an object member by its key. You can write it in either **shorthand notation** (`.thing`) or **bracket notation** (`['thing']` or `["thing"]`).

Dot notation can be used when the property name is a valid identifier. Bracket notation is required when the property name contains spaces, special characters, or starts with a number.

**Example query**

```text
$.book.title
```

```json title="data"
{
  "book": {
    "title": "Moby Dick",
    "author": "Herman Melville"
  }
}
```

```json title="results"
["Moby Dick"]
```

If a JSON object key contains a dot (`.`), space or other reserved symbol, use bracket notation instead of shorthand dot notation to select it.

```text
$["book.title"]
```

```json title="data"
{
  "book.title": "Moby Dick",
  "book.author": "Herman Melville"
}
```

```json title="results"
["Moby Dick"]
```

When using bracket notation, names can be surrounded by single or double quotes. These two queries are equivalent.

```text
$["book.title"]
$['book.title']
```

### Index selector

The index selector selects an element from an array by its index. Indices are zero-based and enclosed in brackets, `[0]`. If the index is negative, items are selected from the end of the array.

**Example query**

```text
$.categories[0].name
```

```json title="data"
{
  "categories": [
    { "id": 1, "name": "fiction" },
    { "id": 2, "name": "non-fiction" }
  ]
}
```

```json title="results"
["fiction"]
```

### Wildcard selector

The _wildcard selector_ matches all member values of an object or all elements in an array. It can be written as `.*` (shorthand notation) or `[*]` (bracket notation).

**Example query**

```text
$.categories[*].name
```

```json title="data"
{
  "categories": [
    { "id": 1, "name": "fiction" },
    { "id": 2, "name": "non-fiction" }
  ]
}
```

```json title="results"
["fiction", "non-fiction"]
```

### Slice selector

The slice selector allows you to select a range of elements from an array. A start index, ending index and step size are all optional and separated by colons, `[start:end:step]`. Negative indices count from the end of the array.

**Example query**

```text
$.items[1:4:2]
```

```json title="data"
{
  "items": ["a", "b", "c", "d", "e", "f"]
}
```

```json title="results"
["b", "d"]
```

### Filter selector

Filters allow you to remove nodes from a selection based on a Boolean expression, `[?expression]`. A filter expression evaluates each node in the context of either the root (`$`) or current (`@`) node.

When filtering an object, `@` identifies the current member value. When filtering an array, `@` identifies the current element.

Comparison operators include `==`, `!=`, `<`, `>`, `<=`, and `>=`. Logical operators `&&` (and) and `||` (or) can combine terms, and parentheses can be used to group expressions.

A filter expression on its own - without a comparison - is treated as an existence test.

**Example query**

```text
$..products[?(@.price < $.price_cap)]
```

```json title="data"
{
  "price_cap": 10,
  "products": [
    { "name": "apple", "price": 5 },
    { "name": "orange", "price": 12 },
    { "name": "banana", "price": 8 }
  ]
}
```

```json title="results"
[
  { "name": "apple", "price": 5 },
  { "name": "banana", "price": 8 }
]
```

Filter expressions can also call predefined [function extensions](./jsonpath-functions.md).

## More on segments

So far we've seen shorthand notation (`.selector`) and segments with just one selector (`[selector]`). Here we cover the descendant segment and segments with multiple selectors.

### Segments with multiple selectors

A segment can include multiple selectors separated by commas and enclosed in square brackets (`[selector, selector, ...]`). Any valid selector (names, indices, slices, filters, or wildcards) can appear in the list.

**Example query**

```text
$.store.book[0,2]
```

```json title="data"
{
  "store": {
    "book": [
      { "title": "Book A", "price": 10 },
      { "title": "Book B", "price": 12 },
      { "title": "Book C", "price": 8 }
    ]
  }
}
```

```json title="results"
[
  { "title": "Book A", "price": 10 },
  { "title": "Book C", "price": 8 }
]
```

### Descendant segment

The descendant segment (`..`) visits all object member values and array elements under the current object or array, applying the selector or selectors that follow to each visited node. It must be followed by a shorthand selector (names, wildcards, etc.) or a bracketed list of one or more selectors.

**Example query**

```text
$..price
```

```json title="data"
{
  "store": {
    "book": [
      { "title": "Book A", "price": 10 },
      { "title": "Book B", "price": 12 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}
```

```json title="results"
[10, 12, 19.95]
```
