export type EasingArray = [number, number, number, number];

/**
 * Easing presets collected from https://github.com/ai/easings.net/blob/master/src/easings.yml, MDN and Chrome DevTools
 */
export type EasingName =
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "easeInSine"
  | "easeOutSine"
  | "easeInOutSine"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart"
  | "easeInQuint"
  | "easeOutQuint"
  | "easeInOutQuint"
  | "easeInExpo"
  | "easeOutExpo"
  | "easeInOutExpo"
  | "easeInCirc"
  | "easeOutCirc"
  | "easeInOutCirc"
  | "easeInBack"
  | "easeOutBack"
  | "easeInOutBack"
  | "easeFastOutSlowIn"
  | "easeFastOutLinearIn"
  | "easeLinearOutSlowIn";

/**
 * Easings 
 * 
 * Bezier handles encoded as `[x1, y1, x2, y2]` - the same as `cubic-bezier(x1, y1, x2, y2)` in css
 */
export const easings: { [name in EasingName]: EasingArray } = {
  linear: [0, 0, 1, 1],

  // https://github.com/ai/easings.net/blob/master/src/easings.yml
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],

  // mdn
  ease: [0.25, 0.1, 0.25, 1.0],
  easeIn: [0.42, 0.0, 1.0, 1.0],
  easeInOut: [0.42, 0.0, 0.58, 1.0],
  easeOut: [0.0, 0.0, 0.58, 1.0],

  // chrome devtools
  easeFastOutSlowIn: [0.4, 0, 0.2, 1],
  easeFastOutLinearIn: [0.4, 0, 1, 1],
  easeLinearOutSlowIn: [0, 0, 0.2, 1],
};

/**
 * Either a predefined easing name or a custom bezier easing encoded as array: `[x1, y1, x2, y2]`
 */
export type Easing = EasingArray | EasingName;

export const convertEasing = (name: Easing) => {
  const values = typeof name === "string" ? easings[name] : name;
  if (!values) {
    throw new Error(`no such easing: ${name}`);
  }
  return {
    x1: values[0] as number,
    y1: values[1] as number,
    x2: values[2] as number,
    y2: values[3] as number,
  };
};
