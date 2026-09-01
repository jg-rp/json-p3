// @ts-nocheck

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

export default defineConfig([
  {
    files: ["**/*.{js,ts}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      sonarjs.configs.recommended,
    ],
    rules: {
      "sonarjs/no-unused-vars": "off",
      "sonarjs/arguments-order": "off",
      "sonarjs/pseudo-random": "off",
      "sonarjs/prefer-specific-assertions": "off",
      "sonarjs/parameterized-tests": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [
      "lib",
      "dist",
      "jest.config.js",
      "benchmark",
      "tests/browser",
      "docs",
      "tests/path/cts",
      "performance/index.js",
    ],
  },
]);
