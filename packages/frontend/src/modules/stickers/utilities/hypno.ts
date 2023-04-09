import { Coordinate, create, GroupShape } from "tg-sticker-creator";
import { createFilter } from "./createFilter";

export const createHypnoShape = (args: {
  colors: string[];
  frames: number;
  center: Coordinate;
  modifyGroup?: (g: GroupShape, index: number) => GroupShape;
}) => {
  const group = create.group();
  const visibleAtSameTime = 10;
  const count =
    Math.floor(args.frames / visibleAtSameTime / args.colors.length) *
    args.colors.length; // has to be divisible by number of colors to be loopable

  for (let i = -visibleAtSameTime; i <= count; i++) {
    const colorIndex = (i + visibleAtSameTime * 2) % args.colors.length;
    let g = create
      .group()
      .addShapeBack(
        create
          .ellipse()
          .setSize(
            create
              .value([0, 0])
              .toAnimated((args.frames / count) * (i - 1))
              .addKeyframe(
                (args.frames / count) * (i - 1 + visibleAtSameTime),
                [770, 770],
                "easeInOutCubic",
              ),
          )
          .setPosition(create.value(...args.center)),
      )
      .addShapeBack(
        create.fill().setColor(create.color(args.colors[colorIndex])),
      )
      .addShapeBack(create.transform());

    if (args.modifyGroup) {
      g = args.modifyGroup(g, colorIndex);
    }

    group.addShapeFront(g);
  }
  return group.addShapeBack(create.transform());
};

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
      sticker.addLayerBack(
        create.shapeLayer().addShapeBack(
          createHypnoShape({
            colors: [inputs.color1, inputs.color2],
            frames: sticker.finalFrame,
            center: [256, 256],
          }),
        ),
      );

      return sticker;
    },
  });
