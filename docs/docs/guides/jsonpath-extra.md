# Extra JSONPath Syntax

**_New in version 1.2.0_**

JSON P3 includes some extra, non-standard JSONPath syntax that is disabled by default. Setting the [`strict`](../api/namespaces/jsonpath.md#jsonpathenvironmentoptions) option to `false` when instantiating a [`JSONPathEnvironment`](../api/classes/jsonpath.JSONPathEnvironment.md) will enable all non-standard syntax.

```javascript
import { JSONPathEnvironment } from "json-p3";

const env = new JSONPathEnvironment({ strict: false });
values = env.query("$.some.path", data).values();
```

:::warning
Non-standard features are subject to change if:

- conflicting syntax is included in a future JSONPath standard or draft standard.
- an overwhelming consensus emerges from the JSONPath community that differs from our choices.
  :::

## Key selector

The key selector `~'<name>'` selects at most one object member name. It is syntactically similar to the standard [name selector](https://datatracker.ietf.org/doc/html/rfc9535#name-name-selector), with the addition of a tilde (`~`) prefix.

When applied to a JSON object, the key selector selects the _name_ from a name/value member, if such a member exists, or nothing if it does not exist. This complements the standard name selector, which select the _value_ from a name/value pair.

When applied to an array or primitive value, the key selector selects nothing.

Key selector strings must follow the same processing semantics as name selector strings, as described in [section 2.3.2.1](https://datatracker.ietf.org/doc/html/rfc9535#section-2.3.1.2) of RFC 9535.

:::info
The key selector is included as a way to generate valid normalized paths for nodes produced by the keys (plural) selector and the keys filter selector. I don't expect it will be of much use elsewhere.
:::

### Example

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

```text title="Query"
$.users[0].~score
```

```json title="Result"
"score"
```

```text title="Path"
$['users'][0][~'score']
```

### Syntax

```
selector             = name-selector /
                       wildcard-selector /
                       slice-selector /
                       index-selector /
                       filter-selector /
                       key-selector /
                       keys-selector /
                       keys-filter-selector

key-selector         = "~" name-selector

child-segment        = bracketed-selection /
                       ("."
                        (wildcard-selector /
                         member-name-shorthand /
                         member-key-shorthand))

descendant-segment   = ".." (bracketed-selection /
                             wildcard-selector /
                             member-name-shorthand /
                             member-key-shorthand)

member-key-shorthand = "~" name-first *name-char
```

## Keys selector

`~` is the _keys_ selector, selecting property names from object's name/value pairs. The keys selector can be used in a bracketed selection (`[~]`) or in its shorthand form (`.~`).

```text title="Query"
$.users[?@.score == 86].~
```

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

```json title="Output"
["name", "score", "admin"]
```

When applied to an array or primitive value, the keys selector selects nothing.

:::warning
Creating a [JSON Pointer](./json-pointer.md) from a [`JSONPathNode`](../api/classes/jsonpath.JSONPathNode.md#topointer) built using the keys selector will result in an unresolvable pointer. JSON Pointer does not support pointing to property names.
:::

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
