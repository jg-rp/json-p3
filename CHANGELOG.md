# JSON P3 Change Log

## Version 2.2.1

**Fixes**

- Update iregexp-check to fix range quantifiers with multiple digits. See [issue 40](https://github.com/jg-rp/json-p3/issues/40).

## Version 2.2.0

**Fixes**

- Fixed a bug where the non-standard _current key identifier_ (`#`) would be accepted when [extra JSONPath syntax](https://jg-rp.github.io/json-p3/guides/jsonpath-extra) is disabled.

**Features**

- Added the `has` function extension ([docs](https://jg-rp.github.io/json-p3/guides/jsonpath-functions)).

## Version 2.1.1

**Fixes**

- Fixed parsing of filter queries containing multiple consecutive bracketed segments. Previously we were failing to parse queries like `$[?@[0][1]]`.

## Version 2.1.0

**Changes**

- Fixed `JSONPathQuery` serialization. `JSONPathQuery.toString()` was not handling name selectors containing `'` or `\`, and was a bit vague about the format serialized paths would use. `JSONPathQuery.toString()` now accepts an options object with a single `form` option. `form` can be one of `"pretty"` (the default) or `"canonical"`. The canonical format uses bracket notation and single quotes, whereas the pretty format uses shorthand notation where possible and double quotes. See [issue #30](https://github.com/jg-rp/json-p3/issues/30) and [PR #32](https://github.com/jg-rp/json-p3/pull/32).
- Added `JSONPathNode.getPath(options?)`, which returns a string representation of the node's location. As above, the `form` option can be one of `"pretty"` (the default) or `"canonical"`.
- Deprecated `JSONPathNode.path` in favour of `JSONPathNode.getPath(options?)`.
- Changed the string representation of _filter selectors_. Both canonical and pretty formats now only include parentheses where necessary.

## Version 2.0.0

**Breaking changes**

These changes should only affect you if you're customizing the JSONPath parser, defining custom JSONPath selectors or inspecting `JSONPath.selectors` (now `JSONPathQuery.segments`). Otherwise query parsing and evaluation remains unchanged. See [issue 11](https://github.com/jg-rp/json-p3/issues/11) for more information.

- Renamed `JSONPath` to `JSONPathQuery` to match terminology from RFC 9535.
- Refactored `JSONPathQuery` to be composed of `JSONPathSegment`s, each of which is composed of one or more instances of `JSONPathSelector`.
- Changed abstract method `JSONPathSelector.resolve` and `JSONPathSelector.lazyResolve` to accept a single node argument instead of an array or iterator of nodes. Both still return zero or more nodes.

## Version 1.3.5

**Fixes**

- Fixed a JSON Patch bug where we would not allow moving or copying to the end of an array using the special JSON Pointer token `-`.

## Version 1.3.4

**Fixes**

- Fixed decoding of JSONPath escape sequences (those found in name selectors and string literals). Previously we were relying on `JSON.parse()` to unescape strings, now we have our own `unescapeString()` function that rejects invalid codepoints and surrogate pairs. See [jsonpath-compliance-test-suite #87](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite/pull/87).
- Fixed default minimum integer boundary for JSONPath indexes and slice steps. We were off by one.
- Fixed parsing of JSONPath integer literals with an exponent and an upper case 'e'. We now allow 'e' to be upper case.
- Fixed handling of trailing commas in JSONPath bracketed segments. We now raise a syntax error.
- Fixed handling of invalid JSONPath integer and float literals with extra minus signs, leading zeros or too many zeros. We now raise a syntax error in such cases.

## Version 1.3.3

**Fixes**

- Fixed handling of JSONPath filter expression literals. We now throw a `JSONPathSyntaxError` if a filter expression contains a literal (string, int, float, boolean, null) that is not part of a comparison or function expression. See [jsonpath-compliance-test-suite #81](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite/pull/81).

## Version 1.3.2

**Fixes**

- Fixed more I-Regexp to RegExp pattern mapping. See [jsonpath-compliance-test-suite#77](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite/pull/77).
- We now check that regular expression patterns passed to `match` and `search` are valid according to RFC 9485. The standard behavior is to silently return `false` from these filter function if the pattern is invalid. The `throwErrors` option can be passed to `Match` and/or `Search` to throw an error instead, and the `iRegexpCheck` option can be set to `false` to disable I-Regexp checks.

## Version 1.3.1

**Fixes**

- Fixed I-Regexp to RegExp pattern mapping with the `match` and `search` filter functions. We now correctly match the special `.` character to everything other than `\r` and `\n`.

## Version 1.3.0

**Fixes**

- Fixed the normalized path representation of the non-standard keys selector. Previously the normalized path of a node produced from a keys selector would always result in an empty node list. Note that this fix only applies when the default key token (`~`) is used. Custom key tokens are problematic when it comes to other, co-operating key selectors. If you're only interested in _values_ from a node list, this wont affect you.

**Features**

- Added the non-standard _key_ selector ([docs](https://jg-rp.github.io/json-p3/guides/jsonpath-extra#key-selector)).
- Added the non-standard _keys filter_ selector ([docs](https://jg-rp.github.io/json-p3/guides/jsonpath-extra#keys-filter-selector)).

## Version 1.2.1

**Fixes**

- Fixed JSONPath name selectors that operator on array values. Previously, if a name selector were a quoted digit, we would treat that digit as an array index. The name selector now selects nothing if the target value is an array.
- Fixed the lazy JSONPath slice selector. Previously, the lazy slice selector was not slicing values lazily, but creating an intermediate array.
- Fixed JSONPath syntax error messages resulting from unbalanced parentheses or empty paren expressions.

## Version 1.2.0

**Fixes**

- Fixed the error and error message arising from JSONPath queries with filter expressions and a missing closing bracket for the segment. Previously we would get a `JSONPathLexerError`, stating we "can't backup beyond start", which is meant to be an internal error. We now get a `JSONPathSyntaxError` with the message "unclosed bracketed selection".

**Features**

- Added a non-standard _keys_ selector (`~`), selecting property names from objects. The keys selector is only enabled when setting `JSONPathEnvironment`'s `strict` option to `false` ([docs](https://jg-rp.github.io/json-p3/guides/jsonpath-extra#keys-selector), [source](https://github.com/jg-rp/json-p3/blob/baa705b20895c5a6f8e52679f8839f4d260ee030/src/path/extra/selectors.ts#L10)).
- Added a non-standard _current key_ identifier (`#`). `#` will be the key or index corresponding to `@` in a filter expression. The current key identifier is only enabled when setting `JSONPathEnvironment`'s `strict` option to `false` ([docs](https://jg-rp.github.io/json-p3/guides/jsonpath-extra#current-key-identifier), [source](https://github.com/jg-rp/json-p3/blob/baa705b20895c5a6f8e52679f8839f4d260ee030/src/path/extra/expression.ts#L4)).

## Version 1.1.1

**Fixes**

- Fixed evaluation of JSONPath singular queries when they appear in a logical expression and without a comparison operator. Previously we were evaluating logical expressions with the value held by the single element node list, now we treat such filter queries as existence tests.

# Version 1.1.0

**Fixes**

- Fixed logical operator precedence in JSONPath filter expressions. Previously, logical _or_ (`||`) had a higher precedence than logical _and_ (`&&`). Now `&&` binds more tightly than `||`.

**Features**

- Added `nondeterministic` to `JSONPathEnvironmentOptions` and environment variables to control nondeterminism and the location of `cts.json` when testing for compliance. See the [README](https://github.com/jg-rp/json-p3/blob/main/README.md) for a description of these environment variables.

# Version 1.0.0

[RFC 9535](https://datatracker.ietf.org/doc/html/rfc9535) has been published, replacing the [draft IETF JSONPath base](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-21).

# Version 0.3.1

**Breaking Changes**

- Changed the error thrown due to non-singular queries in comparison expressions from `JSONPathSyntaxError` to `JSONPathTypeError`.

**Fixes**

- Fixed handling of relative and root queries when used as arguments to filter functions. Previously, when those queries resulted in an empty node list, we were converting it to an empty array before passing it to functions that accept _ValueType_ arguments. Now, in such cases, we convert empty node lists to the special result _Nothing_, which is required by the spec.
- Fixed well-typedness checks on JSONPath logical expressions (those that involve `&&` or `||`) and non-singular filter queries. Previously we were erroneously applying the checks for comparison expressions to logical expressions too. Now non-singular queries in logical expressions act as an existence test.

## Version 0.3.0

**Fixes**

- Fixed call stack size issues when querying large datasets with the recursive descent selector. This was mostly due to extending arrays using the spread operator. We now iterate and use `Array.push()`.

**Features**

- Added `jsonpath.lazyQuery()`, a lazy alternative to `jsonpath.query()`. `lazyQuery()` can be faster and more memory efficient if querying large datasets, especially when using recursive descent selectors. Conversely, `query()` is usually the better choice when working with small datasets.
- `jsonpath.match()` now uses `lazyQuery()` internally, potentially avoiding a lot of unnecessary work.

# Version 0.2.1

**Fixes**

- Fixed JSONPath filter operator precedence. Previously logical _and_ (`&&`) and _or_ (`||`) were binding more tightly than logical negation (`!`).

# Version 0.2.0

**Breaking Changes**

- Rename `JSONPathEnvironment.filterRegister` to `JSONPathEnvironment.functionRegister`.
- Removed `JSONPathEnvironment.options` in favour of equivalent environment properties. For example, `JSONPathEnvironment.options.maxIntIndex` is now `JSONPathEnvironment.maxIntIndex`.

**Fixes**

- Fixed well-typedness checks on function calls. Previously we were throwing a `JSONPathTypError` for some valid queries.
- Fixed parsing of function calls with comparison expressions as arguments.
- Fixed a bug with unbalanced parentheses detection in JSONPath expressions when parsing nested function calls. In some cases we were not throwing a `JSONPathSyntaxError` when a function was not closed, but an inner function was.

**Features**

- Implemented [Relative JSON Pointers](https://www.ietf.org/id/draft-hha-relative-json-pointer-00.html). Use the `to(rel)` method of `JSONPointer`, where `rel` is a relative JSON pointer string and a new `JSONPointer` is returned.
- Guard against recursive data structures by implementing the `JSONPathEnvironment.maxRecursionDepth` option. When using the recursive descent selector (`..`), if the maximum recursion depth is reached, a `JSONPathRecursionLimitError` is thrown.
- Added `JSONPathEnvironment.match()` and `JSONPath.match()`, which returns a `JSONPathNode` for the first value matching a query, or `undefined` if there are no matches.

# Version 0.1.1

**Fixes**

- Fix number literals with an implicit exponent sign. Previously we would see a `JSONPathSyntaxError` for `1e2`, but not for `1e+2` or `1e-2`. Now `1e2` is equivalent to `1e+2`.

# Version 0.1.0

Initial release.
