import {
  converters,
  Keyframe,
  RgbaStopValue,
  toInstance,
  toPlain,
  ToPlainOptions,
  valueConverters
} from "../../internal";

/**
 *
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/offsetKeyframe.json
 */
export class GradientKeyframe extends Keyframe {
  startValue?: RgbaStopValue[];

  endValue?: RgbaStopValue[];

  setStartValue(v: RgbaStopValue[]) {
    this.startValue = v;
    return this;
  }

  setEndValue(v: RgbaStopValue[]) {
    this.endValue = v;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: GradientKeyframe, count = 0, options: ToPlainOptions) {
    return value.toPlain(options, count);
  }

  /**
   * @internal
   */
  static toInstance(value: any, count = 0) {
    const instance = new GradientKeyframe();
    instance.toInstance(value, count);
    return instance;
  }

  // prettier-ignore
  override toPlain(options: ToPlainOptions,count = 0) {
    return {
      ...super.toPlain(options),
      s: toPlain(this.startValue, valueConverters.rgbaStopConverter(count), options),
      e: toPlain(this.endValue, converters.optional(valueConverters.rgbaStopConverter(count)), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: any, count = 0) {
    super.toInstance(value);
    this.startValue = toInstance(value.s, valueConverters.rgbaStopConverter(count), this.startValue);
    this.endValue = toInstance(value.e, converters.optional(valueConverters.rgbaStopConverter(count)), this.endValue);
  }
}
