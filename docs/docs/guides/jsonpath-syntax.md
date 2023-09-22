# JSONPath Query Syntax

This page provides a short introduction to JSONPath syntax described in the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20) specification. We follow it strictly, and test against the [JSONPath Compliance Test Suite](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite).

Imagine a JSON document as a tree structure, where each JSON object and array can contain more objects, arrays and scalar values. Every object, array and scalar value is a node in the tree, and the outermost value is the "root" node.

Every query must start with either the root node identifier (`$`) or, within a [filter selector](#filters), the current node identifier (`@`). We then chain JSONPath _selectors_ together to retrieve nodes from the target document. Each selector operates on nodes matched by preceding selectors.

The result of a query is always a list of selected nodes after all selectors have been applied.

:::info
Strictly, using terminology from the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20), we chain _segments_, and those segments contain one or more _selectors_.

We use the terms "target JSON document", "target document" and "query argument" interchangeably to mean the JSON value a query is applied to.  
:::

## Segments, Selectors and Identifiers

```json title="Example JSON document"
{
  "users": [
    { "name": "Sue", "score": 100 },
    { "name": "John", "score": 86, "admin": true },
    { "name": "Sally", "score": 84, "admin": false },
    { "name": "Jane", "score": 55 }
  ],
  "moderator": "John"
}
```

### Root identifier

`$` is the root node identifier, pointing to the first node in the target JSON document.

```text title="Example query"
$.users
```

```json title="Example output"
[
  [
    { "name": "Sue", "score": 100 },
    { "name": "John", "score": 86, "admin": true },
    { "name": "Sally", "score": 84, "admin": false },
    { "name": "Jane", "score": 55 }
  ]
]
```

A query containing just the root identifier returns the target document in its entirety.

### Property names

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
    { "name": "John", "score": 86, "admin": true },
    { "name": "Sally", "score": 84, "admin": false },
    { "name": "Jane", "score": 55 }
  ]
]
```

### Array indices

Select array items by their index. Indices are zero-based and must be enclosed in brackets. If the index is negative, items are selected from the end of the array.

```text title="The first user"
$.users[0]
```

```text title="The last user"
$.users[-1]
```

```json title="Example output"
[
  { "name": "Sue", "score": 100 },
  { "name": "Jane", "score": 55 }
]
```

### Wildcard

Select all items from an array or values from an object using the wildcard selector. These two queries are equivalent.

```text
$.users.*.name
```

```text
$.users[*].name
```

```json title="Example output"
["Sue", "John", "Sally", "Jane"]
```

### Slices

Select a range of items from an array using slice notation, `[<start>:<stop>:<step>]`. The start index, stop index and step are all optional. If a step is omitted, the last colon is optional and step defaults to 1.

```text
$.users[0::2].name
```

```json title="Example output"
["Sue", "Sally"]
```

Negative indices and steps are OK too.

```text
$.users[-1:0:-2].name
```

```json title="Example output"
["Jane", "John"]
```

### Filters

Selectively include child nodes from the current selection using filters of the form `[?<expression>]`. A filter expression can be:

- a Boolean expression using one of the comparison operators (`==`, `!=`, `<`, `>`, `<=` and `>=`),
- an existence test on the result of a JSONPath query,
- or the truthiness of some function calls, depending on the function's return type.

```text
$.users[?@.admin]
```

```json title="Example output"
[
  { "name": "John", "score": 86, "admin": true },
  { "name": "Sally", "score": 84, "admin": false }
]
```

### Filter queries

Inside a filter expression, `@` is the _current node identifier_, starting a new JSONPath query with the current node at the root.

```text
$.users[?@.score > 85].name
```

```json title="Example output"
["Sue", "John"]
```

And the root node identifier (`$`) can be used to query from the target document root.

```text
$.users[?@.name == $.moderator]
```

```json title="Example output"
[
  {
    "name": "Sally",
    "score": 84,
    "admin": false
  }
]
```

Logical _and_ (`&&`) and _or_ (`||`) can be used to create more complex filters, and parentheses can be used to group terms.

```text
$.users[?@.score > 85 && @.score < 100].name
```

```json title="Example output"
["John"]
```

### Filter functions

Filter expressions can include calls to predefined functions. For example, the [`match()`](./jsonpath-functions.md#match) function matches nodes against a regular expression, if that node is a string value.

```text
$.users[?match(@.name, 'S.*')].score
```

```json title="Example output"
[100, 84]
```

See [JSONPath Functions](./jsonpath-functions.md) for a description of all standard filter functions.

### Lists

Use a comma separated list of selectors enclosed in square brackets to apply multiple selectors and concatenate the results.

```text
$.users[1, 2].score
```

```json title="Example output"
[86, 94]
```

Mixing selectors in a list of OK too.

```text
$.users[0, ?@.name == 'Sally', 'foo'].score
```

```json title="Example output"
[100, 84]
```

### Recursive descent

The recursive descent segment (`..[<selectors>]`) visits all nodes, recursively, beneath the current selection in the JSON document tree. There mst be at least one selector. In this example we use shorthand notation for a property name (`score`), but a bracketed selector list is OK too.

```text
$..score
```

```json title=Example output
[100, 86, 84, 55]
```
