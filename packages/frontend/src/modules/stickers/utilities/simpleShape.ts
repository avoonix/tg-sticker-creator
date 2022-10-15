import { createFilter, VisibleFunc } from "./createFilter";
import { setColor } from "./setColor";
import { setHidden } from "./setHidden";

export const simpleShape = (args: {
  id: string;
  displayName: string;
  paths: (string | string[])[];
  visible: VisibleFunc;
  mandatory: boolean;
  defaultColor: string;
  defaultPaletteId?: number;
}) =>
  createFilter({
    ...args,
    niceness: 0,
    inputs: {
      fill: {
        type: "color",
        displayName: "Fill Color",
        default: args.defaultColor,
        defaultPaletteId: args.defaultPaletteId,
      },
    },
    async apply(sticker, inputs) {
      for (const path of args.paths) {
        for (const item of sticker.all(path, { match: "indexof" })) {
          const group = item.cast("GroupShape");
          setColor(group, inputs.fill, "FillShape");
          setHidden(group, false);
        }
      }

      return sticker;
    },
  });
