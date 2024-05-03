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

The following definitions build on [RFC 9535](https://datatracker.ietf.org/doc/html/rfc9535) ([license info](https://trustee.ietf.org/license-info)), while trying to stay true to its JSONPath model. These non-standard selectors are known to break the definitions of _location_ and _children_ defined in RFC 9535.

## Key selector

The key selector `~'<name>'` selects at most one name from an object member. It is syntactically similar to the standard [name selector](https://datatracker.ietf.org/doc/html/rfc9535#name-name-selector), with the addition of a tilde (`~`) prefix.

When applied to a JSON object, the key selector selects the _name_ from a name/value member, if such a member exists, or nothing if it does not exist. This complements the standard name selector, which select the _value_ from a name/value pair.

When applied to an array or primitive value, the key selector selects nothing.

Key selector strings must follow the same processing semantics as name selector strings, as described in [section 2.3.2.1](https://datatracker.ietf.org/doc/html/rfc9535#section-2.3.1.2) of RFC 9535.

:::info
The key selector is introduced to facilitate valid normalized paths for nodes produced by the [keys selector](#keys-selector) and the [keys filter selector](#keys-filter-selector). I don't expect it will be of much use elsewhere.
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

The keys selector (`~`) selects all names from an object’s name/value members. This complements the standard [wildcard selector](https://datatracker.ietf.org/doc/html/rfc9535#name-wildcard-selector), which selects all values from an object’s name/value pairs.

As with the wildcard selector, the order of nodes resulting from a keys selector is not stipulated.

When applied to an array or primitive value, the keys selector selects nothing.

The normalized path of a node selected using the keys selector uses [key selector](#key-selector) syntax.

### Syntax

```
keys-selector       = "~"
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

The keys filter selector selects names from an object’s name/value members. It is syntactically similar to the standard [filter selector](https://datatracker.ietf.org/doc/html/rfc9535#name-filter-selector), with the addition of a tilde (`~`) prefix.

```
~?<logical-expr>
```

Whereas the standard filter selector will produce a node for each _value_ from an object’s name/value members - when its expression evaluates to logical `true` - the keys filter selector produces a node for each _name_ in an object’s name/value members.

Logical expression syntax and semantics otherwise match that of the standard filter selector. `@` still refers to the current member value. See also the [current key identifier](#current-key-identifier).

When applied to an array or primitive value, the keys filter selector selects nothing.

The normalized path of a node selected using the keys filter selector uses [key selector](#key-selector) syntax.

### Syntax

```
filter-selector     = "~?" S logical-expr
```

### Examples

```json title="Example JSON document"
[{ "a": [1, 2, 3], "b": [4, 5] }, { "c": { "x": [1, 2] } }, { "d": [1, 2, 3] }]
```

| Query                  | Result            | Result Path                     | Comment                          |
| ---------------------- | ----------------- | ------------------------------- | -------------------------------- |
| `$.*[~?length(@) > 2]` | `"a"` <br/> `"d"` | `$[0][~'a']` <br/> `$[2][~'d']` | Conditionally select object keys |
| `$.*[~?@.x]`           | `"c"`             | `$[1][~'c']`                    | Existence test                   |
| `$[~?(true == true)]`  |                   |                                 | Keys from an array               |

## Current key identifier

`#` is the _current key_ identifier. `#` will be the name of the current object member, or index of the current array element. This complements the current node identifier (`@`), which refers to a member value or array element, respectively.

It is a syntax error to follow the current key identifier with segments, as if it were a filter query.

When used as an argument to a function, the current key is of `ValueType`, and outside a function call it must be compared.

When applied to a primitive value, the keys filter selector selects nothing.

### Syntax

```
comparable             = literal /
                         singular-query / ; singular query value
                         function-expr  / ; ValueType
                         current-key-identifier


function-argument      = literal /
                         filter-query / ; (includes singular-query)
                         logical-expr /
                         function-expr /
                         current-key-identifier

current-key-identifier = "#"
```

### Examples

```json title="Example JSON document"
{ "abc": [1, 2, 3], "def": [4, 5], "abx": [6], "aby": [] }
```

| Query                                     | Result                | Result Path                       | Comment                     |
| ----------------------------------------- | --------------------- | --------------------------------- | --------------------------- |
| `$[?match(#, '^ab.*') && length(@) > 0 ]` | `[1,2,3]` <br/> `[6]` | `$['abc']` <br/> `$['abx']`       | Match on object names       |
| `$.abc[?(# >= 1)]`                        | `2` <br/> `3`         | `$['abc'][1]` <br/> `$['abc'][2]` | Compare current array index |
