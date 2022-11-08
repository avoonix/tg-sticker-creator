import {
  AnimationError,
  converters,
  createBezier,
  Easing,
  isClassArray,
  JsonObject,
  Keyframe,
  LottieItem,
  toInstance,
  toPlain,
  ToPlainOptions,
} from "../../internal";

/**
 * The base class for other values
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 *
 * @category Values
 */
export abstract class AnimatableValue<
  V extends any,
  K extends Keyframe
> extends LottieItem {
  // implements Animatable<V, K>
  protected abstract value: V | K[];
  abstract setValue(v: V | K[]): this;
  abstract getValue(): V | K[];

  animated = false;

  protected updateAnimatedBoolean(value: any) {
    this.animated = isClassArray(value, Keyframe);
  }

  /**
   * You can only append keyframes (for now)
   * @param frame value should be after the previous keyframe
   * @param value
   * @param easing
   */
  abstract addKeyframe(frame: number, value: V, easing?: Easing): this;

  /**
   *
   * @param firstFrame
   * @throws AnimationError
   */
  abstract toAnimated(firstFrame: number): this;

  /**
   * called by each implementation
   * currently only handles appending keyframes
   */
  protected beforeAddKeyframe(
    // frame: number,
    // value: number[],
    easing: Easing = "linear",
    dimensions: number,
    array: boolean,
    newKeyframeStart: number
  ) {
    const { bezierIn, bezierOut, jump } = createBezier(
      easing,
      dimensions,
      array
    );
    if (!this.animated) {
      this.toAnimated(0);
    }
    const keyframes = this.value as Keyframe[];
    const last = keyframes[keyframes.length - 1];
    last.setBezierIn(bezierIn).setBezierOut(bezierOut).setJumpToEnd(jump);
    if (newKeyframeStart === last.startTime) {
      // the new keyframe has the same start as the last keyframe -> replace last keyframe
      keyframes.pop();
    }
  }

  /**
   * Change the start time of every keyframe by `delta` frames
   * @param delta
   * @throws AnimationError
   */
  shift(delta: number) {
    if (!this.animated) throw new AnimationError("not animated");
    for (const frame of this.value as Keyframe[]) {
      frame.setStartTime(frame.startTime + delta);
    }
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      a: toPlain(this.animated, converters.numberBoolean, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.animated = toInstance(value.a, converters.numberBoolean, this.animated);
  }
}
