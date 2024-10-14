import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./test/**/*.ts"],
    exclude: ["./test/utils.ts"],
    coverage: {
      provider: "istanbul",
    },
  },
});
