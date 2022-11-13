import tinycolor from "tinycolor2";
import { createFilter } from "./createFilter";

/**
 * https://github.com/oliver-moran/jimp/blob/master/packages/plugin-color/src/index.js
 */
const greyscale = (color: tinycolor.Instance) => {
  const grey =
    0.2126 * color.toRgb().r +
    0.7152 * color.toRgb().g +
    0.0722 * color.toRgb().b;
  return tinycolor({
    r: grey,
    g: grey,
    b: grey,
  });
};

const clamp = (val: number, min = 0, max = 255) =>
  val < min ? min : val > max ? max : val;

/**
 * https://github.com/oliver-moran/jimp/blob/master/packages/plugin-color/src/index.js
 *
 * contrast -1 to +1
 */
const contrast = (color: tinycolor.Instance, contrast: number) => {
  const factor = (contrast + 1) / (1 - contrast);
  const adjust = (value: number) => {
    value = Math.floor(factor * (value - 127) + 127);
    return clamp(value);
  };

  return tinycolor({
    r: adjust(color.toRgb().r),
    g: adjust(color.toRgb().g),
    b: adjust(color.toRgb().b),
  });
};

/**
 * https://github.com/oliver-moran/jimp/blob/master/packages/plugin-color/src/index.js
 *
 */
const sepia = (color: tinycolor.Instance) => {
  const rgb = color.toRgb();
  return tinycolor({
    r: clamp(rgb.r * 0.393 + rgb.g * 0.769 + rgb.b * 0.189),
    g: clamp(rgb.r * 0.349 + rgb.g * 0.686 + rgb.b * 0.168),
    b: clamp(rgb.r * 0.272 + rgb.g * 0.534 + rgb.b * 0.131),
  });
};

export const colors = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Color Filter",
    inputs: {
      saturation: {
        displayName: "Saturation",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
      },
      brightness: {
        displayName: "Brightness",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
      },
      contrast: {
        displayName: "Contrast",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
      },
      spin: {
        displayName: "Spin",
        type: "number",
        default: 0,
        min: -360,
        max: 360,
      },
      sepia: { displayName: "Sepia", type: "boolean", default: false },
      greyscale: { displayName: "Greyscale", type: "boolean", default: false },
    },
    async apply(sticker, inputs) {
      sticker.eachChildShape((shape) => {
        if (!shape.is("FillShape") && !shape.is("StrokeShape")) {
          return;
        }
        const curColor = shape.color.getValue();
        if (Array.isArray(curColor) || shape.color.animated) {
          throw new Error("cannot deal with animated colors yet"); // TODO: deal with animated colors
        }
        let c = tinycolor.fromRatio({
          r: curColor.rgbArray()[0],
          g: curColor.rgbArray()[1],
          b: curColor.rgbArray()[2], // TODO: RgbaValue.r, .g, .b methods/getters
        });
        const sat = inputs.saturation;
        if (sat > 0) {
          c = c.saturate(Math.abs(sat));
        } else {
          c = c.desaturate(Math.abs(sat));
        }

        const b = inputs.brightness;
        if (b > 0) {
          c = c.lighten(Math.abs(b));
        } else {
          c = c.darken(Math.abs(b));
        }

        c = c.spin(inputs.spin);

        c = contrast(c, inputs.contrast / 100);

        if (inputs.sepia) {
          c = sepia(c);
        }

        if (inputs.greyscale) {
          c = greyscale(c);
        }

        shape.color.setValue(c.toHex8String());

        // TODO: AnimatableGradient
      });
      return sticker;
    },
  });
