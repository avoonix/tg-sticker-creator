import { Coordinate, create, Easing, GroupShape } from "tg-sticker-creator";
import { createFilter } from "./createFilter";

export const createHypnoShape = (args: {
  colors: string[];
  frames: number;
  center: Coordinate;
  nrOfFramesARingIsVisibleFor?: number;
  easing?: Easing;
  modifyGroup?: (g: GroupShape, index: number) => GroupShape;
}) => {
  const group = create.group();
  const nrOfFramesARingIsVisibleFor = args.nrOfFramesARingIsVisibleFor ?? 10;
  const count =
    Math.floor(args.frames / nrOfFramesARingIsVisibleFor / args.colors.length) *
    args.colors.length; // has to be divisible by number of colors to be loopable

  for (let i = -nrOfFramesARingIsVisibleFor; i <= count; i++) {
    const colorIndex =
      (i + nrOfFramesARingIsVisibleFor * 2) % args.colors.length;
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
                (args.frames / count) * (i - 1 + nrOfFramesARingIsVisibleFor),
                [770, 770],
                args.easing ?? "easeInOutCubic",
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

export const hypnoEffect2 = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Hypno (2 Colors)",
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
      ringDuration: {
        type: "number",
        default: 10,
        displayName: "Ring Expansion Rate (Frames)",
        max: 50,
        min: 5,
      },
      easing: {
        type: "easing",
        default: "easeInOut",
        displayName: "Easing",
      },
    },
    async apply(sticker, inputs) {
      sticker.addLayerBack(
        create.shapeLayer().addShapeBack(
          createHypnoShape({
            colors: [inputs.color1, inputs.color2],
            frames: sticker.finalFrame,
            center: [256, 256],
            nrOfFramesARingIsVisibleFor: inputs.ringDuration,
            easing: inputs.easing,
          }),
        ),
      );

      return sticker;
    },
  });

export const hypnoEffect3 = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Hypno (3 Colors)",
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
      color3: {
        type: "color",
        displayName: "Color 3",
        default: "#c78e08",
      },
      ringDuration: {
        type: "number",
        default: 10,
        displayName: "Ring Expansion Rate (Frames)",
        max: 50,
        min: 5,
      },
      easing: {
        type: "easing",
        default: "easeInOut",
        displayName: "Easing",
      },
    },
    async apply(sticker, inputs) {
      sticker.addLayerBack(
        create.shapeLayer().addShapeBack(
          createHypnoShape({
            colors: [inputs.color1, inputs.color2, inputs.color3],
            frames: sticker.finalFrame,
            center: [256, 256],
            nrOfFramesARingIsVisibleFor: inputs.ringDuration,
            easing: inputs.easing,
          }),
        ),
      );

      return sticker;
    },
  });

export const gay = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Gay",
    inputs: {
      ringDuration: {
        type: "number",
        default: 20,
        displayName: "Ring Expansion Rate (Frames)",
        max: 50,
        min: 5,
      },
      easing: {
        type: "easing",
        default: "easeInCubic",
        displayName: "Easing",
      },
    },
    async apply(sticker, inputs) {
      sticker.addLayerBack(
        create.shapeLayer().addShapeBack(
          createHypnoShape({
            colors: ["red", "orange", "yellow", "green", "blue", "purple"],
            frames: sticker.finalFrame,
            center: [256, 256],
            nrOfFramesARingIsVisibleFor: inputs.ringDuration,
            easing: inputs.easing,
          }),
        ),
      );

      return sticker;
    },
  });
