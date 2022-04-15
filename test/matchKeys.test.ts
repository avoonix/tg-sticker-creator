import { parsePath } from "../src/core/matchKeys";
import { create } from "../src";

const createAnimation = () =>
  create
    .sticker()
    .addLayerFront(
      create
        .shapeLayer()
        .addShapeFront(
          create
            .group()
            .setName("my group")
            .addShapeFront(create.rect().setName("rect"))
            .addShapeFront(create.stroke().setName("stroke"))
            .addShapeFront(create.transform().setName("transform"))
        )
    );

describe("matchKeys", () => {
  test("parsePath", () => {
    expect(parsePath([])).toEqual(["**"]);
    expect(parsePath(["*"])).toEqual(["**", "*"]);
    expect(parsePath(["rect"])).toEqual(["**", "rect"]);
    expect(parsePath(["rect", "**", "fill"])).toEqual([
      "**",
      "rect",
      "**",
      "fill",
    ]);
    expect(parsePath("rect ** fill")).toEqual(["**", "rect", "**", "fill"]);
    expect(parsePath("rect * fill")).toEqual(["**", "rect", "*", "fill"]);
  });

  test("keyPath single", () => {
    const animation = createAnimation();
    const acc = animation.all(["my group", "rect"]);
    expect(acc).toHaveLength(1);
    expect(acc[0].is("RectShape")).toBeTruthy();
  });

  test("keyPath multiple", () => {
    const animation = createAnimation();
    const acc = animation.all(["my group", "*"]);
    expect(acc).toHaveLength(3);
  });
});
