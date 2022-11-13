import { create } from "tg-sticker-creator";
import { createFilter } from "./createFilter";

export const strokeWidth = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 1,
    id,
    displayName: "Stroke Width",
    inputs: {
      multiplier: {
        type: "number",
        displayName: "Multiplier",
        default: 2,
        min: 0.5,
        max: 4,
      },
    },
    async apply(sticker, inputs) {
      sticker.eachChildShape((shape) => {
        if (shape.is("StrokeShape")) {
          const currentWidth = shape.width.getValue();
          if (typeof currentWidth === "number") {
            shape.setWidth(create.value(currentWidth * inputs.multiplier));
          } else {
            throw new Error("expected stroke width to be number");
          }
        }
      });

      return sticker;
    },
  });
