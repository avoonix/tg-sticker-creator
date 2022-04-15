import {
  converters, JsonObject, Keyframe,
  RgbaValue,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * Keyframe of an animated color value
 * 
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/offsetKeyframe.json
 */
export class ColorKeyframe extends Keyframe {
  startValue?: RgbaValue;

  endValue?: RgbaValue;

  setStartValue(v: RgbaValue) {
    this.startValue = v;
    return this;
  }

  setEndValue(v: RgbaValue) {
    this.endValue = v;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: ColorKeyframe, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new ColorKeyframe();
    instance.toInstance(value);
    return instance;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      s: toPlain(this.startValue, converters.optional(valueConverters.rgbaValueConverter), options),
      e: toPlain(this.endValue, converters.optional(valueConverters.rgbaValueConverter), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.startValue = toInstance(value.s, converters.optional(valueConverters.rgbaValueConverter), this.startValue);
    this.endValue = toInstance(value.e, converters.optional(valueConverters.rgbaValueConverter), this.endValue);
  }
}
