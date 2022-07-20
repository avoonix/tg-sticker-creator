import {
  AnimatableValue,
  AnimationError,
  converters,
  Easing,
  GradientKeyframe,
  isClassArray, JsonObject, Keyframe,
  RgbaStopValue,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * A gradient value that can be animated
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 *
 * @category Values
 */
export class AnimatableGradient extends AnimatableValue<
  RgbaStopValue[],
  GradientKeyframe
> {
  protected value: RgbaStopValue[] | GradientKeyframe[] = [];

  count: number = 2;

  toAnimated(firstFrame: number) {
    if (isClassArray(this.value, Keyframe) || this.animated) {
      throw new AnimationError("already animated");
    }
    this.value = [
      new GradientKeyframe().setStartTime(firstFrame).setStartValue(this.value),
    ];
    this.animated = true;
    return this;
  }

  addKeyframe(frame: number, value: RgbaStopValue[], easing?: Easing) {
    this.beforeAddKeyframe(easing, value.length, false, frame);
    (this.value as GradientKeyframe[]).push(
      new GradientKeyframe().setStartTime(frame).setStartValue(value)
    );
    return this;
  }

  constructor(v?: RgbaStopValue[] | GradientKeyframe[]) {
    super();
    if (v) this.setValue(v);
  }

  setValue(v: RgbaStopValue[] | GradientKeyframe[]) {
    this.value = v;
    this.updateAnimatedBoolean(v);
    if (Array.isArray(v)) {
      if (v[0] instanceof RgbaStopValue) {
        this.count = v.length;
      } else if (v[0] instanceof GradientKeyframe) {
        const val = v[0].startValue || v[0].endValue;
        if (val) {
          this.count = val.length;
        }
      }
    }
    return this;
  }

  getValue() {
    return this.value;
  }

  /**
   * @internal
   */
  static toPlain(value: AnimatableGradient, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new AnimatableGradient();
    instance.toInstance(value);
    return instance;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      p: toPlain(this.count, converters.number, options),
      k: {
        ...super.toPlain(options),
        k: toPlain(this.value, valueConverters.animatableGradientConverter(this.count), options),
      },
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    this.count = toInstance(value.p, converters.number, this.count);
    const nested = value.k as JsonObject;
    super.toInstance(nested);
    this.value = toInstance(nested.k, valueConverters.animatableGradientConverter(this.count), this.value);
  }
}
