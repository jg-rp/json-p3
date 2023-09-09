import { readFileSync } from "fs";
import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const name = "jsonp3"; // TODO: think about name for browser namespace
const licence = readFileSync("./LICENCE", { encoding: "utf8" });

const banner = `/*
 * json-p3 version ${pkg.version}
 * https://github.com/jg-rp/json-p3
 * 
 * ${licence.split("\n").join("\n * ")}
 */`;

const replaceVersionNumber = {
  delimiters: ["", ""],
  include: "./src/index.ts",
  preventAssignment: true,
  __VERSION__: pkg.version,
};

const nodeBundles = {
  input: "./src/index.ts",
  external: [],
  plugins: [
    replace(replaceVersionNumber),
    // Allows node_modules resolution
    resolve({ extensions }),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],

  output: [
    {
      file: pkg.main,
      format: "cjs",
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      banner,
    },
  ],
};

const browserBundles = {
  input: "./src/index.ts",
  external: [],
  plugins: [
    replace(replaceVersionNumber),
    // Allows node_modules resolution
    resolve({ extensions }),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],

  output: [
    {
      file: pkg.browser,
      format: "iife",
      name,
      banner,
    },
    {
      file: pkg["browser-min"],
      format: "iife",
      name,
      plugins: [terser()],
      sourcemap: true,
      banner,
    },
  ],
};

export default [nodeBundles, browserBundles];
