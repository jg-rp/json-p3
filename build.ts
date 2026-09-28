// Use `bun run dist` to build distribution bundles and emit types.
import { readFileSync } from "fs";

import pkg from "./package.json" with { type: "json" };

const license = readFileSync("./LICENSE", { encoding: "utf8" });

const banner = `/*
 * json-p3 version ${pkg.version}
 * https://github.com/jg-rp/json-p3
 * 
 * ${license.split("\n").join("\n * ")}
 */`;

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
  minify: false,
  naming: "[dir]/json-p3.esm.[ext]",
  banner,
  define: {
    NODE_ENV: "production",
  },
});

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
  minify: true,
  naming: "[dir]/json-p3.esm.min.[ext]",
  banner,
  define: {
    NODE_ENV: "production",
  },
});

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "browser",
  format: "esm",
  external: [],
  minify: false,
  naming: "[dir]/json-p3.browser.esm.[ext]",
  banner,
  define: {
    "process.env.RUNTIME": '"browser"',
    NODE_ENV: "production",
  },
});

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "browser",
  format: "esm",
  external: [],
  minify: true,
  naming: "[dir]/json-p3.browser.esm.min.[ext]",
  banner,
  define: {
    "process.env.RUNTIME": '"browser"',
    NODE_ENV: "production",
  },
});
