/**
 * This is incomplete and, thus far, has been used in an adhoc manner.
 */
const { performance } = require("perf_hooks");
const { jsonpath } = require("../dist/json-p3.cjs");
const cts = require("../tests/path/cts/cts.json");

function validQueries() {
  return cts.tests
    .filter((testCase) => testCase.invalid_selector !== true)
    .map((testCase) => {
      return [testCase.selector, testCase.document];
    });
}

function perf(repeat) {
  const env = new jsonpath.JSONPathEnvironment();
  const queries = validQueries();
  console.log(
    `repeating ${queries.length} queries on small datasets ${repeat} times`,
  );
  const start = performance.now();
  for (let i = 0; i < repeat; i++) {
    for (const [query, data] of queries) {
      env.query(query, data);
      // Array.from(env.lazyQuery(query, data));
    }
  }
  const stop = performance.now();
  return (stop - start) / 1e3;
}

console.log(perf(1000));
