import cloneDeep from "lodash.clonedeep";
import tinycolor, { type Instance } from "tinycolor2";
import { hasMixin } from "ts-mixer";
import {
  BezierValues,
  classes,
  convertEasing,
  Coordinate,
  Easing,
  EllipseShape,
  FillShape,
  GradientFillShape,
  GradientStrokeShape,
  GroupShape,
  LottieItem,
  MergeShape,
  PathShape,
  RectShape,
  RepeaterShape,
  RgbaStopValue,
  RgbaValue,
  RoundedCornersShape,
  SerializationError,
  Shape,
  ShapeType,
  StarShape,
  StrokeShape,
  TransformShape,
  TrimShape
} from "./internal";

export const createBezier = (
  easingName: Easing,
  dimensions: number,
  array: boolean
) => {
  const bezierIn = new BezierValues();
  const bezierOut = new BezierValues();
  const easing = convertEasing(easingName);
  if (array) {
    bezierOut.bezierXAxis = new Array(dimensions).fill(easing.x1);
    bezierOut.bezierYAxis = new Array(dimensions).fill(easing.y1);
    bezierIn.bezierXAxis = new Array(dimensions).fill(easing.x2);
    bezierIn.bezierYAxis = new Array(dimensions).fill(easing.y2);
  } else {
    bezierOut.bezierXAxis = easing.x1;
    bezierOut.bezierYAxis = easing.y1;
    bezierIn.bezierXAxis = easing.x2;
    bezierIn.bezierYAxis = easing.y2;
  }
  return {
    bezierIn,
    bezierOut,
  };
};

/**
 * @internal
 */
export const randInt = () => Math.floor(Math.random() * 100000);

/**
 * @internal
 */
export const assertNever = (arg: never) => {
  throw new Error(`expected ${arg} to be never`);
};

/**
 * object without any non-serializable values
 */
export type JsonValue =
  | string
  | number
  | boolean
  | JsonObject
  | JsonArray
  | undefined
  | null;

/**
 * object without any non-serializable values
 */
export type JsonObject = {
  [idx: string]: JsonValue;
};

/**
 * object without any non-serializable values
 */
export type JsonArray = Array<JsonValue>;

export type ClassNames = keyof typeof classes;

export type Class<T> =
  | (abstract new (...args: any[]) => T)
  | (new (...args: any[]) => T);

export type CancellableCallback<T> = (
  item: T,
  cancel: () => void,
  parents: LottieItem[]
) => void;

export interface EachOptions {
  /**
   * @internal
   */
  parents?: LottieItem[];
}

/**
 * Fancy instanceof
 * @param instance
 * @param class_
 * @returns
 */
export const isClass = <T extends abstract new (...args: any) => any>(
  instance: any,
  class_: T
): instance is InstanceType<T> => {
  return hasMixin(instance, class_ as any);
};

/**
 * Verify that `value` is an array and every array element is instance of `class_` or the array is empty
 * @param val
 * @returns
 */
export const isClassArray = <T extends abstract new (...args: any) => any>(
  array: any,
  class_: T
): array is InstanceType<T>[] => {
  if (!Array.isArray(array)) {
    return false;
  }
  if (!array.length) {
    return true;
  }
  for (const item of array) {
    if (!isClass(item, class_)) {
      return false;
    }
  }
  return true;
};

export const colorFromTinycolor = (instance: Instance) => {
  const rgb = instance.toRgb();
  return new RgbaValue([rgb.r / 255, rgb.g / 255, rgb.b / 255, rgb.a]);
};

export const colorFromString = (color: string) => {
  return colorFromTinycolor(tinycolor(color));
};

export const stopFromTinycolor = (
  instance: Instance,
  stop: number
) => {
  const rgb = instance.toRgb();
  return new RgbaStopValue(
    [rgb.r / 255, rgb.g / 255, rgb.b / 255, rgb.a],
    stop
  );
};

export const stopFromString = (color: string, stop: number) => {
  return stopFromTinycolor(tinycolor(color), stop);
};

export function toInstance<Plain extends JsonValue, Instance>(
  value: Plain,
  converter: Converter<Plain, Instance>,
  defaultValue: Instance
): Instance {
  if (typeof value === "undefined") return defaultValue;
  return converter.toInstance(value);
}

const numberBoolean: Converter<number, boolean> = {
  toPlain(value) {
    return value ? 1 : 0;
  },
  toInstance(value) {
    return !!value;
  },
};

const string: Converter<string, string> = {
  toPlain(value) {
    return value;
  },
  toInstance(value) {
    return value;
  },
};

const boolean: Converter<boolean, boolean> = {
  toPlain(value) {
    return value;
  },
  toInstance(value) {
    return value;
  },
};

const number: Converter<number, number> = {
  toPlain(value, options) {
    return toPrecision(value, options.precision);
  },
  toInstance(value) {
    return value;
  },
};

const pass = <T extends JsonValue>(): Converter<T, T> => ({
  toPlain(value) {
    return cloneDeep(value);
  },
  toInstance(value) {
    return cloneDeep(value);
  },
});

const array = <P extends JsonValue, I>(
  c: Converter<P, I>
): Converter<P[], I[]> => ({
  toInstance(val) {
    if (!Array.isArray(val)) throw new SerializationError("array expected");
    return val.map((v) => {
      const instance = c.toInstance(v);
      return instance;
    });
  },
  toPlain(value, options) {
    return value.map((v) => c.toPlain(v, options));
  },
});

const numberOrNumberArray: Converter<number | number[], number | number[]> = {
  toInstance(val) {
    if (!Array.isArray(val)) return Number(val);
    return val.map((v) => Number(v));
  },
  toPlain(value, options) {
    if (!Array.isArray(value)) return toPrecision(value, options.precision);
    return value.map((v) => toPrecision(v, options.precision));
  },
};

const coordinate: Converter<Coordinate, Coordinate> = {
  toInstance(val) {
    return val;
  },
  toPlain(value, options) {
    if (value && (value as any).length === 3) return value; // TODO: why the heck does this sometimes have length 3?
    return [
      toPrecision(value[0], options.precision),
      toPrecision(value[1], options.precision),
    ];
  },
};

const optional = <P extends JsonValue, I>(
  c: Converter<P, I>
): Converter<P | undefined, I | undefined> => ({
  toInstance(val) {
    if (typeof val === "undefined") return undefined;
    return c.toInstance(val);
  },
  toPlain(value, options) {
    if (typeof value === "undefined") return undefined;
    return c.toPlain(value, options);
  },
});

const multiple = <
  P extends JsonValue,
  I extends { type: string | number },
  Keys extends string
>(c: {
  [key in Keys]: Converter<P, I>;
}): Converter<P, I> => ({
  toInstance(val) {
    const prop = "ty";
    if (typeof val !== "object")
      throw new SerializationError("object expected");
    const type = (val as any)[prop] as Keys;
    if (!c[type]) throw new SerializationError("missing object type");
    return c[type].toInstance(val);
  },
  toPlain(value, options) {
    const prop = "type";
    const type = (value as any)[prop] as Keys;
    if (!c[type]) throw new SerializationError("unknown object type " + value);
    return c[type].toPlain(value, options);
  },
});

export const converters = {
  numberBoolean,
  string,
  number,
  boolean,
  array,
  multiple,
  pass,
  optional,
  numberOrNumberArray,
  coordinate,
};
export interface Converter<Plain extends JsonValue, Instance> {
  toPlain(value: Instance, options: ToPlainOptions): Plain;
  toInstance(value: Plain): Instance;
}

export function toPlain<Plain extends JsonValue, Instance>(
  value: Instance,
  converter: Converter<Plain, Instance>,
  options: ToPlainOptions
): Plain {
  if (!converter.toPlain)
    throw new SerializationError(`can't convert ${value} to plain`);
  return converter.toPlain(value, options);
}

export const shapeConverter = (): Converter<JsonValue[], Shape[]> =>
  converters.array(
    converters.multiple<JsonValue, Shape, string>({
      [ShapeType.shape]: PathShape,
      [ShapeType.fill]: FillShape,
      [ShapeType.stroke]: StrokeShape,
      [ShapeType.group]: GroupShape,
      [ShapeType.transform]: TransformShape,
      [ShapeType.ellipse]: EllipseShape,
      [ShapeType.rect]: RectShape,
      [ShapeType.star]: StarShape,
      [ShapeType.merge]: MergeShape,
      [ShapeType.repeater]: RepeaterShape,
      [ShapeType.trim]: TrimShape,
      [ShapeType.gradientFill]: GradientFillShape,
      [ShapeType.gradientStroke]: GradientStrokeShape,
      [ShapeType.roundedCorners]: RoundedCornersShape,
    })
  );

export interface ToPlainOptions {
  /**
   * numbers are rounded to `precision` decimal places. Set to `Infinity` to disable rounding
   */
  precision: number;
}

export const toPrecision = (num: number, precision: number) =>
  isFinite(precision)
    ? Math.round(num * 10 ** precision) / 10 ** precision
    : num;

export const toPrecisionArray = <T extends number[]>(
  arr: T,
  precision: number
): T => arr.map((v) => toPrecision(v, precision)) as T;
