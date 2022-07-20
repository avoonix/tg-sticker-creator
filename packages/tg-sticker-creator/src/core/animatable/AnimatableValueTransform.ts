import {
  ColorKeyframe,
  Converter,
  Coordinate,
  GradientKeyframe,
  JsonArray,
  JsonValue,
  OffsetKeyframe,
  Path,
  PathKeyframe,
  plainToStops,
  RgbaStopValue,
  RgbaValue,
  stopsToPlain
} from "../internal";
import { converters, JsonObject, toPrecisionArray } from "../util";

const animatableGradientConverter = (
  count: number
): Converter<JsonArray, RgbaStopValue[] | GradientKeyframe[]> => ({
  toInstance(value) {
    if (typeof value[0] !== "number") {
      return value.map((keyframe) =>
        GradientKeyframe.toInstance(keyframe, count)
      );
    }
    return plainToStops(value as any, count);
  },
  toPlain(value, options) {
    if (value[0] instanceof GradientKeyframe) {
      return (value as GradientKeyframe[]).map((v) =>
        GradientKeyframe.toPlain(v, count, options)
      );
    }
    return toPrecisionArray(
      stopsToPlain(value as RgbaStopValue[]),
      options.precision
    );
  },
});

const pathConverter = (): Converter<JsonValue, Path | PathKeyframe[]> => ({
  toInstance(value) {
    if (Array.isArray(value)) {
      return value.map((keyframe) => PathKeyframe.toInstance(keyframe as JsonObject));
    }
    return Path.toInstance(value as JsonObject);
  },
  toPlain(value, options) {
    if (Array.isArray(value)) {
      return value.map((v) => PathKeyframe.toPlain(v, options));
    }
    return Path.toPlain(value, options);
  },
});

const twoDimensionValueConverter = (): Converter<
  JsonArray,
  Coordinate | OffsetKeyframe[]
> => ({
  toInstance(value) {
    if (typeof value[0] !== "number") {
      return value.map((keyframe) => OffsetKeyframe.toInstance(keyframe as JsonObject));
    }
    return converters.coordinate.toInstance(value as any);
  },
  toPlain(value, options) {
    if (typeof value[0] !== "number") {
      return (value as OffsetKeyframe[]).map((v) =>
        OffsetKeyframe.toPlain(v, options)
      );
    }
    return converters.coordinate.toPlain(value as any, options);
  },
});

const oneDimensionValueConverter = (): Converter<
  JsonValue,
  number | OffsetKeyframe[]
> => ({
  toInstance(value) {
    if (Array.isArray(value) && typeof value[0] !== "number") {
      return value.map((keyframe) => OffsetKeyframe.toInstance(keyframe as JsonObject));
    }
    return value as number;
  },
  toPlain(value, options) {
    if (Array.isArray(value) && typeof value[0] !== "number") {
      return (value as OffsetKeyframe[]).map((v) =>
        OffsetKeyframe.toPlain(v, options)
      );
    }
    return converters.number.toPlain(value as number, options);
  },
});

const animatableColorConverter = (): Converter<
  JsonValue,
  RgbaValue | ColorKeyframe[]
> => ({
  toInstance(value) {
    if (Array.isArray(value) && typeof value[0] !== "number") {
      return value.map((keyframe) => ColorKeyframe.toInstance(keyframe as JsonObject));
    }
    return new RgbaValue(value as any);
  },
  toPlain(value, options) {
    if (Array.isArray(value) && typeof value[0] !== "number") {
      return (value as ColorKeyframe[]).map((v) =>
        ColorKeyframe.toPlain(v, options)
      );
    }
    return toPrecisionArray((value as RgbaValue).values(), options.precision);
  },
});

const rgbaStopConverter = (
  count: number
): Converter<number[], RgbaStopValue[]> => ({
  toInstance(value) {
    return plainToStops(value, count);
  },
  toPlain(stops, options) {
    return toPrecisionArray(stopsToPlain(stops), options.precision);
  },
});

const rgbaValueConverter: Converter<
  [number, number, number, number],
  RgbaValue
> = {
  toInstance(value) {
    return new RgbaValue(value);
  },
  toPlain(rgba, options) {
    return toPrecisionArray(rgba.values(), options.precision);
  },
};

export const valueConverters = {
  rgbaValueConverter,
  rgbaStopConverter,
  pathConverter,
  twoDimensionValueConverter,
  oneDimensionValueConverter,
  animatableColorConverter,
  animatableGradientConverter,
};
