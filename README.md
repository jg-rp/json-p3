<h1 align="center">JSON P3</h1>

<p align="center">
JSONPath, JSON Patch and JSON Pointer for JavaScript.
<br>
We follow <a href="https://datatracker.ietf.org/doc/html/rfc9535">RFC 9535</a> and test against the <a href="https://github.com/jsonpath-standard/jsonpath-compliance-test-suite">JSONPath Compliance Test Suite</a>.
</p>

<p align="center">
  <a href="https://github.com/jg-rp/json-p3/blob/main/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/npm/l/json-p3?style=flat-square">
  </a>
  <a href="https://github.com/jg-rp/json-p3/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/jg-rp/json-p3/tests.yaml?branch=main&label=tests&style=flat-square" alt="Tests">
  </a>
  <a href="https://www.npmjs.com/package/json-p3">
    <img alt="NPM" src="https://img.shields.io/npm/v/json-p3?style=flat-square">
  </a>
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/json-p3?style=flat-square">
</p>

---

## Links

- Docs: https://jg-rp.github.io/json-p3/
- Install: https://jg-rp.github.io/json-p3/#install
- JSONPath playground: https://jg-rp.github.io/json-p3/playground
- JSONPath syntax: https://jg-rp.github.io/json-p3/guides/jsonpath-syntax
- API reference: https://jg-rp.github.io/json-p3/api
- Change log: https://github.com/jg-rp/json-p3/blob/main/CHANGELOG.md
- NPM: https://www.npmjs.com/package/json-p3
- Issue tracker: https://github.com/jg-rp/json-p3/issues

## Example

```javascript
import { jsonpath } from "json-p3";

const expr = "$.users[?@.status == 'pending'].name";

const data = {
  users: [
    { id: "usr_101", name: "Alice", status: "pending" },
    { id: "usr_102", name: "Bob", status: "active" },
    { id: "usr_103", name: "Charlie", status: "pending" },
  ],
};

const nodes = jsonpath.find(expr, data);

console.log(nodes.map((n) => n.value)); // [ "Alice", "Charlie" ]
console.log(nodes.map((n) => n.location)); // [ [ "users", 0, "name" ], [ "users", 2, "name" ] ]
console.log(nodes.map((n) => n.normalizedPath())); // [ "$['users'][0]['name']", "$['users'][2]['name']" ]
console.log(nodes.map((n) => n.shorthandPath())); // [ "$.users[0].name", "$.users[2].name" ]
console.log(nodes.map((n) => n.pointer.toString())); // [ "/users/0/name", "/users/2/name" ]
```

## Contributing

Please see [Contributing to JSON P3](https://github.com/jg-rp/json-p3/blob/main/CONTRIBUTING.md)

## License

`json-p3` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
