/**
 * @jest-environment node
 */
import Benchmark from "benchmark";
import fs from "fs";
import path from "path";
import { create } from "./src";

const tgs = fs.readFileSync(path.join(__dirname, "sticker1.json"), {
  encoding: "utf-8",
});

const sticker = create.stickerFromTgs(tgs);

const suite = new Benchmark.Suite("tgslib", {
  maxTime: 60000,
});

suite
  .add("parse", function () {
    create.stickerFromTgs(tgs);
  })
  .add("stringify", function () {
    sticker.toTgsString();
  })
  .add("clone", function () {
    sticker.clone();
  })
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log(suite);
  })
  .run({ async: true });
