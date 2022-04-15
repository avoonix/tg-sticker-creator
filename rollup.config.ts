import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

const rollupConfig = defineConfig([
  {
    plugins: [dts()],
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    output: {
      file: `./lib/tgslib.d.ts`,
      format: "es",
    },
  },
  {
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    plugins: [typescript({ sourceMap: true }), terser()],
    output: [
      {
        sourcemap: true,
        file: "./lib/tgslib.esm.js",
        format: "es",
        exports: "auto",
      },
      {
        sourcemap: true,
        file: "./lib/tgslib.cjs.js",
        format: "cjs",
        exports: "auto",
      },
    ],
  },
  {
    input: "src/index.ts",
    external: [],
    plugins: [typescript({ sourceMap: true }), terser()],
    output: [
      {
        sourcemap: true,
        file: "./lib/tgslib.umd.js",
        format: "umd",
        exports: "auto",
        name: "TgsLib",
        esModule: false,
      },
    ],
  },
]);

export default rollupConfig;
