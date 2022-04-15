import { create } from "../src";

describe("find", () => {
  describe("first", () => {
    test("space", () => {
      const animation = create.sticker();
      animation.addLayerFront(
        create
          .shapeLayer()
          .addShapeFront(
            create
              .group()
              .setName("mygroup1")
              .addShapeFront(create.ellipse())
              .addShapeFront(create.stroke())
              .addShapeFront(create.transform().setName("test shape 1"))
          )
          .addShapeFront(create.transform())
          .setName("test shape 1")
      );

      expect(animation.first("test shape 1")!.is("ShapeLayer")).toBeTruthy();
      expect(animation.first("test shape 1")!.is("TransformShape")).toBeFalsy();
    });
  });

  describe("all", () => {
    const animation = create.sticker().addLayerFront(
      create
        .shapeLayer()
        .addShapeFront(
          create
            .group()
            .setName("level1")
            .addShapeFront(create.ellipse())
            .addShapeFront(create.stroke())
            .addShapeFront(create.transform().setName("transform0"))
        )
        .addShapeFront(
          create
            .group()
            .setName("level1")
            .addShapeFront(create.ellipse())
            .addShapeFront(create.stroke())
            .addShapeFront(create.transform().setName("transform1"))
        )
        .addShapeFront(create.transform())
        .setName("level0")
    );

    test("strict", () => {
      expect(animation.all("transform")).toHaveLength(0);
      expect(animation.all("transform0")).toHaveLength(1);
    });
    test("indexof", () => {
      expect(animation.all("transform", { match: "indexof" })).toHaveLength(2);
      expect(
        animation.all(["level0", "level1", "transform"], { match: "indexof" })
      ).toHaveLength(2);
      expect(animation.all(["level"], { match: "indexof" })).toHaveLength(3);
    });
    test("multiple indexof matches 1", () => {
      expect(
        animation.all(["level", "transform"], { match: "indexof" })
      ).toHaveLength(2);
    });
  });
});
