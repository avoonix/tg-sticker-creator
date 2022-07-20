import {
  Animatable1DValue,
  Animatable2DValue,
  AnimatablePosition,
  converters, JsonObject, Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A rectangle
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/RectangleShape.java
 * 
 * @category Shapes
 */
export class RectShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.rect;
  }

  position = new AnimatablePosition([512 / 2, 512 / 2]);

  size = new Animatable2DValue([50, 50]);

  direction?: number = 1;

  setDirection(d?: number) {
    this.direction = d;
    return this;
  }

  setPosition(o: AnimatablePosition) {
    this.position = o;
    return this;
  }

  setSize(o: Animatable2DValue) {
    this.size = o;
    return this;
  }

  rounded: Animatable1DValue = new Animatable1DValue(0);

  setRounded(s: Animatable1DValue) {
    this.rounded = s;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: RectShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new RectShape();
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
      d: toPlain(this.direction, converters.pass(), options),
      r: toPlain(this.rounded, Animatable1DValue, options),
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
    this.direction = toInstance(value.d, converters.pass<number|undefined>(), this.direction); // TODO: create enum for direction
    this.rounded = toInstance(value.r, Animatable1DValue, this.rounded);
  }
}
