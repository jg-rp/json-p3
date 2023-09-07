<h1 align="center">JSON P3</h1>

<p align="center">
JSONPath, JSON Patch and JSON Pointer for JavaScript.
</p>

---

## Install

TODO: Work in progress.

## JSONPath

Retrieve values from JSON-like data using JSONPath query expressions. We strictly follow standards described in the [IETF JSONPath draft](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20).

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

The result of `path.query()` is an instance of `JSONPathNodeList`. That is a list of `JSONPathNode` objects, one node for each value in the target JSON document that matched they query. Each node has:

- `value` - The value found in the target JSON value. This could be an array, object or primitive value.
- `location` - An array of property names and array indices that were required to reach the node's value in the target JSON value.
- `path` - The normalized JSONPath to this node in the target JSON document.

Use `JSONPathNodeList.paths()` to retrieve all node paths.

```javascript
// .. continued from above
console.log(nodes.paths());
```

**Output:**

```plain
[
  "$['users']['1']['name']",
  "$['users']['2']['name']",
  "$['users']['3']['name']"
]
```

And `JSONPathNodeList.locations()` to get an array of node locations.

```javascript
// .. continued from above
console.log(nodes.locations());
```

**Output:**

```plain
[
  [ 'users', 1, 'name' ],
  [ 'users', 2, 'name' ],
  [ 'users', 3, 'name' ]
]
```

You can also compile a JSONPath query for repeated use against different data.

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

## JSON Pointer

TODO: Work in progress.

## JSON Patch

TODO: Work in progress.
