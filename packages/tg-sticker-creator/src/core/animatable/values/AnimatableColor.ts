import {
  AnimatableValue,
  AnimationError,
  colorFromString,
  ColorKeyframe,
  Easing, JsonObject, RgbaValue,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * A color value that can be animated
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 * 
 * @category Values
 */
export class AnimatableColor extends AnimatableValue<RgbaValue, ColorKeyframe> {
  protected value: RgbaValue | ColorKeyframe[] = colorFromString("violet");

  toAnimated(firstFrame: number) {
    if (Array.isArray(this.value) || this.animated) {
      throw new AnimationError("already animated");
    }
    this.value = [
      new ColorKeyframe().setStartTime(firstFrame).setStartValue(this.value),
    ];
    this.animated = true;
    return this;
  }

  addKeyframe(frame: number, value: RgbaValue | string, easing?: Easing) {
    this.beforeAddKeyframe(easing, 4, false, frame);
    (this.value as ColorKeyframe[]).push(
      new ColorKeyframe()
        .setStartTime(frame)
        .setStartValue(
          typeof value === "string" ? colorFromString(value) : value
        )
    );
    return this;
  }

  constructor(v?: RgbaValue | ColorKeyframe[] | string) {
    super();
    if (v) this.setValue(v);
  }

  setValue(v: RgbaValue | ColorKeyframe[] | string) {
    this.value = typeof v === "string" ? colorFromString(v) : v;
    this.updateAnimatedBoolean(this.value);
    return this;
  }

  getValue() {
    return this.value;
  }

  /**
   * @internal
   */
  static toPlain(value: AnimatableColor, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new AnimatableColor();
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
      k: toPlain(this.value, valueConverters.animatableColorConverter(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.value = toInstance(value.k, valueConverters.animatableColorConverter(), this.value);
  }
}
