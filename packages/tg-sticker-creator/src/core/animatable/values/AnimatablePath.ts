import {
  AnimatableValue,
  AnimationError,
  Easing,
  isClassArray, JsonObject, Keyframe,
  Path,
  PathKeyframe,
  toInstance,
  toPlain, ToPlainOptions, valueConverters
} from "../../internal";

/**
 * A bezier path value that can be animated
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/shapeKeyframed.json
 *
 * @category Values
 */
export class AnimatablePath extends AnimatableValue<Path, PathKeyframe> {
  constructor(v?: Path | PathKeyframe[]) {
    super();
    if (v) this.setValue(v);
  }

  protected value: Path | PathKeyframe[] = new Path();

  getValue() {
    return this.value;
  }

  setValue(v: Path | PathKeyframe[]) {
    this.value = v;
    return this;
  }

  addKeyframe(frame: number, value: Path, easing?: Easing) {
    this.beforeAddKeyframe(easing, 1, true, frame);
    (this.value as PathKeyframe[]).push(
      new PathKeyframe().setStartTime(frame).setStartValue([value])
    );
    return this;
  }

  toAnimated(firstFrame: number) {
    if (isClassArray(this.value, Keyframe) || this.animated) {
      throw new AnimationError("already animated");
    }
    this.value = [
      new PathKeyframe().setStartTime(firstFrame).setStartValue([this.value]),
    ];
    this.animated = true;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: AnimatablePath, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new AnimatablePath();
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
      k: toPlain(this.value, valueConverters.pathConverter(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.value = toInstance(value.k, valueConverters.pathConverter(), this.value);
  }
}
