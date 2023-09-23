# Contributing to JSON P3

Hi. Your contributions and questions are always welcome. Feel free to ask questions, report bugs or request features on the [issue tracker](https://github.com/jg-rp/json-p3/issues) or on [Github Discussions](https://github.com/jg-rp/json-p3/discussions).

**Table of contents**

- [Development](#development)
- [Documentation](#documentation)

## Development

The [JSONPath Compliance Test Suite](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite) is included as a git [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Clone the JSON P3 git repository and initialize the CTS submodule.

```shell
$ git clone git@github.com:jg-rp/json-p3.git
$ cd json-p3
$ git submodule update --init
```

We use [npm](https://docs.npmjs.com/cli/v10/commands/npm) to mange packages and run scripts during development. Install development dependencies with:

```shell
$ npm install --production=false
```

And run tests with the _test_ script.

```shell
$ npm test
```

Check for linting errors with the _lint_ script.

```shell
$ npm run lint
```

And check for typing errors with the _type-check_ script.

```shell
$ npm run type-check
```

Generate an HTML test coverage report with the _coverage_ script.

```shell
$ npm run coverage
```

Then open `coverage/index.html` in your browser.

Build distribution bundles and generate `.ts` files with the _build_ script. This will write bundles to the `dist/` folder.

```shell
$ npm run build
```

## Documentation

[Documentation](https://jg-rp.github.io/json-p3/) is built with [Docusaurus](https://docusaurus.io/). Find its source in the `docs/` folder of the main branch. Start the Docusaurus development server from within the `docs/` folder.

```shell
$ cd docs
$ npm run start
```
