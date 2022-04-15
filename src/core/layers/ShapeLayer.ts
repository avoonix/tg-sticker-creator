import { mix } from "ts-mixer";
import {
  FindOptions,
  JsonObject,
  Layer,
  LayerType,
  Resolvable,
  resolveChildren,
  Resolver, Shapes, ToPlainOptions
} from "../internal";

/**
 * _Not documented yet_
 *
 * https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/ShapeLayer.java
 *
 * @category Layers
 */
@mix(Shapes,  Resolver)
export class ShapeLayer extends(Layer) implements Resolvable {
  /**
   * @internal
   */
  override resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ) {
    const shapes = this.shapes;
    const masks = this.masks;
    return resolveChildren(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      function* () {
        for (const shape of shapes) {
          yield shape;
        }
        if (masks) {
          for (const mask of masks) {
            yield mask;
          }
        }
      },
      options
    );
  }

  constructor() {
    super();
    this.type = LayerType.shape;
  }

  /**
   * @internal
   */
  static toPlain(value: ShapeLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new ShapeLayer();
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
      ...this.shapesToPlain(options, "shapes"),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.shapesToInstance(value, "shapes");
  }
}
export interface ShapeLayer extends Shapes, Resolver {}
