import tinycolor from "tinycolor2";
import { createFilter } from "./createFilter";
import { Lottie } from "tg-sticker-creator";

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

const applyColorFilter = (
  sticker: Lottie,
  filter: (c: tinycolor.Instance) => tinycolor.Instance,
) =>
  sticker.eachChildShape((shape) => {
    if (!shape.is("FillShape") && !shape.is("StrokeShape")) {
      return;
    }
    const curColor = shape.color.getValue();
    if (Array.isArray(curColor) || shape.color.animated) {
      throw new Error("cannot deal with animated colors yet"); // TODO: deal with animated colors
    }
    const color = tinycolor.fromRatio({
      r: curColor.rgbArray()[0],
      g: curColor.rgbArray()[1],
      b: curColor.rgbArray()[2], // TODO: RgbaValue.r, .g, .b methods/getters
    });

    shape.color.setValue(filter(color).toHex8String());

    // TODO: AnimatableGradient
  });

export const saturationFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Saturation",
    inputs: {
      saturation: {
        displayName: "Saturation",
        type: "number",
        default: -10,
        min: -100,
        max: 100,
      },
    },
    async apply(sticker, inputs) {
      const sat = inputs.saturation;
      return applyColorFilter(sticker, (c) => {
        if (sat > 0) {
          return c.saturate(Math.abs(sat));
        }
        return c.desaturate(Math.abs(sat));
      });
    },
  });

export const brightnessFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Brightness",
    inputs: {
      brightness: {
        displayName: "Brightness",
        type: "number",
        default: 5,
        min: -100,
        max: 100,
      },
    },
    async apply(sticker, inputs) {
      return applyColorFilter(sticker, (c) => {
        if (inputs.brightness > 0) {
          return c.lighten(Math.abs(inputs.brightness));
        }
        return c.darken(Math.abs(inputs.brightness));
      });
    },
  });

export const contrastFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Contrast",
    inputs: {
      contrast: {
        displayName: "Contrast",
        type: "number",
        default: 10,
        min: -100,
        max: 100,
      },
    },
    async apply(sticker, inputs) {
      return applyColorFilter(sticker, (c) => {
        return contrast(c, inputs.contrast / 100);
      });
    },
  });

export const spinFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Color Spin",
    inputs: {
      spin: {
        displayName: "Spin",
        type: "number",
        default: 180,
        min: -360,
        max: 360,
      },
    },
    async apply(sticker, inputs) {
      return applyColorFilter(sticker, (c) => {
        return c.spin(inputs.spin);
      });
    },
  });

export const sepiaFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Sepia",
    inputs: {},
    async apply(sticker, inputs) {
      return applyColorFilter(sticker, (c) => {
        return sepia(c);
      });
    },
  });

export const greyscaleFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Greyscale",
    inputs: {},
    async apply(sticker, inputs) {
      return applyColorFilter(sticker, (c) => {
        return greyscale(c);
      });
    },
  });

// color mix + saturation + contrast can be used to create nice pastel colors
export const colorMixFilter = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: 6,
    id,
    displayName: "Color Mix",
    inputs: {
      color: {
        displayName: "Color",
        type: "color",
        default: "#ff0000",
      },
      amount: {
        displayName: "Amount",
        type: "number",
        default: 10,
        min: 0,
        max: 100,
        step: 0.1,
      },
      mode: {
        displayName: "Mode",
        type: "select",
        default: "sqrt",
        options: [
          {
            name: "tinycolor",
            value: "tinycolor",
          },
          {
            name: "square root",
            value: "sqrt",
          },
        ],
      },
    },
    async apply(sticker, inputs) {
      switch (inputs.mode) {
        case "sqrt":
          const blend = (a: number, b: number, t: number) =>
            Math.sqrt((1 - t) * (a / 255) ** 2 + t * (b / 255) ** 2) * 255;
          const blendAlpha = (a: number, b: number, t: number) =>
            (1 - t) * a + t * b;
          const col1 = tinycolor(inputs.color).toRgb(); // 0-255

          return applyColorFilter(sticker, (c) => {
            const col0 = c.toRgb();
            return tinycolor({
              r: blend(col0.r, col1.r, inputs.amount / 100),
              g: blend(col0.g, col1.g, inputs.amount / 100),
              b: blend(col0.b, col1.b, inputs.amount / 100),
              a: blendAlpha(col0.a, col1.a, inputs.amount / 100),
            });
          });
        case "tinycolor":
          return applyColorFilter(sticker, (c) =>
            tinycolor.mix(c, inputs.color, inputs.amount),
          );
        default:
          console.error("invalid mode");
          return sticker;
      }
    },
  });
