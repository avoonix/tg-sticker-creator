import snapshotDiff from "snapshot-diff";
import { create } from "../src";

describe("stringify", () => {
  it("returns valid lottie animation", () => {
    const animation = create.sticker();
    const plain = animation.toPlain({ precision: Infinity });
    const stringified = JSON.stringify(plain, null, 2);
    expect(stringified).toMatchSnapshot();

    expect(
      snapshotDiff(create.stickerFromPlain(JSON.parse(stringified)), animation)
    ).toMatchSnapshot();
  });

  it("returns valid lottie animation with layers", () => {
    const animation = create
      .sticker()
      .addLayerBack(create.shapeLayer().setName("layer 1").setIndex(1))
      .addLayerBack(create.solidLayer().setName("layer 2").setIndex(2))
      .addLayerBack(create.nullLayer().setName("layer 3").setIndex(3));
    const plain = animation.toPlain({ precision: Infinity });
    const stringified = JSON.stringify(plain, null, 2);
    expect(stringified).toMatchSnapshot();

    expect(
      snapshotDiff(
        create
          .stickerFromPlain(JSON.parse(stringified))
          .toPlain({ precision: Infinity }),
        animation.toPlain({ precision: Infinity })
      )
    ).toMatchSnapshot();
  });

  it("returns valid lottie animation with layers and shapes", () => {
    const animation = create
      .sticker()
      .addLayerBack(
        create
          .shapeLayer()
          .setName("layer 1")
          .setIndex(1)
          .addShapeBack(
            create
              .group()
              .setName("group")
              .setIndex(1)
              .addShapeBack(create.transform().setName("transform").setIndex(2))
          )
      )
      .addLayerBack(create.solidLayer().setName("layer 2").setIndex(2))
      .addLayerBack(create.nullLayer().setName("layer 3").setIndex(3));
    const plain = animation.toPlain({ precision: Infinity });
    const stringified = JSON.stringify(plain, null, 2);
    expect(stringified).toMatchSnapshot();

    expect(
      snapshotDiff(
        create
          .stickerFromPlain(JSON.parse(stringified))
          .toPlain({ precision: Infinity }),
        animation.toPlain({ precision: Infinity })
      )
    ).toMatchSnapshot();
  });
});
