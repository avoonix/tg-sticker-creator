import { mix } from "ts-mixer";
import {
  JsonObject,
  Shape,
  ShapeType,
  ToPlainOptions,
  Transform
} from "../internal";

/**
 * Combination of rotation, position, scale, skew
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/animatable/AnimatableTransform.java
 *
 * @category Shapes
 */
@mix(Transform)
export class TransformShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.transform;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      ...this.transformToPlain(options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.transformToInstance(value);
  }

  /**
   * @internal
   */
  static toPlain(value: TransformShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new TransformShape();
    instance.toInstance(value);
    return instance;
  }
}
export interface TransformShape extends Transform {}
