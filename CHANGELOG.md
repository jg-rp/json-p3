# JSON P3 Change Log

# Version 0.2.0 (unreleased)

**Breaking Changes**

- Rename `JSONPathEnvironment.filterRegister` to `JSONPathEnvironment.functionRegister`.

**Fixes**

- Fix validation of function expressions that accept a `ValueType` parameter and is called with a function that returns a `ValueType` (like `value()`). Previously a `JSONPathTypeError` was thrown.

**Features**

- Implement [Relative JSON Pointers](https://www.ietf.org/id/draft-hha-relative-json-pointer-00.html). Use the `to(rel)` method of `JSONPointer`, where `rel` is a relative JSON pointer string and a new `JSONPointer` is returned.

# Version 0.1.1

**Fixes**

- Fix number literals with an implicit exponent sign. Previously we would see a `JSONPathSyntaxError` for `1e2`, but not for `1e+2` or `1e-2`. Now `1e2` is equivalent to `1e+2`.

# Version 0.1.0

Initial release.
