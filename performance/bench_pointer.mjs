import { Bench, nToMs } from "tinybench";

import { resolve } from "../dist/json-p3.esm.js";

const testDocument = {
  foo: ["bar", "baz"],
  "": 0,
  "a/b": 1,
  "c%d": 2,
  "e^f": 3,
  "g|h": 4,
  "i\\j": 5,
  'k"l': 6,
  " ": 7,
  "m~n": 8,
  nested: {
    deep: {
      items: [
        { id: 101, name: "Item A", active: true },
        { id: 102, name: "Item B", active: false },
      ],
      nullable: null,
    },
  },
};

const testPointers = [
  // Valid / Resolvable Pointers
  "",
  "/foo",
  "/foo/0",
  "/foo/1",
  "/",
  "/a~1b",
  "/c%d",
  "/e^f",
  "/g|h",
  "/i\\j",
  '/k"l',
  "/ ",
  "/m~0n",
  "/nested/deep/items/0/id",
  "/nested/deep/items/1/name",

  // Failure Path Pointers (Unresolvable)
  "/nonexistent",
  "/foo/5",
  "/foo/-",
  "/foo/abc",
  "/foo/01",
  "/nested/deep/nullable/key",
  "/nested/deep/items/0/id/key",
  "/m~2n",
];

const benchOptions = {
  name: `JSON Pointer`,
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

bench.add("resolve with fallback", () => {
  for (const pointer of testPointers) {
    resolve(pointer, testDocument, "fallback");
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
