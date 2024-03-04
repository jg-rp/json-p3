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

## Links

- Docs: https://jg-rp.github.io/json-p3/
- Install: https://jg-rp.github.io/json-p3/#install
- JSONPath playground: https://jg-rp.github.io/json-p3/playground
- JSONPath syntax: https://jg-rp.github.io/json-p3/guides/jsonpath-syntax
- API reference: https://jg-rp.github.io/json-p3/api
- Change log: https://github.com/jg-rp/json-p3/blob/main/CHANGELOG.md
- NPM: https://www.npmjs.com/package/json-p3
- Issue tracker: https://github.com/jg-rp/json-p3/issues

## Bundles

JSON P3 is written in TypeScript, compiled to JavaScript using [Babel](https://babeljs.io/), and bundled using [Rollup](https://rollupjs.org/introduction/). The following, included bundles target `defaults, maintained node version`, as defined by [Browserslist](https://browsersl.ist/#q=defaults%2C+maintained+node+versions).

JSON P3 has zero runtime dependencies.

| Bundle                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `json-p3.cjs.js`      | A CommonJS formatted bundle.                                               |
| `json-p3.esm.js`      | An ECMAScript module formatted bundle.                                     |
| `json-p3-iife.js`     | A bundle formatted as an Immediately Invoked Function Expression.          |
| `json-p3-iife.min.js` | A minified bundle formatted as an Immediately Invoked Function Expression. |

## Compliance Environment Variables

These environment variables control the location of the compliance test suite under test and if nondeterministic object iteration is enabled for those tests.

| Environment Variable      | Description                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `JSONP3_CTS`              | The path to `cts.json` used by `compliance.test.ts`. Defaults to `tests/path/cts/cts.json`.                           |
| `JSONP3_NONDETERMINISTIC` | When set to `true`, enables nondeterministic iteration of JSON objects for `compliance.test.ts`. Defaults to `false`. |

## Contributing

Please see [Contributing to JSON P3](https://github.com/jg-rp/json-p3/blob/main/CONTRIBUTING.md)

## License

`json-p3` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
