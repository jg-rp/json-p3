# JSON P3 Change Log

# Version 1.1.0 (unreleased)

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
