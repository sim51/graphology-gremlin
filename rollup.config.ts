import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import eslint from "@rbnlffl/rollup-plugin-eslint";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/graphology-gremlin.esm.min.js",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "lib/graphology-gremlin.umd.min.js",
      format: "umd",
      name: "@react-sigma/core",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [eslint({}), typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: true })],
  external: ["graphology", "lodash", "object-hash"],
};
