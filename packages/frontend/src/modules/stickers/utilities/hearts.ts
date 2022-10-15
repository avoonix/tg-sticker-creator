import { create, ParticleAnimationOptions } from "tg-sticker-creator";
import { createFilter } from "./createFilter";
import heart from "./heart.svg";
import { createRandom } from "./random";
import { setColor } from "./setColor";
import { svgToLottie } from "./svg";

export const hearts = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: -1,
    id,
    displayName: "Hearts",
    inputs: {
      color: {
        type: "color",
        displayName: "Heart Color",
        default: "#ff0000",
      },
      size: {
        type: "number",
        displayName: "Heart Size",
        default: 100,
        min: 50,
        max: 300,
      },
    },
    async apply(sticker, inputs) {
      const centerOffset = 256;

      const heartGroup = svgToLottie(heart);
      heartGroup.eachImmediateChildShape((child) => {
        if (child.is("TransformShape")) {
          child
            .setScale(create.value(inputs.size, inputs.size))
            .setAnchor(create.value(centerOffset, centerOffset));
        }
      });
      setColor(heartGroup, inputs.color, "FillShape");

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
        direction: { min: -45, max: -135 },
        emission: { min: 1, max: 8 },
        startFrame: 0 + offset,
        finalEmissionFrame: 3 + offset,
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
        xOffset: { min: -50 + centerOffset, max: 150 + centerOffset },
        yOffset: { min: -50 + centerOffset, max: 150 + centerOffset },
      });

      const startPercentage = 0.2;

      sticker.addLayerFront(
        create
          .shapeLayer()
          .addShapeFront(
            create.animation.particles(
              heartGroup,
              createConfig(sticker.finalFrame * startPercentage),
            ),
          )
          .addShapeFront(
            create.animation.particles(
              heartGroup,
              createConfig(
                -sticker.finalFrame + sticker.finalFrame * startPercentage,
              ),
            ),
          )
          .addShapeBack(create.transform()),
      );

      return sticker;
    },
  });
