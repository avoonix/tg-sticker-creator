import { mix } from "ts-mixer";
import {
  BlendMode,
  converters,
  FindOptions,
  JsonObject,
  Resolvable,
  resolveChildren,
  Resolver,
  Shape, Shapes,
  ShapeType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * A group of shapes
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapeGroup.java
 *
 * @category Shapes
 */
@mix(Shapes, Resolver)
export class GroupShape extends(Shape) implements Resolvable {
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
    return resolveChildren(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      function* () {
        for (const shape of shapes) {
          yield shape;
        }
      },
      options
    );
  }

  constructor() {
    super();
    this.type = ShapeType.group;
  }

  blendMode: BlendMode = BlendMode.normal;

  /**
   * @internal
   */
  static toPlain(value: GroupShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new GroupShape();
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
      ...this.shapesToPlain(options, "it"),
      bm: toPlain(this.blendMode, converters.pass(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.shapesToInstance(value, "it");
    this.blendMode = toInstance(value.bm, converters.pass<BlendMode>(), this.blendMode);
  }
}
export interface GroupShape extends Shapes, Resolver {}
