import { converters, JsonObject, Keyframe, toInstance, toPlain, ToPlainOptions } from "../../internal";

/**
 * 
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/valueKeyframe.json
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/offsetKeyframe.json
 */
export class OffsetKeyframe extends Keyframe {
  startValue: number[] = [];

  endValue?: number[];

  inTangents?: number[];

  outTangents?: number[];

  setStartValue(v: number[]) {
    this.startValue = v;
    return this;
  }

  setEndValue(v: number[]) {
    this.endValue = v;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: OffsetKeyframe, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new OffsetKeyframe();
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
      s: toPlain(this.startValue, converters.array(converters.number), options),
      e: toPlain(this.endValue, converters.optional(converters.array(converters.number)), options),
      ti: toPlain(this.inTangents, converters.optional(converters.array(converters.number)), options),
      to: toPlain(this.outTangents, converters.optional(converters.array(converters.number)), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.startValue = toInstance(value.s, converters.array(converters.number), this.startValue);
    this.endValue = toInstance(value.e, converters.optional(converters.array(converters.number)), this.endValue);
    this.inTangents = toInstance(value.ti, converters.optional(converters.array(converters.number)), this.inTangents);
    this.outTangents = toInstance(value.to, converters.optional(converters.array(converters.number)), this.outTangents);
  }
}
