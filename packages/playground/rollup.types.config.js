import dts from "rollup-plugin-dts";

const config = [
  {
    input: "./node_modules/tg-sticker-creator/lib/tg-sticker-creator.d.ts",
    output: [{ file: "generated/tg-sticker-creator.d.ts", format: "es" }],
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
];

export default config;
