import { create } from "../src";

describe("clone", () => {
  test("mixins", () => {
    const lottie = create.sticker();

    for (let i = 0; i < 10; ++i) {
      lottie.addLayerFront(
        create
          .shapeLayer()
          .addShapeBack(create.rect())
          .addShapeBack(create.stroke())
          .addShapeBack(create.fill())
          .addShapeBack(create.transform())
      );
    }

    const cloned = lottie.clone();

    expect(cloned).toEqual(lottie);
  });
});
