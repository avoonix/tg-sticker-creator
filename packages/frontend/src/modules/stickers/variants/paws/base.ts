import { create, easings } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import svg from "./paws.svg";

export const base = () =>
  createFilter({
    mandatory: false,
    niceness: 0,
    id: "base.paws",
    displayName: "Base",
    inputs: {
      motion: {
        displayName: "Motion",
        type: "select",
        options: [
          { name: "Minimal", value: "min" },
          { name: "Medium", value: "med" },
          { name: "Opposite Minimal", value: "oppositeMin" },
          { name: "Opposite Medium", value: "oppositeMed" },
        ],
        default: "med",
      },
    },
    async apply(sticker, inputs) {
      sticker.finalFrame = 3 * 60;

      const easing = easings.ease;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(svgToLottie(svg, { forceAllShapesVisible: true }))
          .addShapeBack(create.transform()),
      );

      const variants: Record<string, { right: number[]; left: number[] }> = {
        min: { right: [0, -3], left: [0, -3] },
        med: { right: [0, -6], left: [0, -6] },
        oppositeMin: { right: [-4, 0], left: [0, -4] },
        oppositeMed: { right: [-5, 5], left: [3, -5] },
      };

      const variant = variants[inputs.motion];

      for (const m of sticker.all(["[right-foot]"], { match: "indexof" })) {
        const movingObject = m.cast("GroupShape");

        movingObject.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setPosition(create.value(-120, 150))
            .setAnchor(create.value([-120, 150]));
          shape.setRotation(
            create
              .value(variant.right[0])
              .addKeyframe(sticker.frameAt(0.5), variant.right[1], easing)
              .addKeyframe(sticker.frameAt(1), variant.right[0], easing),
          );
        });
      }

      for (const m of sticker.all(["[left-foot]"], { match: "indexof" })) {
        const movingObject = m.cast("GroupShape");

        movingObject.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setPosition(create.value(-210, 260))
            .setAnchor(create.value([-210, 260]));
          shape.setRotation(
            create
              .value(variant.left[0])
              .addKeyframe(sticker.frameAt(0.5), variant.left[1], easing)
              .addKeyframe(sticker.frameAt(1), variant.left[0], easing),
          );
        });
      }

      setInitialHidden(sticker);

      return sticker;
    },
  });
