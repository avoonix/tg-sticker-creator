import { createFilter } from "./createFilter";
import { ColorInputDefinition } from "./input";
import { setColor } from "./setColor";
import { setHidden } from "./setHidden";

export const complexShape = (
  id: string,
  displayName: string,
  paths: {
    makeVisible: string[][];
    colorable: {
      path: string[][];
      name: string;
      defaultColor: any;
      type: "FillShape" | "StrokeShape";
    }[];
  }[],
) =>
  createFilter({
    mandatory: false,
    niceness: 0,
    id,
    displayName,
    inputs: Object.fromEntries(
      paths.flatMap((path) =>
        path.colorable.map((colorable) => [
          colorable.name,
          {
            type: "color",
            default: colorable.defaultColor,
            displayName: colorable.name,
          } as ColorInputDefinition,
        ]),
      ),
    ),
    async apply(sticker, inputs) {
      // const inputBuilder = new InputBuilder<string, { [x: string]: string }>({});
      // for (const path of paths) {
      //   for (const { name, defaultColor } of path.colorable) {
      //     inputBuilder.createColorInput(name, defaultColor);
      //   }
      // }
      // const inputs = inputBuilder;
      for (const path of paths) {
        const items = path.makeVisible.flatMap((query) =>
          sticker.all(query, {
            match: "indexof",
          }),
        );
        for (const item of items) {
          const group = item.cast("GroupShape");
          setHidden(group, false);

          for (const { path: itemPath, type, name } of path.colorable) {
            for (const itPath of itemPath) {
              for (const g of group.all(itPath, { match: "indexof" })) {
                const casted = g.cast("GroupShape");
                setColor(casted, inputs[name], type);
                setHidden(casted, false);
              }
            }
          }
        }
      }

      return sticker;
    },
  });
