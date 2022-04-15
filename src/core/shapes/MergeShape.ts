import {
  converters, JsonObject, MergeMode,
  Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Not implemented properly
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapeGroup.java
 * 
 * @category Shapes
 */
export class MergeShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.merge;
  }

  mergeMode?: MergeMode;

  /**
   * @internal
   */
  static toPlain(value: MergeShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new MergeShape();
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
      mm: toPlain(this.mergeMode, converters.pass(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.mergeMode = toInstance(value.mm, converters.pass<MergeMode>(), this.mergeMode);
  }
}
