import {
  AnimatablePath,
  converters, JsonObject, Mask,
  Shape,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A bezier path
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapePath.java
 * 
 * @category Shapes
 */
export class PathShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.shape;
  }

  shapeIndex?: number;

  vertices: AnimatablePath = new AnimatablePath();

  setVertices(v: AnimatablePath) {
    this.vertices = v;
    return this;
  }

  toMask() {
    return new Mask().setVertices(this.vertices.clone());
  }

  /**
   * @internal
   */
  static toPlain(value: PathShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new PathShape();
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
      ind: toPlain(this.shapeIndex, converters.optional(converters.number), options),
      ks: toPlain(this.vertices, AnimatablePath, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.shapeIndex = toInstance(value.ind, converters.optional(converters.number), undefined);
    this.vertices = toInstance(value.ks, AnimatablePath, this.vertices);
  }
}
