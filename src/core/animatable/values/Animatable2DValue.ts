import {
  AnimatableValue,
  AnimationError,
  Coordinate,
  Easing,
  isClassArray, JsonObject, Keyframe,
  OffsetKeyframe,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * A number array value of length 2 that can be animated
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 *
 * @category Values
 */
export class Animatable2DValue extends AnimatableValue<
  Coordinate,
  OffsetKeyframe
> {
  protected value: Coordinate | OffsetKeyframe[] = [0, 0];

  getValue() {
    return this.value;
  }

  toAnimated(firstFrame: number) {
    if (isClassArray(this.value, Keyframe) || this.animated) {
      throw new AnimationError("already animated");
    }
    this.value = [
      new OffsetKeyframe().setStartTime(firstFrame).setStartValue(this.value),
    ];
    this.animated = true;
    return this;
  }
  addKeyframe(frame: number, value: Coordinate, easing?: Easing) {
    this.beforeAddKeyframe(easing, 2, false, frame);
    (this.value as OffsetKeyframe[]).push(
      new OffsetKeyframe().setStartTime(frame).setStartValue(value)
    );
    return this;
  }

  constructor(v?: Coordinate | OffsetKeyframe[]) {
    super();
    if (v) this.setValue(v);
  }

  // value: Coordinate | OffsetKeyframe[] = [0, 0];

  setValue(v: Coordinate | OffsetKeyframe[]) {
    this.value = v;
    this.updateAnimatedBoolean(v);
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: Animatable2DValue, options: ToPlainOptions) {
    return value.toPlain(options);
  }
  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new Animatable2DValue();
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
      k: toPlain(this.value, valueConverters.twoDimensionValueConverter(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.value = toInstance(value.k, valueConverters.twoDimensionValueConverter(), this.value);
  }
}
