import { create, ParticleAnimationOptions } from "tg-sticker-creator";
import { createFilter } from "./createFilter";
import { createRandom } from "./random";
import { setColor } from "./setColor";
import sparkleSvg from "./sparkle.svg";
import { svgToLottie } from "./svg";

export const sparkles = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: -1,
    id,
    displayName: "Sparkles",
    inputs: {
      base: {
        type: "color",
        default: "#ffffffff",
        displayName: "Base Color",
      },
      size: {
        type: "number",
        displayName: "Size",
        default: 3,
        min: 50,
        max: 300,
      },
    },
    async apply(sticker, inputs) {
      const centerOffset = 256;

      const sparkles = svgToLottie(sparkleSvg).setName("sparkles");
      sparkles.eachImmediateChildShape((child) => {
        if (child.is("TransformShape")) {
          child
            .setScale(create.value(inputs.size, inputs.size))
            .setAnchor(create.value(centerOffset, centerOffset));
        }
      });

      setColor(
        sparkles.first("sparkle fill")!.cast("GroupShape"),
        inputs.base,
        "FillShape",
      );

      const createConfig = (
        offset: number,
      ): Partial<ParticleAnimationOptions> => ({
        decay: {
          max: (9 / 17) * sticker.finalFrame,
          min: (5 / 17) * sticker.finalFrame,
        },
        emissionEasing: "easeInOut",
        emissionDuration: {
          min: (3 / 17) * sticker.finalFrame,
          max: (5 / 17) * sticker.finalFrame,
        },
        direction: { min: 0, max: 360 },
        emission: { min: 0.1, max: 0.2 },
        startFrame: offset,
        finalEmissionFrame: offset + sticker.finalFrame,
        lifetime: {
          min: (4 / 17) * sticker.finalFrame,
          max: (8 / 17) * sticker.finalFrame,
        },
        velocity: {
          min: (3 / sticker.finalFrame) * 17,
          max: (5 / sticker.finalFrame) * 17,
        },
        random: createRandom("asdf1234"),
        decayEasing: "easeInOut",
        xOffset: { min: -180 + centerOffset, max: 180 + centerOffset },
        yOffset: { min: -180 + centerOffset, max: 180 + centerOffset },
      });

      sticker.addLayerFront(
        create
          .shapeLayer()
          .addShapeFront(create.animation.particles(sparkles, createConfig(0)))
          .addShapeFront(
            create.animation.particles(
              sparkles,
              createConfig(-sticker.finalFrame),
            ),
          )
          .addShapeBack(create.transform())
          .setName("sparkle layer"),
      );

      return sticker;
    },
  });
