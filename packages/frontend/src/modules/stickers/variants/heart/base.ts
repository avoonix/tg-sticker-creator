import { create } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import attribution from "./heart.svg";

export const base = () =>
  createFilter({
    mandatory: false,
    niceness: 0,
    id: "base.heart",
    displayName: "Base",
    inputs: {},
    async apply(sticker, inputs) {
      sticker.finalFrame = 1.2 * 60;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(
            svgToLottie(attribution, { forceAllShapesVisible: true }),
          )
          .addShapeBack(create.transform()),
      );

      const heart = sticker
        .first(["[held-object.heart]"], { match: "indexof" })!
        .cast("GroupShape");
      heart.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        const scale = (s: number) => {
          // 0 = min size, 1 = max size
          const result = s * (102 - 96) + 96;
          return [result, result] as [number, number];
        };
        shape
          .setPosition(create.value(255, 255 + 200))
          .setScale(
            create
              .value(...scale(0.4))
              .addKeyframe(sticker.frameAt(0.05), scale(1))
              .addKeyframe(sticker.frameAt(0.39), scale(0))
              .addKeyframe(sticker.frameAt(0.45), scale(0.6))
              .addKeyframe(sticker.frameAt(0.6), scale(0.4))
              .addKeyframe(sticker.frameAt(1), scale(0.2)),
          )
          .setAnchor(create.value([255, 255 + 200]));
      });

      const head = sticker
        .first(["[head]"], { match: "indexof" })!
        .cast("GroupShape");
      head.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape
          .setPosition(create.value(254, 270))
          .setAnchor(create.value([254, 270]))
          .setRotation(
            create
              .value(-2)
              .addKeyframe(sticker.frameAt(0.5), 2, "easeInOut")
              .addKeyframe(sticker.frameAt(1), -2, "easeInOut"),
          );
      });

      const body = sticker
        .first(["[body]"], { match: "indexof" })!
        .cast("GroupShape");
      body.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape
          .setPosition(create.value(260, 540))
          .setAnchor(create.value([260, 540]))
          .setRotation(
            create
              .value(-2)
              .addKeyframe(sticker.frameAt(0.5), 3, "easeInOut")
              .addKeyframe(sticker.frameAt(1), -2, "easeInOut"),
          );
      });

      setInitialHidden(sticker);

      return sticker;
    },
  });
