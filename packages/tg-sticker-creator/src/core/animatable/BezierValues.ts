import {
  converters,
  JsonObject,
  LottieItem,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Bezier handles for animatable values.
 * `number` for `AnimatablePath` and `number[]` for other `AnimatableValue`
 *
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/shapePropKeyframe.json
 */
export class BezierValues extends LottieItem {
  bezierXAxis: number[] | number = [];
  bezierYAxis: number[] | number = [];

  /**
   * @internal
   */
  static toPlain(value: BezierValues, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new BezierValues();
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
      x: toPlain(this.bezierXAxis, converters.numberOrNumberArray, options),
      y: toPlain(this.bezierYAxis, converters.numberOrNumberArray, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.bezierXAxis = toInstance(value.x, converters.numberOrNumberArray, this.bezierXAxis);
    this.bezierYAxis = toInstance(value.y, converters.numberOrNumberArray, this.bezierYAxis);
  }
}
