import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

/** @type {import("rollup-plugin-terser").Options} */
const terserOptions = {
  format: {
    comments: false,
  },
  mangle: true,
  keep_classnames: true,
  toplevel: true,
};

const rollupConfig = defineConfig([
  {
    plugins: [dts()],
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    output: {
      file: `./lib/tg-sticker-creator.d.ts`,
      format: "es",
    },
  },
  {
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    plugins: [typescript({ sourceMap: true }), terser(terserOptions)],
    output: [
      {
        sourcemap: true,
        file: "./lib/tg-sticker-creator.esm.js",
        format: "es",
        exports: "auto",
      },
      {
        sourcemap: true,
        file: "./lib/tg-sticker-creator.cjs.js",
        format: "cjs",
        exports: "auto",
      },
    ],
  },
  {
    input: "src/index.ts",
    external: [],
    plugins: [nodeResolve(), commonjs(), typescript({ sourceMap: true }), terser(terserOptions)],
    output: [
      {
        sourcemap: true,
        file: "./lib/tg-sticker-creator.umd.js",
        format: "umd",
        exports: "auto",
        name: "TgStickerCreator",
        esModule: false,
      },
    ],
  },
]);

export default rollupConfig;
