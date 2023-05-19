import { create, easings, MatteMode } from "tg-sticker-creator";
import {
  createFilter,
  createHypnoShape,
  getAveragePathPosition,
  setInitialHidden,
  svgToLottie,
} from "../../utilities";
import svg from "./plushie.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.plushie",
    displayName: "Base",
    inputs: {
      duration: {
        type: "number",
        default: 150,
        displayName: "Duration (frames)",
        min: 30,
        max: 3 * 60,
      },
      hypno: {
        type: "boolean",
        displayName: "Hypnotised",
        default: true,
      },
    },
    async apply(sticker, inputs) {
      sticker.finalFrame = inputs.duration;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .setName("root")
          .addShapeBack(svgToLottie(svg, { forceAllShapesVisible: true }))
          .addShapeBack(create.transform()),
      );

      const leg1 = 3 / 4;
      const leg3 = 2 / 4;
      const leg2 = 1 / 4;
      const leg4 = 0 / 4;
      const legs = {
        // positive rotation = forward
        // walk cycle: right rear (leg4), right front (leg2), left rear (leg3), left front (leg1)
        "[plushie-leg1]": {
          pivot: [180, 365],
          cycle: {
            floorTouchStart: 0 + leg1,
            moveForwardStart: 5 / 7 + leg1,
            moveBackStart: 6 / 7 + leg1,
          },
        },
        "[plushie-leg2]": {
          pivot: [185, 365],
          cycle: {
            floorTouchStart: 0 + leg2,
            moveForwardStart: 5 / 7 + leg2,
            moveBackStart: 6 / 7 + leg2,
          },
        },
        "[plushie-leg3]": {
          pivot: [320, 370],
          cycle: {
            floorTouchStart: 0 + leg3,
            moveForwardStart: 5 / 7 + leg3,
            moveBackStart: 6 / 7 + leg3,
          },
        },
        "[plushie-leg4]": {
          pivot: [310, 365],
          cycle: {
            floorTouchStart: 0 + leg4,
            moveForwardStart: 5 / 7 + leg4,
            moveBackStart: 6 / 7 + leg4,
          },
        },
      } as const;

      const easing = easings.linear;

      for (const [
        leg,
        {
          pivot: [x, y],
          cycle,
        },
      ] of Object.entries(legs)) {
        const group = sticker
          .first([leg], { match: "indexof" })
          ?.cast("GroupShape");

        const forwardMovement = 10;

        const rotation = create
          .value(0)
          .toAnimated(sticker.frameAt(cycle.floorTouchStart - 1))
          .addKeyframe(sticker.frameAt(cycle.moveForwardStart - 1), -30, easing)
          .addKeyframe(
            sticker.frameAt(cycle.moveBackStart - 1),
            forwardMovement,
            easing,
          )
          .addKeyframe(sticker.frameAt(cycle.floorTouchStart), 0, "linear")
          .addKeyframe(sticker.frameAt(cycle.moveForwardStart), -30, easing)
          .addKeyframe(
            sticker.frameAt(cycle.moveBackStart),
            forwardMovement,
            easing,
          )
          .addKeyframe(sticker.frameAt(cycle.floorTouchStart + 1), 0, "linear")
          .addKeyframe(sticker.frameAt(cycle.moveForwardStart + 1), -30, easing)
          .addKeyframe(
            sticker.frameAt(cycle.moveBackStart + 1),
            forwardMovement,
            easing,
          );

        if (!group) throw new Error(`group "${leg}" not found`);
        group.eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape.setPosition(create.value(x, y)).setAnchor(create.value([x, y]));
          shape.setRotation(rotation);
        });
      }

      const floorWidth = 80;

      const floorContainer = sticker
        .first(["[floor-container]"], { match: "indexof" })
        ?.cast("GroupShape");
      const floor = sticker
        .first(["[floor]"], { match: "indexof" })
        ?.cast("GroupShape");
      if (!floorContainer || !floor) throw new Error("missing shapes");

      const createParallaxLayer = (speed: number, y: number) => {
        for (let i = 0; i < sticker.width + floorWidth; i += floorWidth) {
          floorContainer.addShapeFront(
            floor.clone().eachImmediateChildShape((shape) => {
              if (!shape.is("TransformShape")) return;
              shape.setPosition(
                create
                  .value(i, y)
                  .addKeyframe(
                    sticker.frameAt(1),
                    [i + floorWidth * speed, y],
                    "linear",
                  ),
              );
            }),
          );
        }
      };

      createParallaxLayer(1, 0);

      const lerp = (a: number, b: number, amount: number) =>
        (1 - amount) * a + amount * b;

      sticker
        .first(["[plushie-tail]"], { match: "indexof" })
        ?.cast("GroupShape")
        .eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          const cycleStart = 6.2;
          shape
            .setPosition(create.value(330, 320))
            .setAnchor(create.value([330, 320]))
            .setRotation(
              create
                .value(-10)
                .toAnimated(sticker.frameAt(cycleStart / 7 + leg4 - 1))
                .addKeyframe(
                  sticker.frameAt(
                    lerp(
                      cycleStart / 7 + leg4 - 1,
                      cycleStart / 7 + leg3 - 1,
                      0.5,
                    ),
                  ),
                  0,
                  "easeInOut",
                )
                .addKeyframe(
                  sticker.frameAt(cycleStart / 7 + leg3 - 1),
                  -10,
                  "easeInOut",
                )
                .addKeyframe(
                  sticker.frameAt(
                    lerp(cycleStart / 7 + leg4, cycleStart / 7 + leg3 - 1, 0.5),
                  ),
                  0,
                  "easeInOut",
                )
                .addKeyframe(
                  sticker.frameAt(cycleStart / 7 + leg4),
                  -10,
                  "easeInOut",
                )
                .addKeyframe(
                  sticker.frameAt(
                    lerp(cycleStart / 7 + leg4, cycleStart / 7 + leg3, 0.5),
                  ),
                  0,
                  "easeInOut",
                ),
            );
        });

      sticker
        .first(["[plushie-leash]"], { match: "indexof" })
        ?.cast("GroupShape")
        .eachImmediateChildShape((shape) => {
          if (!shape.is("TransformShape")) return;
          shape
            .setPosition(create.value(105, 355))
            .setAnchor(create.value([105, 355]))
            .setRotation(
              create
                .value(0)
                .toAnimated(sticker.frameAt(0))
                .addKeyframe(sticker.frameAt(0.5), -5, "easeInOut")
                .addKeyframe(sticker.frameAt(1), 0, "easeInOut"),
            );
        });

      if (inputs.hypno) {
        const topLayerShapes = [
          ...sticker.all(["[eye-outline]"], {
            match: "indexof",
          }),
          ...sticker.all([".pupil]"], {
            match: "indexof",
          }),
          // ...  sticker.all([".iris]"], {
          //   match: "indexof",
          // }),
        ].map((i) => i.cast("GroupShape"));

        const topLayer = create.shapeLayer();
        for (const outline of topLayerShapes) {
          topLayer.addShapeBack(outline);
        }
        topLayer.addShapeBack(create.transform());

        for (const eyeShape of sticker.all(["[eyes.open]"], {
          match: "indexof",
        })) {
          const eye = eyeShape.cast("GroupShape");
          const pupil = eye
            .first(".pupil]", {
              match: "indexof",
            })!
            .cast("GroupShape");

          const side = pupil.name?.includes("left") ? "left" : "right";

          const averageCirclePoints = getAveragePathPosition(pupil);

          const layer1 = create
            .shapeLayer()
            .addShapeBack(
              createHypnoShape({
                colors: ["red", "green"],
                frames: sticker.finalFrame,
                center: averageCirclePoints,
                modifyGroup: (g, i) =>
                  g.setName(
                    [
                      "[plushie.eyes]",
                      // `[eyes.open.${side}.background]`,
                      // `[eyes.open.${side}.pupil]`,
                      `[eyes.open.${side}.iris]`,
                    ][i],
                  ),
              }),
            )
            .addShapeBack(create.transform());

          const layer2 = create
            .shapeLayer()
            .addShapeBack(eye)
            .addShapeBack(create.transform());

          layer1.matteMode = MatteMode.Alpha;

          sticker.addLayerFront(layer1).addLayerFront(layer2);
        }

        sticker.addLayerFront(topLayer);
      }

      setInitialHidden(sticker);

      return sticker;
    },
  });
