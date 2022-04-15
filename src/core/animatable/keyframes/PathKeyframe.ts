import {
  converters, JsonObject, Keyframe,
  Path,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../../internal";

/**
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/shapePropKeyframe.json
 */
export class PathKeyframe extends Keyframe {
  startValue: Path[] = [];

  endValue?: Path[];

  setStartValue(v: Path[]) {
    this.startValue = v;
    return this;
  }

  setEndValue(v?: Path[]) {
    this.endValue = v;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: PathKeyframe, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new PathKeyframe();
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
      s: toPlain(this.startValue, converters.array(Path), options),
      e: toPlain(this.endValue, converters.optional(converters.array(Path)), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.startValue = toInstance(value.s, converters.array(Path), this.startValue);
    this.endValue = toInstance(value.e, converters.optional(converters.array(Path)), this.endValue);
  }
}
