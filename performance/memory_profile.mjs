// oxlint-disable no-await-in-loop
import fs from "fs";

import { compile } from "../dist/json-p3.esm.js";

const fixtures = [
  //   {
  //     name: "small-citylots",
  //     data: JSON.parse(fs.readFileSync("../ref/small-citylots.json")),
  //     want: { shallow: 49998, deep: 49998, conditional: 643 },
  //   },
  //   {
  //     name: "medium-citylots",
  //     data: JSON.parse(fs.readFileSync("../ref/medium-citylots.json")),
  //     want: { shallow: 99998, deep: 99998, conditional: 824 },
  //   },
  {
    name: "citylots",
    data: JSON.parse(fs.readFileSync("../ref/citylots.json")),
    want: { shallow: 206560, deep: 206560, conditional: 2843 },
  },
];

const queries = {
  //   shallow: compile("$.features..properties"),
  deep: compile("$.features..properties.BLOCK_NUM"),
  //   conditional: compile(
  //     "$.features[?@.properties.STREET=='UNKNOWN'].properties.BLOCK_NUM",
  //   ),
  //   regex: compile(
  //     "$.features[?match(@.properties.STREET, 'UNKNOWN')].properties.BLOCK_NUM",
  //   ),
};

function mb(bytes) {
  return bytes / 1024 / 1024;
}

async function profile(fn) {
  const baseline = process.memoryUsage();

  let peakRss = baseline.rss;
  let peakHeap = baseline.heapUsed;

  const sample = () => {
    const m = process.memoryUsage();

    peakRss = Math.max(peakRss, m.rss);
    peakHeap = Math.max(peakHeap, m.heapUsed);
  };

  sample();

  const timer = setInterval(sample, 10);

  try {
    return await fn();
  } finally {
    sample();
    clearInterval(timer);

    console.table({
      "baseline RSS": `${mb(baseline.rss).toFixed(1)} MB`,
      "peak RSS": `${mb(peakRss).toFixed(1)} MB`,
      "peak RSS delta": `${mb(peakRss - baseline.rss).toFixed(1)} MB`,

      "baseline heap": `${mb(baseline.heapUsed).toFixed(1)} MB`,
      "peak heap": `${mb(peakHeap).toFixed(1)} MB`,
      "peak heap delta": `${mb(peakHeap - baseline.heapUsed).toFixed(1)} MB`,
    });
  }
}

for (const fixture of fixtures) {
  for (const [queryName, query] of Object.entries(queries)) {
    const benchName = `${fixture.name}:${queryName}`;

    console.log(`${benchName}:`);

    await profile(async () => {
      query.query(fixture.data);
    });

    // XXX: It's important to do one profile per process.

    // console.log(`${benchName}-iter:`);

    // await profile(async () => {
    //   Array.from(query.queryIter(fixture.data));
    // });
  }
}
