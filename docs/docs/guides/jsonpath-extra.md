# Extra JSONPath Syntax

**_New in version 1.2.0_**

JSON P3 includes some extra, non-standard JSONPath syntax that is not enabled by default. Setting the [`strict`](../api/namespaces/jsonpath.md#jsonpathenvironmentoptions) option to `false` when instantiating a [`JSONPathEnvironment`](../api/classes/jsonpath.JSONPathEnvironment.md) will enable all non-standard syntax.

```javascript
import { JSONPathEnvironment } from "json-p3";

const env = new JSONPathEnvironment({ strict: false });
values = env.query("$.some.path", data).values();
```

:::warning
Non-standard features are subject to change if:

- conflicting syntax is included in a future JSONPath standard or draft standard.
- an overwhelming consensus amongst the JSONPath community emerges that differs from our choices.
  :::

## Keys selector

`~` is the _keys_ selector, selecting property names from objects. The keys selector can be used in a bracketed selection (`[~]`) or in its shorthand form (`.~`).

```text
$.users[?@.score == 86].~
```

Output using example data from the [previous page](./jsonpath-syntax.md):

```json
["name", "score", "admin"]
```

When applied to an array or primitive value, the keys selector select nothing.

### Custom keys token

The token representing the keys selector can be customized by setting the `keysPattern` option on a `JSONPathEnvironment` to a regular expression with the sticky flag set. For example, to change the keys selector to be `*~` instead of `~`:

```javascript
import { JSONPathEnvironment } from "json-p3";

const env = new JSONPathEnvironment({ strict: false, keysPattern: /\*~/y });
```

## Current key identifier

`#` is the _current key_ identifier. `#` will be the property name of an object or index of an array corresponding to `@` in a filter expression.

```text
$.users[?# > 1]
```

Again, using example data from the [previous page](./jsonpath-syntax.md):

```json
[
  {
    "name": "Sally",
    "score": 84,
    "admin": false
  },
  {
    "name": "Jane",
    "score": 55
  }
]
```
