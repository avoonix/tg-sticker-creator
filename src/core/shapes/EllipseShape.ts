import {
  Animatable2DValue,
  AnimatablePosition,
  converters, JsonObject, Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * An ellipse defined by a position and size
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/CircleShape.java
 * 
 * @category Shapes
 */
export class EllipseShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.ellipse;
  }

  position: AnimatablePosition = new AnimatablePosition([512 / 2, 512 / 2]);

  size: Animatable2DValue = new Animatable2DValue([50, 50]);

  /**
   * default: 1
   */
  direction?: number;

  setPosition(o: AnimatablePosition) {
    this.position = o;
    return this;
  }

  setSize(o: Animatable2DValue) {
    this.size = o;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: EllipseShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new EllipseShape();
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
      p: toPlain(this.position, AnimatablePosition, options),
      s: toPlain(this.size, Animatable2DValue, options),
      d: toPlain(this.direction, converters.optional(converters.pass()), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.position = toInstance(value.p, AnimatablePosition, this.position);
    this.size = toInstance(value.s, Animatable2DValue, this.size);
    this.direction = toInstance(value.d, converters.optional(converters.pass<number|undefined>()), this.direction); // TODO: enum
  }
}
