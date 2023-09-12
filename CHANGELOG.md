# JSON P3 Change Log

# Version 0.2.0 (unreleased)

**Fixes**

- Fix number literals with an implicit exponent sign. Previously we would see a `JSONPathSyntaxError` for `1e2`, but not for `1e+2` or `1e-2`. Now `1e2` is equivalent to `1e+2`.

# Version 0.1.0

Initial release.
