import { create, Easing } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import headpatsSvg from "./headpats.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.headpats",
    displayName: "Base",
    inputs: {
      duration: {
        type: "number",
        default: 300,
        displayName: "Duration (ms)",
        min: 100,
        max: 1000,
      },
    },
    async apply(sticker, inputs) {
      sticker.setAuthor("Avoonix");

      sticker.finalFrame = Math.round((inputs.duration / 1000) * 60);

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(
            svgToLottie(headpatsSvg, { forceAllShapesVisible: true }),
          )
          .addShapeBack(create.transform()),
      );

      const handParts = [
        sticker.first("hand front", { match: "indexof" })!.cast("GroupShape"),
        sticker.first("hand back", { match: "indexof" })!.cast("GroupShape"),
      ];

      const offsetY = 50;

      const easing: Easing = "ease";

      for (const handPart of handParts) {
        handPart.eachImmediateChildShape(
          (shape) =>
            shape.is("TransformShape") &&
            shape.setPosition(
              create
                .value(0, offsetY)
                .addKeyframe(sticker.frameAt(0.5), [0, offsetY + 150], easing)
                .addKeyframe(sticker.frameAt(1), [0, offsetY], easing),
            ),
        );
      }

      sticker
        .first("thumb")!
        .cast("GroupShape")
        .eachImmediateChildShape((shape) => {
          if (shape.is("TransformShape")) {
            shape
              .setRotation(
                create
                  .value(0)
                  .addKeyframe(sticker.frameAt(0.2), 20, easing)
                  .addKeyframe(sticker.frameAt(0.4), 0, easing)
                  .addKeyframe(sticker.frameAt(1), 0, easing),
              )
              .setAnchor(create.value(175, 220))
              .setPosition(create.value(175, 220));
          }
        });
      // .addShapeFront(

      //   create
      //     .group()
      //     .addShapeBack(create.ellipse().setSize(create.value([30, 30])).setPosition(create.value(175, 220)))
      //     .addShapeBack(create.fill().setColor(create.color("red")))
      //     .addShapeBack(
      //       create
      //         .stroke()
      //         .setColor(create.color("black"))
      //         .setWidth(create.value(20))
      //     )
      //     .addShapeBack(create.transform())

      // )

      sticker
        .first("blob")!
        .cast("GroupShape")
        .eachImmediateChildShape(
          (shape) =>
            shape.is("TransformShape") &&
            shape
              .setAnchor(create.value([330, 500]))
              .setPosition(create.value(330, 500))
              .setScale(
                create
                  .value([100, 100])
                  .toAnimated(sticker.frameAt(0.2))
                  .addKeyframe(sticker.frameAt(0.5), [130, 70], easing)
                  .addKeyframe(sticker.frameAt(0.75), [130, 70], easing)
                  .addKeyframe(
                    sticker.frameAt(1),
                    [100, 100],
                    "easeInOutQuint",
                  ),
              ),
        );

      setInitialHidden(sticker);

      return sticker;
    },
  });
