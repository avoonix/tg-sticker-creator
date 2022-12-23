import { create } from "tg-sticker-creator";
import { createFilter } from "./createFilter";

export const hypno = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Hypno",
    inputs: {
      color1: {
        type: "color",
        displayName: "Color 1",
        default: "#a17206",
      },
      color2: {
        type: "color",
        displayName: "Color 2",
        default: "#dba62c",
      },
    },
    async apply(sticker, inputs) {
      const group = create.group();
      const visibleAtSameTime = 10;
      const count = Math.floor(sticker.finalFrame / visibleAtSameTime);

      for (let i = -visibleAtSameTime; i <= count; i++) {
        group.addShapeFront(
          create
            .group()
            .addShapeBack(
              create.ellipse().setSize(
                create
                  .value([0, 0])
                  .toAnimated((sticker.finalFrame / count) * (i - 1))
                  .addKeyframe(
                    (sticker.finalFrame / count) * (i - 1 + visibleAtSameTime),
                    [770, 770],
                    "easeInOutCubic",
                  ),
              ),
            )
            .addShapeBack(
              create
                .fill()
                .setColor(
                  i % 2
                    ? create.color(inputs.color1)
                    : create.color(inputs.color2),
                ),
            )
            .addShapeBack(create.transform()),
        );
      }

      sticker.addLayerBack(
        create
          .shapeLayer()
          .addShapeBack(group.addShapeBack(create.transform())),
      );

      return sticker;
    },
  });
