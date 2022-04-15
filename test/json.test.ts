import fs from "fs";
import path from "path";
import snapshotDiff from "snapshot-diff";
import { create } from "../src";

const sticker1 = fs.readFileSync(path.join(__dirname, "sticker1.json"), {
  encoding: "utf-8",
});

describe("json", () => {
  it("can stringify sticker multiple times", () => {
    const animation = create.stickerFromTgs(sticker1);
    const plain1 = animation.toPlain({ precision: Infinity });
    const plain2 = animation.toPlain({ precision: Infinity });
    expect(snapshotDiff(plain1, plain2)).toMatchSnapshot();
  });
  it("can parse sticker multiple times", () => {
    const first = create.stickerFromTgs(sticker1);
    const second = create.stickerFromTgs(sticker1);
    expect(snapshotDiff(first, second)).toMatchSnapshot();
  });
  it("can stringify and parse sticker multiple times", () => {
    const parsedOnce = create.stickerFromTgs(sticker1);
    const parsedTwice = create.stickerFromTgs(
      create.stickerFromTgs(sticker1).toTgsString({ precision: Infinity })
    );
    expect(snapshotDiff(parsedOnce, parsedTwice)).toMatchSnapshot();
  });
  it("imports correctly", () => {
    const animation = create.stickerFromTgs(sticker1);
    expect(
      snapshotDiff(
        JSON.parse(sticker1),
        JSON.parse(JSON.stringify(animation.toPlain({ precision: Infinity })))
      )
    ).toMatchSnapshot();
  });
});
