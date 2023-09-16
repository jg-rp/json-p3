# Quick start

This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See [JSONPath Syntax](./guides/jsonpath-syntax.md) for an introduction to JSONPath syntax.

## JSONPath

Find all values matching a JSONPath query with [`jsonpath.query()`](./api/namespaces/jsonpath.md#query). It takes a string (the query) and some data to apply the query to. It always returns an instance of [`JSONPathNodeList`](./api/classes/jsonpath.JSONPathNodeList.md).

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

TODO:

### Errors and fallbacks

TODO:

### Relative JSON Pointers

TODO:

## JSON Patch

TODO:

### JSONPatch constructor

TODO:

### Builder API

TODO:

```

```
