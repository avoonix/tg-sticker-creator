import { mix } from "ts-mixer";
import {
  AnimatableColor,
  colorFromString,
  JsonObject,
  Shape,
  ShapeType,
  Stroke,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A solid color outline
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapeStroke.java
 *
 * @category Shapes
 */
@mix(Stroke)
export class StrokeShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.stroke;
  }

  color: AnimatableColor = new AnimatableColor(colorFromString("green"));

  setColor(o: AnimatableColor) {
    this.color = o;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: StrokeShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new StrokeShape();
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
      ...this.strokeToPlain(options),
      c: toPlain(this.color, AnimatableColor, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.strokeToInstance(value);
    this.color = toInstance(value.c, AnimatableColor, this.color);
  }
}
export interface StrokeShape extends Stroke {}
