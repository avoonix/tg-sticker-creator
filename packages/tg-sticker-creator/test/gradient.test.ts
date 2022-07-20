import { create } from "../src";

describe("gradient", () => {
  test("serialize/deserialize static", () => {
    const gradient = create.gradientFill().setName("gradient");
    const animation = create
      .sticker()
      .addLayerFront(create.shapeLayer().addShapeBack(gradient));
    const deserialized = create.stickerFromTgs(
      animation.toTgsString({ precision: Infinity })
    );
    expect(
      deserialized.first("gradient")!.toPlain({ precision: Infinity })
    ).toEqual(gradient.toPlain({ precision: Infinity }));
  });
  test("serialize/deserialize animated", () => {
    const gradient = create
      .gradientFill()
      .setName("gradient")
      .setGradient(
        create
          .gradient([
            create.stop("yellow", 0),
            create.stop("green", 0.5),
            create.stop("#10101010", 1),
          ])
          .addKeyframe(
            10,
            [
              create.stop("yellow", 0),
              create.stop("#10101010", 0.8),
              create.stop("blue", 1),
            ],
            "easeFastOutLinearIn"
          )
      );
    const animation = create
      .sticker()
      .addLayerFront(create.shapeLayer().addShapeBack(gradient));
    const deserialized = create.stickerFromTgs(
      animation.toTgsString({ precision: Infinity })
    );
    expect(
      deserialized.first("gradient")!.toPlain({ precision: Infinity })
    ).toEqual(gradient.toPlain({ precision: Infinity }));
  });
});
