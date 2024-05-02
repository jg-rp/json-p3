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

### Examples

```json title="Example JSON document"
{
  "a": [{ "b": "x", "c": "z" }, { "b": "y" }]
}
```

| Query       | Result            | Result Path                               | Comment                       |
| ----------- | ----------------- | ----------------------------------------- | ----------------------------- |
| `$.a[0].~c` | `"c"`             | `$['a'][0][~'c']`                         | Key of nested object          |
| `$.a[1].~c` |                   |                                           | Key does not exist            |
| `$..[~'b']` | `"b"` <br/> `"b"` | `$['a'][0][~'b']` <br/> `$['a'][1][~'b']` | Descendant, single quoted key |
| `$..[~"b"]` | `"b"` <br/> `"b"` | `$['a'][0][~'b']` <br/> `$['a'][1][~'b']` | Descendant, double quoted key |

## Keys selector

The keys selector `~` selects all names from an object’s name/value members. This complements the standard [wildcard selector](https://datatracker.ietf.org/doc/html/rfc9535#name-wildcard-selector), which selects all values from an object’s name/value pairs.

As with the wildcard selector, the order of nodes resulting from a keys selector is not stipulated.

When applied to an array or primitive value, the keys selector selects nothing.

The normalized path of a node selected using the keys selector uses [key selector](#key-selector) syntax.

### Syntax

```
keys-selector  = "~"
```

### Examples

```json title="Example JSON document"
{
  "a": [{ "b": "x", "c": "z" }, { "b": "y" }]
}
```

| Query          | Result                                    | Result Path                                                                               | Comment                    |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------- |
| `$.a[0].~`     | `"b"` <br/> `"c"`                         | `['a'][0][~'b']` <br/> `$['a'][0][~'c']`                                                  | Object keys                |
| `$.a.~`        |                                           |                                                                                           | Array keys                 |
| `$.a[0][~, ~]` | `"b"` <br/> `"c"` <br/> `"c"` <br/> `"b"` | `$['a'][0][~'b']` <br/> `$['a'][0][~'c']` <br/> `$['a'][0][~'c']` <br/> `$['a'][0][~'b']` | Non-deterministic ordering |
| `$..[~]`       | `"a"` <br/> `"b"` <br/> `"c"` <br/> `"b"` | `$[~'a']` <br/> `$['a'][0][~'b']` <br/> `$['a'][0][~'c']` <br/> `$['a'][1][~'b']`         | Descendant keys            |

## Keys filter selector

TODO:

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
