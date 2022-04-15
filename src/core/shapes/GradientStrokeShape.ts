import { mix } from "ts-mixer";
import {
  GradientMixin,
  JsonObject,
  Shape,
  ShapeType,
  Stroke,
  ToPlainOptions
} from "../internal";

/**
 * A circular/radial gradient outline
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/shapes/gStroke.json
 * - https://mattbas.gitlab.io/python-lottie/classlottie_1_1objects_1_1shapes_1_1GradientStroke.html
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/GradientStroke.java
 *
 * @category Shapes
 */
@mix(Stroke, GradientMixin)
export class GradientStrokeShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.gradientStroke;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
      return {
        ...super.toPlain(options),
        ...this.strokeToPlain(options),
        ...this.gradientToPlain(options),
      };
    }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
      super.toInstance(value);
      this.gradientToInstance(value);
      this.strokeToInstance(value);
    }

  /**
   * @internal
   */
  static toPlain(value: GradientStrokeShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new GradientStrokeShape();
    instance.toInstance(value);
    return instance;
  }
}
export interface GradientStrokeShape extends Stroke, GradientMixin {}
