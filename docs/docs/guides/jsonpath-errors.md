# JSONPath Errors

`compile`, `find`, `findAll`, `findIter`, `findAllIter`, `findOne` and `test` functions/methods can throw errors at compile time and/or query evaluation time. All JSONPath errors inherit from [`JSONPathError`](../api/classes/JSONPathError.md).

**Compile time errors**

- `JSONPathSyntaxError`
- `JSONPathNameError`
- `JSONPathTypeError`
- `JSONPathIndexError`
- `JSONPathRecursionError`

**Evaluation time errors**

- `JSONPathRecursionError` (when a descendant segment recursion limit is set)
- `JSONPathError` (when debugging regex filters)

## Diagnostic messages

Compile time errors `JSONPathSyntaxError`, `JSONPathNameError`, `JSONPathTypeError` and `JSONPathIndexError` all inherit from `DetailedJSONPathError`, exposing [diagnostic](../api/json-p3/namespaces/jsonpath/type-aliases/Diagnostic.md) data and a [`render()`](../api/classes/DetailedJSONPathError.md#render) method.

`DetailedJSONPathError.render` returns a formatted string giving context to the error message that is useful for debugging queries.

```javascript
import { jsonpath } from "json-p3";

try {
  const query = jsonpath.compile("$.foo[?@['a', 'b'] == 42]");
} catch (err) {
  if (err instanceof jsonpath.DetailedJSONPathError) {
    console.log(err.render());
    process.exit(1);
  }

  throw err;
}
```

```plain title="output"
type error: non-singular query is not comparable
  -> $.foo[?@['a', 'b'] == 42]:1:7
  |
1 | $.foo[?@['a', 'b'] == 42]
  |        ^^^^^^^^^^^^^^^^^ non-singular query is not comparable
```

## Recursion limits

It is possible for syntactically valid JSONPath query expressions to abuse our recursive descent parser. If query authors are untrusted, be prepared to catch `JSONPathRecursionError` at compile time.

The parser recursion limit can be configured with the `maxExpressionDepth` options when constructing a new `JSONPathEnvironment`.

```javascript
import { JSONPathEnvironment } from "json-p3";

const env = new JSONPathEnvironment({ maxExpressionDepth: 20 });

const query = env.compile("$[?" + "!".repeat(30) + "@.a]");

// JSONPathRecursionError: maximum recursion depth reached
```

The `maxRecursionDepth` option controls the evaluation time recursion limit for the descendant segment. This guards against recursive and deeply nested data.

```javascript
import { JSONPathEnvironment } from "json-p3";

// Very low limit, for demonstration purposes.
const env = new JSONPathEnvironment({ maxRecursionDepth: 2 });

const expr = "$..a";
const data = { foo: [{ bar: [1, 2, 3] }] };

env.findAll(expr, data);

// JSONPathRecursionError: recursion limit reached
```

## Debugging regular expressions

The JSONPath specification requires standard `match` and `search` filter functions to return `false` if the argument regular expression pattern is not a valid I-Regexp or if the target value is not a string.

It can be useful to surface an error instead of silently returning false.

```javascript
import { JSONPathEnvironment, jsonpath } from "json-p3";

const env = new JSONPathEnvironment();

env.functions["match"] = new jsonpath.functions.Match({ throwErrors: true });

// Multi-character escape sequences are not allowed in I-Regexp.
const expr = "$.foo[?match(@.bar, '\\\\d')]";

const data = { foo: [{ bar: "123" }, { bar: "abc" }] };

const result = env.findAll(expr, data); // JSONPathError: Match: I-Regexp check failed
```

You can also disable I-Regexp checking:

```javascript
// ... continued from above

env.functions["match"] = new jsonpath.functions.Match({ iRegexpCheck: false });

env.functions["search"] = new jsonpath.functions.Search({
  iRegexpCheck: false,
});
```
