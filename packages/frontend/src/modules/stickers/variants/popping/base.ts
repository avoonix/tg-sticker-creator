import { create, easings } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import popping from "./popping.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.popping",
    displayName: "Base",
    inputs: {},
    async apply(sticker, inputs) {
      sticker.finalFrame = 18;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .setName("root")
          .addShapeBack(svgToLottie(popping, { forceAllShapesVisible: true }))
          .addShapeBack(create.transform()),
      );

      const frame1 = sticker.first(["Frame 1"])!.cast("GroupShape");
      const frame2 = sticker.first(["Frame 2"])!.cast("GroupShape");

      frame1.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape.setOpacity(
          create
            .value(100)
            .addKeyframe(sticker.frameAt(0.4), 100)
            .addKeyframe(sticker.frameAt(0.401), 0)
            .addKeyframe(sticker.frameAt(1), 0),
        );
      });

      frame2.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape.setOpacity(
          create
            .value(0)
            .addKeyframe(sticker.frameAt(0.399), 0)
            .addKeyframe(sticker.frameAt(0.4), 100)
            .addKeyframe(sticker.frameAt(1), 100),
        );
      });

      const zoomEasing = easings.easeInOutExpo;
      const zoomValue = 105;

      sticker
        .first(["root"])
        ?.cast("ShapeLayer")
        .setTransform(
          create
            .layerTransform()
            .setAnchor(create.value([310, 360]))
            .setPosition(create.value(310, 360))
            .setScale(
              create
                .value([zoomValue, zoomValue])
                .toAnimated(sticker.frameAt(-0.05))
                .addKeyframe(sticker.frameAt(0.05), [100, 100], zoomEasing)
                .addKeyframe(sticker.frameAt(0.35), [100, 100], zoomEasing)
                .addKeyframe(
                  sticker.frameAt(0.45),
                  [zoomValue, zoomValue],
                  zoomEasing,
                )
                .addKeyframe(
                  sticker.frameAt(0.95),
                  [zoomValue, zoomValue],
                  zoomEasing,
                )
                .addKeyframe(sticker.frameAt(1.05), [100, 100], zoomEasing),
            ),
        );

      setInitialHidden(sticker);

      return sticker;
    },
  });
