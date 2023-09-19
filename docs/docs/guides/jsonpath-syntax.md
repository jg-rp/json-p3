# JSONPath Syntax

This page provides a casual introduction to JSONPath syntax described in the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20) specification. We follow it strictly, and test against the [JSONPath Compliance Test Suite](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite).

Imagine a JSON document as a tree structure, where each JSON object and array can contain more objects, arrays and scalar values. Every object, array and scalar value is a node in the tree, and the outermost value is the "root" node.

Every query must start with either the root node identifier (`$`) or, within a [filter selector](#filters), the current node identifier (`@`). We then chain JSONPath _selectors_ together to retrieve nodes from the target document. Each selector operates on nodes matched by preceding selectors. What follows is a description of those selectors.

:::info
Strictly, using terminology from the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20), we chain _segments_, and those segments can contain _selectors_.

We use the terms "target JSON document", "target document" and "query argument" interchangeably to mean the JSON value a query is applied to.  
:::

## Segments, Selectors and Identifiers

```json title="Example JSON document"
{
  "users": [
    { "name": "Sue", "score": 100 },
    { "name": "John", "score": 86 },
    { "name": "Sally", "score": 84 },
    { "name": "Jane", "score": 55 }
  ]
}
```

### Root (`$`)

`$` is the root node identifier, pointing to the first node in the target JSON document.

```text title="Example query"
$.users
```

```json title="Example output"
[
  [
    { "name": "Sue", "score": 100 },
    { "name": "John", "score": 86 },
    { "name": "Sally", "score": 84 },
    { "name": "Jane", "score": 55 }
  ]
]
```

A query containing just the root identifier returns the target document in its entirety.

### Property names (`['thing']`, `["thing"]` or `.thing`)

Select an object's properties using dot notation (`.thing`) or within a [bracketed segment](#lists) (`['thing']` or `["thing"]`). Dot notation is only allowed if a property name does not contain reserved characters. These three queries are equivalent.

```text
$.users
```

```text
$['users']
```

```text
$["users"]
```

```json title="Example output"
[
  [
    { "name": "Sue", "score": 100 },
    { "name": "John", "score": 86 },
    { "name": "Sally", "score": 84 },
    { "name": "Jane", "score": 55 }
  ]
]
```

### Array indices (`[0]` or `[-1]`)

Select array items by their index. Indices are zero-based and must be enclosed in brackets. If the index is negative, items are selected from the end of the array.

```text title="The first user"
$.users[0]
```

```text title="The last user"
$.users[-1]
```

### Wildcard (`.*` or `[*]`)

Select all items from an array or values from an object using the wildcard selector.

```text
$.users.*
```

```text
$.users[*]
```

### Slices (`[0:-1]` or `[-1:0:-1]`)

TODO:

### Recursive descent (`..`)

TODO:

### Lists

TODO:

### Filters

TODO:

### Functions

TODO:
