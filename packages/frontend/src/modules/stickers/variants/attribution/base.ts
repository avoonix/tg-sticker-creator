import { create, OffsetKeyframe } from "tg-sticker-creator";
import {
  createFilter,
  setColor,
  setInitialHidden,
  svgToLottie,
} from "../../utilities";
import svg from "./attribution.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.attribution",
    displayName: "Base",
    inputs: {
      primary: {
        type: "color",
        default: "#bf8a0f",
        displayName: "Primary Color",
      },
      secondary: {
        type: "color",
        default: "#000000",
        displayName: "Secondary Color",
      },
    },
    async apply(sticker, inputs) {
      sticker.finalFrame = 3 * 60;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(
            svgToLottie(svg, {
              forceAllShapesVisible: true,
            }),
          )
          .addShapeBack(create.transform()),
      );

      for (const item of sticker.all("[attribution.primary]", {
        match: "indexof",
      })) {
        if (!item.is("GroupShape")) continue;
        setColor(item, inputs.primary, "FillShape");
      }

      for (const item of sticker.all("[attribution.secondary]", {
        match: "indexof",
      })) {
        if (!item.is("GroupShape")) continue;
        setColor(item, inputs.secondary, "FillShape");
      }

      let averageCirclePoints: [number, number] = [100, 100];

      for (const item of sticker.all("[attribution.circle]", {
        match: "indexof",
      })) {
        if (!item.is("GroupShape")) continue;
        item.eachImmediateChildShape((c) => {
          if (!c.is("PathShape")) return;
          const vertices = c.vertices.getValue();
          if (Array.isArray(vertices)) return;
          averageCirclePoints = vertices.points
            .reduce(([x, y], cur) => [x + cur[0], y + cur[1]], [0, 0])
            .map((sum) => sum / vertices.points.length) as [number, number];
        });
      }

      for (const item of sticker.all("[attribution.rotate]", {
        match: "indexof",
      })) {
        if (!item.is("GroupShape")) continue;
        item.eachImmediateChildShape((c) => {
          if (!c.is("TransformShape")) return;

          const rotation = create
            .value(0)
            .addKeyframe(sticker.frameAt(0.6), 0, "ease")
            .addKeyframe(sticker.frameAt(0.7), 10, "ease")
            .addKeyframe(sticker.frameAt(0.8), 0, "ease")
            .addKeyframe(sticker.frameAt(0.9), 10, "ease")
            .addKeyframe(sticker.frameAt(1), 0, "ease");

          c.setPosition(create.value(...averageCirclePoints))
            .setAnchor(create.value(averageCirclePoints))
            .setRotation(rotation);
        });
      }

      setInitialHidden(sticker);

      return sticker;
    },
  });
