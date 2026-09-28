import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests_browser/**/*.browsertest.ts"],
    environment: "node",
  },
});
