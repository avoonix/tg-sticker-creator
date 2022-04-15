import {
  Animatable1DValue,
  AnimatablePosition,
  converters, JsonObject, Shape,
  ShapeType,
  StarType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A star
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/PolystarShape.java
 *
 * @category Shapes
 */
export class StarShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.star;
  }

  position = new AnimatablePosition([512 / 2, 512 / 2]);

  direction?: number = 1;

  setPosition(o: AnimatablePosition) {
    this.position = o;
    return this;
  }

  starType?: StarType = StarType.star;

  innerRadius = new Animatable1DValue(10);

  setInnerRadius(s: Animatable1DValue) {
    this.innerRadius = s;
    return this;
  }

  innerRoundness = new Animatable1DValue(0);

  setInnerRoundness(s: Animatable1DValue) {
    this.innerRoundness = s;
    return this;
  }

  outerRadius = new Animatable1DValue(30);

  setOuterRadius(s: Animatable1DValue) {
    this.outerRadius = s;
    return this;
  }

  outerRoundness = new Animatable1DValue(0);

  setOuterRoundness(s: Animatable1DValue) {
    this.outerRoundness = s;
    return this;
  }

  rotation = new Animatable1DValue(0);

  setRotation(s: Animatable1DValue) {
    this.rotation = s;
    return this;
  }

  /**
   * number of points
   */
  points = new Animatable1DValue(5);

  setPoints(s: Animatable1DValue) {
    this.points = s;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: StarShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new StarShape();
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
      d: toPlain(this.direction, converters.optional(converters.number), options),
      sy: toPlain(this.starType, converters.optional(converters.pass()), options),
      ir: toPlain(this.innerRadius, Animatable1DValue, options),
      is: toPlain(this.innerRoundness, Animatable1DValue, options),
      or: toPlain(this.outerRadius, Animatable1DValue, options),
      os: toPlain(this.outerRoundness, Animatable1DValue, options),
      r: toPlain(this.rotation, Animatable1DValue, options),
      pt: toPlain(this.points, Animatable1DValue, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
      this.position = toInstance(value.p , AnimatablePosition, this.position);
      this.direction = toInstance(value.d , converters.optional(converters.number), this.direction);
      this.starType = toInstance(value.sy , converters.optional(converters.pass<StarType>()), this.starType);
      this.innerRadius = toInstance(value.ir , Animatable1DValue, this.innerRadius);
      this.innerRoundness = toInstance(value.is , Animatable1DValue, this.innerRoundness);
      this.outerRadius = toInstance(value.or , Animatable1DValue, this.outerRadius);
      this.outerRoundness = toInstance(value.os , Animatable1DValue, this.outerRoundness);
      this.rotation = toInstance(value.r , Animatable1DValue, this.rotation);
      this.points = toInstance(value.pt , Animatable1DValue, this.points);
  }
}
