import fs from "node:fs";

import { compile } from "../dist/json-p3.esm.js";

const fixture = {
  name: "citylots",
  data: JSON.parse(fs.readFileSync("/Users/james/projects/ref/citylots.json", "utf8")),
  want: {
    shallow: 206560,
    deep: 206560,
    conditional: 2843,
  },
};

const query = compile("$.features..properties.BLOCK_NUM");

const benchName = `${fixture.name}:deep`;

const isBun = typeof Bun !== "undefined";

let bunJsc = null;

if (isBun) {
  bunJsc = await import("bun:jsc");
}

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

function memory() {
  const usage = process.memoryUsage();

  const result = {
    rss: usage.rss,
    heapUsed: usage.heapUsed,
    heapTotal: usage.heapTotal,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers,
  };

  if (isBun && bunJsc) {
    const jsc = bunJsc.heapStats();

    result.jsc = {
      heapSize: jsc.heapSize,
      heapCapacity: jsc.heapCapacity,
      extraMemorySize: jsc.extraMemorySize,
    };

    // On macOS this uses task_info(TASK_VM_INFO).phys_footprint.
    result.memoryFootprint = Bun.unsafe.memoryFootprint?.() ?? undefined;
  }

  return result;
}

function printMemory(label, value) {
  console.log(`\n${label}`);

  console.log(`  RSS:          ${mb(value.rss)}`);
  console.log(`  Heap used:    ${mb(value.heapUsed)}`);
  console.log(`  Heap total:   ${mb(value.heapTotal)}`);
  console.log(`  External:     ${mb(value.external)}`);
  console.log(`  ArrayBuffers: ${mb(value.arrayBuffers)}`);

  if (value.jsc) {
    console.log(`  JSC heap:     ${mb(value.jsc.heapSize)}`);
    console.log(`  JSC capacity: ${mb(value.jsc.heapCapacity)}`);
    console.log(`  JSC extra:    ${mb(value.jsc.extraMemorySize)}`);
  }

  if (value.memoryFootprint !== undefined) {
    console.log(`  Footprint:    ${mb(value.memoryFootprint)}`);
  }
}

async function profile(fn) {
  // Give the runtime an opportunity to settle before measuring.
  if (typeof globalThis.gc === "function") {
    globalThis.gc();
  }

  const before = memory();

  // resourceUsage().maxRSS is preferable to trying to sample RSS with a
  // timer, because the query may complete faster than our sampling interval.
  const resourceBefore = process.resourceUsage?.();

  const result = await fn();

  const after = memory();
  const resourceAfter = process.resourceUsage?.();

  const maxRSS = resourceAfter?.maxRSS ?? resourceAfter?.maxRss ?? after.rss;

  const maxRSSBefore = resourceBefore?.maxRSS ?? resourceBefore?.maxRss ?? before.rss;

  const peakDelta = Math.max(0, maxRSS - maxRSSBefore);

  printMemory("Before", before);
  printMemory("After", after);

  console.log("\nPeak process memory");
  console.log(`  Max RSS:      ${mb(maxRSS)}`);
  console.log(`  Peak RSS Δ:   ${mb(peakDelta)}`);

  console.log("\nChange");

  console.log(`  RSS:          ${mb(after.rss - before.rss)}`);

  console.log(`  Heap used:    ${mb(after.heapUsed - before.heapUsed)}`);

  console.log(`  Heap total:   ${mb(after.heapTotal - before.heapTotal)}`);

  if (after.jsc) {
    console.log(`  JSC heap:     ${mb(after.jsc.heapSize - before.jsc.heapSize)}`);
  }

  if (after.memoryFootprint !== undefined && before.memoryFootprint !== undefined) {
    console.log(`  Footprint:    ${mb(after.memoryFootprint - before.memoryFootprint)}`);
  }

  return result;
}

console.log(`Benchmark: ${benchName}`);
console.log(`Runtime: ${isBun ? "Bun" : "Node.js"}`);

await profile(async () => {
  const result = query.find(fixture.data);

  if (result.length !== fixture.want.deep) {
    throw new Error(`Unexpected result count: expected ${fixture.want.deep}, got ${result.length}`);
  }

  return result;
});
