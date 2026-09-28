import { performance } from "perf_hooks";
import fs from "fs";
import { compile } from "../dist/json-p3.esm.js";

const fixtures = [
  {
    name: "small-citylots",
    data: JSON.parse(fs.readFileSync("../ref/small-citylots.json")),
    want: { shallow: 49998, deep: 49998, conditional: 643 },
  },
  {
    name: "medium-citylots",
    data: JSON.parse(fs.readFileSync("../ref/medium-citylots.json")),
    want: { shallow: 99998, deep: 99998, conditional: 824 },
  },
  {
    name: "citylots",
    data: JSON.parse(fs.readFileSync("../ref/citylots.json")),
    want: { shallow: 206560, deep: 206560, conditional: 2843 },
  },
];

const queries = {
  shallow: compile("$.features..properties"),
  deep: compile("$.features..properties.BLOCK_NUM"),
  conditional: compile(
    "$.features[?@.properties.STREET=='UNKNOWN'].properties.BLOCK_NUM",
  ),
  regex: compile(
    "$.features[?match(@.properties.STREET, 'UNKNOWN')].properties.BLOCK_NUM",
  ),
};

const number = 1;
const repeat = 5;

console.log(
  `${"Benchmark".padEnd(35)} | ${"Min (s)".padEnd(10)} | ${"Mean (s)".padEnd(10)}`,
);
console.log("-".repeat(62));

for (const fixture of fixtures) {
  for (const [queryName, query] of Object.entries(queries)) {
    const benchName = `${fixture.name}:${queryName}`;
    const times = [];

    for (let i = 0; i < repeat; i++) {
      const start = performance.now();
      // Array.from(query.queryIter(fixture.data));
      // query.query(fixture.data);
      query.findAll(fixture.data);
      const stop = performance.now();
      times.push((stop - start) / 1e3);
    }

    const perRunTimes = times.map((t) => t / number);
    const minTime = Math.min(...times).toFixed(4);
    const meanTime = (
      perRunTimes.reduce((a, b) => a + b, 0) / perRunTimes.length
    ).toFixed(4);

    console.log(
      `${benchName.padEnd(35)} | ${minTime.padEnd(10)} | ${meanTime.padEnd(10)}`,
    );
  }
}
