import { mix } from "ts-mixer";
import {
  Animatable1DValue,
  BlendMode,
  converters,
  FillRule,
  GradientMixin,
  JsonObject,
  Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A circular/radial gradient fill
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/GradientFill.java
 *
 * @category Shapes
 */
@mix(GradientMixin)
export class GradientFillShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.gradientFill;
  }

  opacity: Animatable1DValue = new Animatable1DValue(100);

  setOpacity(o: Animatable1DValue) {
    this.opacity = o;
    return this;
  }

  blendMode: BlendMode = BlendMode.normal;

  fillRule: FillRule = FillRule.nonZero;

  /**
   * @internal
   */
  static toPlain(value: GradientFillShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new GradientFillShape();
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
      ...this.gradientToPlain(options),
      o: toPlain(this.opacity, Animatable1DValue, options),
      bm: toPlain(this.blendMode, converters.pass(), options),
      r: toPlain(this.fillRule, converters.pass(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.gradientToInstance(value)
    this.opacity = toInstance(value.o, Animatable1DValue, this.opacity);
    this.blendMode = toInstance(value.bm, converters.pass<BlendMode>(), this.blendMode);
    this.fillRule = toInstance(value.r, converters.pass<FillRule>(), this.fillRule);
  }
}
export interface GradientFillShape extends GradientMixin {}
