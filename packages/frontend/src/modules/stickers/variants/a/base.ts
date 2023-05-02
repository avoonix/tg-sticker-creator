import { create, easings } from "tg-sticker-creator";
import { createFilter, setInitialHidden, svgToLottie } from "../../utilities";
import svg from "./a.svg";

export const base = () =>
  createFilter({
    mandatory: true,
    niceness: 0,
    id: "base.a",
    displayName: "Base",
    inputs: {
      duration: {
        type: "number",
        default: 2 * 60,
        displayName: "Duration (frames)",
        min: 60,
        max: 3 * 60,
      },
      // small: {
      //   type: "boolean",
      //   default: false,
      //   displayName: "Smol",
      // },
      animationStyle: {
        type: "select",
        options: [
          { name: "Spring", value: "spring" },
          { name: "Bounce", value: "bounce" },
          { name: "Bounce (vibrate)", value: "bounce_vibrate" },
        ],
        displayName: "Animation Style",
        default: "spring",
      },
    },
    async apply(sticker, inputs) {
      sticker.finalFrame = inputs.duration;

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(svgToLottie(svg, { forceAllShapesVisible: true })),
      );

      const exclamation = sticker
        .first(["[exclamation]"], { match: "indexof" })!
        .cast("GroupShape");
      exclamation.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape.setOpacity(
          create
            .value(0)
            .addKeyframe(sticker.frameAt(0.4), 0, "ease")
            .addKeyframe(sticker.frameAt(0.55), 100, "ease")
            .addKeyframe(sticker.frameAt(0.95), 100, "ease")
            .addKeyframe(sticker.frameAt(1), 0, "ease"),
        );

        shape
          .setPosition(
            create
              .value(310, 400)
              .addKeyframe(sticker.frameAt(0.55), [430, 430], "jump"),
          )
          .setAnchor(
            create
              .value([310, 400])
              .addKeyframe(sticker.frameAt(0.55), [430, 430], "jump"),
          );

        shape.setScale(
          create
            .value([0, 0])
            .addKeyframe(sticker.frameAt(0.4), [0, 0], "easeInOutExpo")
            .addKeyframe(sticker.frameAt(0.55), [100, 100], "easeInOutExpo")
            .addKeyframe(sticker.frameAt(0.85), [100, 100], "jump")
            .addKeyframe(sticker.frameAt(1), [0, 0], "easeInOutExpo"),
        );
      });

      const head = sticker
        .first(["[head]"], { match: "indexof" })!
        .cast("GroupShape");

      switch (inputs.animationStyle) {
        case "spring":
          head.eachImmediateChildShape((shape) => {
            if (!shape.is("TransformShape")) return;
            shape
              .setPosition(
                create
                  .value(200, 512)
                  .addKeyframe(sticker.frameAt(0.4), [200, 515], "easeInOut")
                  .addKeyframe(sticker.frameAt(0.53), [200, 500], "easeInOut")
                  .addKeyframe(sticker.frameAt(0.6), [200, 512], "easeInOut"),
              )
              .setAnchor(create.value([200, 512]));
            shape.setScale(
              create
                .value([100, 100])
                .addKeyframe(sticker.frameAt(0.4), [100, 99], "easeInOut")
                .addKeyframe(sticker.frameAt(0.53), [100, 101], "easeInOut")
                .addKeyframe(sticker.frameAt(0.6), [100, 100], "easeInOut"),
            );
          });
          break;
        case "bounce":
        case "bounce_vibrate":
          const preDuck = 0.1;
          const postDuck = 0.05;
          const vibrateAmount = 5;
          const ease = easings.easeInOut;
          const vibrateEase = easings.easeInOutExpo;
          const vibrateFrames = 3;

          const position = create
            .value(200, 512)
            .addKeyframe(sticker.frameAt(0.4 - preDuck), [200, 512], ease)
            .addKeyframe(sticker.frameAt(0.4), [200, 530], ease)
            .addKeyframe(sticker.frameAt(0.4 + postDuck), [200, 512], ease);
          if (inputs.animationStyle === "bounce_vibrate") {
            let i = 0;
            const initialPercentage = 0.4 + postDuck;
            while (
              sticker.frameAt(initialPercentage) + i * vibrateFrames <
              sticker.frameAt(0.85 - preDuck)
            ) {
              position.addKeyframe(
                sticker.frameAt(initialPercentage) + i * vibrateFrames,
                [200 + (i % 2 === 0 ? -vibrateAmount : vibrateAmount), 512],
                vibrateEase,
              );
              i++;
            }
          }
          position
            .addKeyframe(sticker.frameAt(0.85 - preDuck), [200, 512], ease)
            .addKeyframe(sticker.frameAt(0.8), [200, 530], ease)
            .addKeyframe(sticker.frameAt(0.85 + postDuck), [200, 512], ease);
          head.eachImmediateChildShape((shape) => {
            if (!shape.is("TransformShape")) return;
            shape.setPosition(position).setAnchor(create.value([200, 512]));
            // shape.setScale(
            //   create
            //     .value([100, 100])
            //       .addKeyframe(sticker.frameAt(0.4 - duckDelay), [100, 100],  ease)
            //       .addKeyframe(sticker.frameAt(0.4), [100, 100],  ease)
            //       .addKeyframe(sticker.frameAt(0.4 + duckDelay), [100, 100],  ease)
            //       .addKeyframe(sticker.frameAt(0.85 - duckDelay), [100, 100],  ease)
            //       .addKeyframe(sticker.frameAt(0.8), [100, 100],  ease)
            //       .addKeyframe(sticker.frameAt(0.85 + duckDelay), [100, 100],  ease),
            // );
          });
          break;
        default:
          console.log("unknown option", inputs.animationStyle);
      }

      const frame1 = sticker
        .first(["[muzzle-frame-1]"], { match: "indexof" })!
        .cast("GroupShape");
      const frame2 = sticker
        .first(["[muzzle-frame-2]"], { match: "indexof" })!
        .cast("GroupShape");

      frame1.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape.setOpacity(
          create
            .value(100)
            .addKeyframe(sticker.frameAt(0.4), 0, "jump")
            .addKeyframe(sticker.frameAt(0.85), 100, "jump"),
        );
      });

      frame2.eachImmediateChildShape((shape) => {
        if (!shape.is("TransformShape")) return;
        shape.setOpacity(
          create
            .value(0)
            .addKeyframe(sticker.frameAt(0.4), 100, "jump")
            .addKeyframe(sticker.frameAt(0.85), 0, "jump"),
        );
      });

      setInitialHidden(sticker);

      return sticker;
    },
  });
