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
        startFrame: number,
      ): Partial<ParticleAnimationOptions> => ({
        decay: {
          max: sticker.frameAt(0.1),
          min: sticker.frameAt(0.1),
        },
        emissionEasing: "easeInOut",
        emissionDuration: {
          min: sticker.frameAt(0.1),
          max: sticker.frameAt(0.1),
        },
        direction: { min: -45, max: -135 },
        emission: { min: 1, max: 4 },
        startFrame,
        finalEmissionFrame: startFrame + sticker.frameAt(0.1),
        lifetime: {
          min: sticker.frameAt(0.1),
          max: sticker.frameAt(0.1),
        },
        velocity: {
          min: 10 / sticker.frameAt(0.1),
          max: 10 / sticker.frameAt(0.1),
        },
        random: createRandom("asdf1234"),
        decayEasing: "easeInOut",
        xOffset: { min: -50 + centerOffset, max: 150 + centerOffset },
        yOffset: { min: -50 + centerOffset, max: 150 + centerOffset },
      });

      const layer = create
        .shapeLayer()
        .addShapeFront(
          create.animation.particles(
            heartGroup,
            createConfig(sticker.frameAt(0.0)),
          ),
        )
        // .addShapeFront(
        //   create.animation.particles(
        //     heartGroup,
        //     createConfig(sticker.frameAt(0.2 - 1)),
        //   ),
        // )
        .addShapeBack(create.transform());

      sticker.addLayerFront(layer);

      // console.log(layer);

      return sticker;
    },
  });
