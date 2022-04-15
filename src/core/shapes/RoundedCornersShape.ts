import {
  Animatable1DValue, JsonObject, Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Rounds corners
 * 
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 *
 * @category Shapes
 */
export class RoundedCornersShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.roundedCorners;
  }

  radius: Animatable1DValue = new Animatable1DValue(0);

  setRadius(s: Animatable1DValue) {
    this.radius = s;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: RoundedCornersShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new RoundedCornersShape();
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
      r: toPlain(this.radius, Animatable1DValue, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.radius = toInstance(value.r, Animatable1DValue, this.radius);
  }
}
