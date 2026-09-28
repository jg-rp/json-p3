import { Bench, nToMs } from "tinybench";
import fs from "fs";
import { compile, findAll, query } from "../dist/json-p3.esm.js";

const cts = JSON.parse(
  fs.readFileSync(
    process.env.JSONP3_CTS_PATH || "../jsonpath-compliance-test-suite/cts.json",
    {
      encoding: "utf8",
    },
  ),
);

const queries = cts.tests
  .filter((testCase) => testCase.invalid_selector !== true)
  .map((testCase) => {
    return [testCase.selector, testCase.document];
  });

const compiledQueries = queries.map((q) => [compile(q[0]), q[1]]);

const benchOptions = {
  name: `Valid CTS Queries`,
  time: 10000,
};

if (process.versions.bun) {
  benchOptions.now = () => nToMs(Bun.nanoseconds());
  benchOptions.setup = (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === "warmup") {
      Bun.gc(true);
    }
  };
} else {
  benchOptions.setup = (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === "warmup" && typeof globalThis.gc === "function") {
      globalThis.gc();
    }
  };
}

const bench = new Bench(benchOptions);

bench
  .add("parse", () => {
    for (const [expr, _data] of queries) {
      compile(expr);
    }
  })
  .add("parse and render", () => {
    for (const [expr, data] of queries) {
      query(expr, data);
    }
  })
  .add("parse and render basic", () => {
    for (const [expr, data] of queries) {
      findAll(expr, data);
    }
  })
  .add("just render", () => {
    for (const [q, data] of compiledQueries) {
      q.query(data);
    }
  })
  .add("just render basic", () => {
    for (const [q, data] of compiledQueries) {
      q.findAll(data);
    }
  });

await bench.run();

function tableConverter(task) {
  const state = task.result.state;
  return {
    "Task name": task.name,
    ...(state === "aborted-with-statistics" || state === "completed"
      ? {
          "Throughput avg (ops/s)": `${Math.round(task.result.throughput.mean).toString()} \xb1 ${task.result.throughput.rme.toFixed(2)}%`,
          Samples: task.result.latency.samplesCount,
        }
      : state !== "errored"
        ? {
            "Throughput avg (ops/s)": "N/A",
            Remarks: state,
          }
        : {
            Error: task.result.error.message,
            Stack: task.result.error.stack ?? "N/A",
          }),
    ...(state === "aborted-with-statistics" && {
      Remarks: state,
    }),
  };
}

console.log(bench.name);
console.table(bench.table(tableConverter));
