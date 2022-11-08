import { create, easings } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import svg from "./halloween.svg";

export const base = () =>
  createFilter({
    mandatory: false,
    niceness: 0,
    id: "base.halloween",
    displayName: "Base",
    inputs: {
      // base: {
      //   type: "color",
      //   default: "#0000ff",
      //   displayName: "Base Color",
      // },
    },
    async apply(sticker, inputs) {
      sticker.finalFrame = 3 * 60;

      const easing = easings.easeOutBack;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(svgToLottie(svg, { forceAllShapesVisible: true }))
          .addShapeBack(create.transform()),
      );

      for (const m of sticker.all(["[peek.moving]"], { match: "indexof" })) {
        const movingObject = m.cast("GroupShape");

        movingObject.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          // const scale = (s: number) => {
          //   // 0 = min size, 1 = max size
          //   const result = s * (102 - 96) + 96;
          //   return [result, result] as [number, number];
          // };
          shape.setPosition(
            create
              .value(0, 0)
              .addKeyframe(sticker.frameAt(0.3), [0, 0])
              .addKeyframe(sticker.frameAt(0.6), [0, -100], easing)
              .addKeyframe(sticker.frameAt(0.7), [0, -100])
              .addKeyframe(sticker.frameAt(1), [0, 0], "ease"),
          );
          //   .setScale(
          //     create
          //       .value(...scale(0.4))
          //       .addKeyframe(sticker.frameAt(0.05), scale(1))
          //       .addKeyframe(sticker.frameAt(0.39), scale(0))
          //       .addKeyframe(sticker.frameAt(0.45), scale(0.6))
          //       .addKeyframe(sticker.frameAt(0.6), scale(0.4))
          //       .addKeyframe(sticker.frameAt(1), scale(0.2)),
          //   )
        });
      }

      const frame1 = sticker.all(["Frame 1"]);
      const frame2 = sticker.all(["Frame 2"]);

      const boooStart = 0.38;
      const boooEnd = 0.72;

      for (const group of frame1) {
        group.cast("GroupShape").eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape.setOpacity(
            create
              .value(100)
              .addKeyframe(sticker.frameAt(boooStart), 0, "jump")
              .addKeyframe(sticker.frameAt(boooEnd), 100, "jump"),
          );
        });
      }

      for (const group of frame2) {
        group.cast("GroupShape").eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape.setOpacity(
            create
              .value(0)
              .addKeyframe(sticker.frameAt(boooStart), 100, "jump")
              .addKeyframe(sticker.frameAt(boooEnd), 0, "jump"),
          );
        });
      }

      setInitialHidden(sticker);

      return sticker;
    },
  });
