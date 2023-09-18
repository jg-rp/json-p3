# JSON P3 Change Log

# Version 0.2.0 (unreleased)

**Breaking Changes**

- Rename `JSONPathEnvironment.filterRegister` to `JSONPathEnvironment.functionRegister`.
- Removed `JSONPathEnvironment.options` in favour of equivalent environment properties. For example, `JSONPathEnvironment.options.maxIntIndex` is now `JSONPathEnvironment.maxIntIndex`.

**Fixes**

- Fixed well-typedness checks on function calls. Previously we were throwing a `JSONPathTypError` for some valid queries.
- Fixed parsing of function calls with comparison expressions as arguments.
- Fixed a bug with unbalanced parentheses detection in JSONPath expressions when parsing nested function calls. In some cases we were not throwing a `JSONPathSyntaxError` when a function was not closed, but an inner function was.

**Features**

- Implement [Relative JSON Pointers](https://www.ietf.org/id/draft-hha-relative-json-pointer-00.html). Use the `to(rel)` method of `JSONPointer`, where `rel` is a relative JSON pointer string and a new `JSONPointer` is returned.
- Guard against recursive data structures by implementing the `JSONPathEnvironment.maxRecursionDepth` option. When using the recursive descent selector (`..`), if the maximum recursion depth is reached, a `JSONPathRecursionLimitError` is thrown.

# Version 0.1.1

**Fixes**

- Fix number literals with an implicit exponent sign. Previously we would see a `JSONPathSyntaxError` for `1e2`, but not for `1e+2` or `1e-2`. Now `1e2` is equivalent to `1e+2`.

# Version 0.1.0

Initial release.
