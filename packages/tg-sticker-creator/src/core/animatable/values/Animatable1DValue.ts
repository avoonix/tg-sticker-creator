import {
  AnimatableValue,
  AnimationError,
  Easing, JsonObject, OffsetKeyframe,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * A number value that can be animated
 * 
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 * 
 * @category Values
 */
export class Animatable1DValue extends AnimatableValue<number, OffsetKeyframe> {
  protected value: number | OffsetKeyframe[] = 0;

  getValue() {
    return this.value;
  }

  toAnimated(firstFrame: number) {
    if (Array.isArray(this.value) || this.animated) {
      throw new AnimationError("already animated");
    }
    this.value = [
      new OffsetKeyframe().setStartTime(firstFrame).setStartValue([this.value]),
    ];
    this.animated = true;
    return this;
  }

  addKeyframe(frame: number, value: number, easing?: Easing) {
    this.beforeAddKeyframe(easing, 1, false, frame);
    (this.value as OffsetKeyframe[]).push(
      new OffsetKeyframe().setStartTime(frame).setStartValue([value])
    );
    return this;
  }

  constructor(v?: number | OffsetKeyframe[]) {
    super();
    if (v) this.setValue(v);
  }

  // value: number | OffsetKeyframe[] = 0;

  setValue(v: number | OffsetKeyframe[]) {
    this.value = v;
    this.updateAnimatedBoolean(v);
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: Animatable1DValue, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new Animatable1DValue();
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
      k: toPlain(this.value, valueConverters.oneDimensionValueConverter(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.value = toInstance(value.k, valueConverters.oneDimensionValueConverter(), this.value);
  }
}
