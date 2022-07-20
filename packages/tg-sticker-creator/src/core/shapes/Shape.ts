import { ShapeType } from "../constants";
import {
  converters,
  FindOptions,
  JsonObject,
  LottieItem,
  randInt,
  Resolvable,
  resolveCurrentItemHelper,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Base shape
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 *
 * @category Shapes
 */
export class Shape extends LottieItem implements Resolvable {
  /**
   * @internal
   */
  resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ) {
    return resolveCurrentItemHelper(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      options
    );
  }

  type!: string;

  name?: string = `shape${randInt()}`;

  hidden?: boolean;

  setHidden(hidden?: boolean) {
    this.hidden = hidden;
    return this;
  }

  index?: number = randInt();

  setName(name: string) {
    this.name = name;
    return this;
  }

  setIndex(index: number) {
    this.index = index;
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      ty: toPlain(this.type, converters.pass(), options),
      nm: toPlain(this.name, converters.optional(converters.string), options),
      hd: toPlain(this.hidden, converters.optional(converters.boolean), options),
      cix: toPlain(this.index, converters.number, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.type = toInstance(value.ty, converters.pass<ShapeType>(), this.type);
    this.name = toInstance(value.nm, converters.optional(converters.string), undefined);
    this.hidden = toInstance(value.hd, converters.optional(converters.boolean), this.hidden);
    this.index = toInstance(value.cix, converters.number, undefined);
  }
}
