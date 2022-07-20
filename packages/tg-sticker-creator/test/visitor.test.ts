import { create } from "../src";

describe("visitor", () => {
  test("shapes", () => {
    const animation = create.sticker();
    animation.addLayerFront(
      create
        .shapeLayer()
        .addShapeFront(
          create
            .group()
            .addShapeFront(create.ellipse())
            .addShapeFront(create.stroke())
            .addShapeFront(create.transform())
        )
        .addShapeFront(create.transform())
    );

    animation.eachChildShape((shape, _, parents) => {
      if (shape.is("StrokeShape")) {
        expect(parents).toHaveLength(3);
      }
    });

    //   const visitor = {
    //     visitLayer: jest.fn(),
    //     visitLottie: jest.fn(),
    //     visitShape: jest.fn(),
    //   };

    //   animation.visitChildren(visitor);

    //   expect(visitor.visitLayer.mock.calls.length).toBe(1);
    //   expect(visitor.visitLayer.mock.calls[0][1]).toHaveLength(1);
    //   expect(visitor.visitShape.mock.calls.length).toBe(5);
    //   expect(visitor.visitShape.mock.calls[0][1]).toHaveLength(2);
    //   expect(visitor.visitLottie.mock.calls.length).toBe(1);
    //   expect(visitor.visitLottie.mock.calls[0][1]).toHaveLength(0);
  });

  test("fuzzy", () => {
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
            .addShapeFront(create.transform().setName("testshape1"))
        )
        .addShapeFront(create.transform())
    );

    expect(animation.first("testshape1")!.is("TransformShape")).toBeTruthy();
    expect(animation.first("testshape2")).toBeNull();
    expect(() => animation.first("mygroup1")!.cast("GroupShape")).not.toThrow();
  });
});
