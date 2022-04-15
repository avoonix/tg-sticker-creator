import {
  Animatable1DValue,
  Animatable2DValue,
  converters, JsonObject, toInstance,
  toPlain,
  ToPlainOptions
} from "../../internal";

/**
 * A number array value of length 2 that can be animated.
 * Each axis can optionally be animated individually.
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/properties.py
 * 
 * @category Values
 */
export class AnimatablePosition extends Animatable2DValue {
  separateXandY?: boolean;

  x?: Animatable1DValue;

  y?: Animatable1DValue;

  setSeparatedX(x?: Animatable1DValue) {
    this.x = x;
    if (x) {
      this.separateXandY = true;
    }
  }

  setSeparatedY(y?: Animatable1DValue) {
    this.y = y;
    if (y) {
      this.separateXandY = true;
    }
  }

  /**
   * @internal
   */
  static override toPlain(value: AnimatablePosition, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static override toInstance(value: JsonObject) {
    const instance = new AnimatablePosition();
    instance.toInstance(value);
    return instance;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    const plain = super.toPlain(options);
    return {
      ...plain,
      s: toPlain(this.separateXandY, converters.optional(converters.boolean), options),
      x: toPlain(this.x, converters.optional(Animatable1DValue), options),
      y: toPlain(this.y, converters.optional(Animatable1DValue), options),
      a: this.separateXandY ? undefined : plain.a,
      k: this.separateXandY ? undefined : plain.k,
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.separateXandY = toInstance(value.s, converters.optional(converters.boolean), this.separateXandY);
    this.x = toInstance(value.x, converters.optional(Animatable1DValue), this.x);
    this.y = toInstance(value.y, converters.optional(Animatable1DValue), this.y);
  }
}
