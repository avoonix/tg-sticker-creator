import { create, Shape } from "tg-sticker-creator";
import { combineLotties } from "./combineLotties";
import { createFilter } from "./createFilter";

export const recolorShape = (color: string) => (shape: Shape) =>
  (shape.is("FillShape") || shape.is("StrokeShape")) &&
  shape.color.setValue(color);

export const outline = (id: string) =>
  createFilter({
    mandatory: false, // TODO: mandatory?
    niceness: 5,
    id,
    displayName: "Outline",
    inputs: {
      width: {
        type: "number",
        displayName: "Width",
        default: 10,
        min: 0,
        max: 50,
      },
      color: {
        type: "color",
        default: "#ffffff",
        displayName: "Color",
      },
    },
    async apply(sticker, inputs) {
      const clone = sticker.clone();
      const recolor = recolorShape(inputs.color);
      clone.eachChildShape((shape) => {
        recolor(shape);
        if (shape.is("StrokeShape")) {
          const currentWidth = shape.width.getValue();
          if (typeof currentWidth === "number") {
            shape.setWidth(create.value(currentWidth + inputs.width));
          } else {
            // TODO: handle animated
            throw new Error("expected stroke width to be number");
          }
        }
      });
      // clone.eachChildShape(shape => {
      //   if(shape.is("GroupShape")) {
      //     shape.addShapeBack(create.roundedCorners().setRadius(create.value(50)))
      //     // shape.addShapeFront(create.roundedCorners().setRadius(create.value(50)))
      //   }
      // })
      combineLotties(sticker, clone); // TODO: parameter to decide whether to add as top or bottom layers
      return sticker;
    },
  });
