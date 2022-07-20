import {
  Animatable1DValue,
  AnimatableColor,
  BlendMode,
  colorFromString,
  converters,
  FillRule, JsonObject, Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A solid color fill
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapeFill.java
 *
 * @category Shapes
 */
export class FillShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.fill;
  }

  color: AnimatableColor = new AnimatableColor(colorFromString("red"));

  opacity: Animatable1DValue = new Animatable1DValue(100);

  blendMode: BlendMode = BlendMode.normal;

  fillRule: FillRule = FillRule.nonZero;

  setOpacity(o: Animatable1DValue) {
    this.opacity = o;
    return this;
  }

  setColor(o: AnimatableColor) {
    this.color = o;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: FillShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new FillShape();
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
      r: toPlain(this.fillRule, converters.pass(), options),
      c: toPlain(this.color, AnimatableColor, options),
      o: toPlain(this.opacity, Animatable1DValue, options),
      bm: toPlain(this.blendMode, converters.pass(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.color = toInstance(value.c, AnimatableColor, this.color);
    this.opacity = toInstance(value.o, Animatable1DValue, this.opacity);
    this.blendMode = toInstance(value.bm, converters.pass<BlendMode>(), this.blendMode);
    this.fillRule = toInstance(value.r, converters.pass<FillRule>(), this.fillRule);
  }
}
