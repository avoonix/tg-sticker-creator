import { JsonObject, Shape, ShapeType, ToPlainOptions } from "../internal";

/**
 * Not supported
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/Repeater.java
 * 
 * @category Shapes
 */
export class RepeaterShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.repeater;
  }

  /**
   * @internal
   */
  static toPlain(value: RepeaterShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new RepeaterShape();
    instance.toInstance(value);
    return instance;
  }
}
