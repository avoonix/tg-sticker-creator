import { create, easings } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import svg from "./hug.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.hug",
    displayName: "Base",
    inputs: {},
    async apply(sticker, inputs) {
      sticker.setAuthor("Avoonix");

      sticker.finalFrame = 3 * 60;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(svgToLottie(svg, { forceAllShapesVisible: true }))
          .addShapeBack(create.transform()),
      );

      const easing = easings.easeInOut;

      for (const shape of sticker.all(["[arms.regular]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([339, 253]))
            .setPosition(create.value(339, 253))
            .setScale(
              create
                .value([108, 98])
                .addKeyframe(sticker.frameAt(0.2), [108, 98], easing)
                .addKeyframe(sticker.frameAt(0.3), [100, 100], easing)
                .addKeyframe(sticker.frameAt(0.7), [100, 100], easing)
                .addKeyframe(sticker.frameAt(0.9), [108, 98], easing)
                .addKeyframe(sticker.frameAt(1), [108, 98], easing),
            );
        });
      }

      for (const shape of sticker.all(["[ych]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([209, 505]))
            .setPosition(
              create
                .value(209 - 5, 505)
                .addKeyframe(sticker.frameAt(0.2), [209 - 5, 505], easing)
                .addKeyframe(sticker.frameAt(0.3), [209 - 0, 505], easing)
                .addKeyframe(sticker.frameAt(0.7), [209 - 0, 505], easing)
                .addKeyframe(sticker.frameAt(0.9), [209 - 5, 505], easing)
                .addKeyframe(sticker.frameAt(1), [209 - 5, 505], easing),
            )
            .setRotation(
              create
                .value(-1)
                .addKeyframe(sticker.frameAt(0.2), -1, easing)
                .addKeyframe(sticker.frameAt(0.3), 0, easing)
                .addKeyframe(sticker.frameAt(0.7), 0, easing)
                .addKeyframe(sticker.frameAt(0.9), -1, easing)
                .addKeyframe(sticker.frameAt(1), -1, easing),
            );
        });
      }

      for (const shape of sticker.all(["[hugger]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([280, 505]))
            .setPosition(create.value(280, 505))
            .setRotation(
              create
                .value(2)
                .addKeyframe(sticker.frameAt(0.2), 2, easing)
                .addKeyframe(sticker.frameAt(0.3), 0, easing)
                .addKeyframe(sticker.frameAt(0.7), 0, easing)
                .addKeyframe(sticker.frameAt(0.9), 2, easing)
                .addKeyframe(sticker.frameAt(1), 2, easing),
            );
        });
      }

      for (const shape of sticker.all(["[moving-tail-ych]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([191, 431]))
            .setPosition(create.value(191, 431))
            .setRotation(
              create
                .value(8)
                .addKeyframe(sticker.frameAt(0.2), 8, easing)
                .addKeyframe(sticker.frameAt(0.3), 0, easing)
                .addKeyframe(sticker.frameAt(0.7), 0, easing)
                .addKeyframe(sticker.frameAt(0.9), 8, easing)
                .addKeyframe(sticker.frameAt(1), 8, easing),
            );
        });
      }

      for (const shape of sticker.all(["[tail]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([331, 426]))
            .setPosition(create.value(331, 426))
            .setRotation(
              create.animation.blink(create.value(8), {
                easing: "easeInOutCubic",
                startFrame: 0,
                duration: 181,
                from: 8,
                to: -8,
                interval: 30,
              }),
            );
          // console.log(shape);
        });
      }

      for (const shape of sticker.all(["[head]"], {
        match: "indexof",
      })) {
        const group = shape.cast("GroupShape");

        const rotation = create.value(0);
        for (let i = 0; i < 7; ++i) {
          rotation.addKeyframe(
            sticker.frameAt(0.2 + 0.1 * i),
            i % 2 ? -3 : 0,
            "ease",
          );
        }

        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setAnchor(create.value([290, 230]))
            .setPosition(create.value(290, 230))
            .setRotation(
              rotation,
            );
        });
      }

      setInitialHidden(sticker);

      return sticker;
    },
  });
