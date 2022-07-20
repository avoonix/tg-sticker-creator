import cloneDeep from "lodash.clonedeep";
import {
  CastError,
  classes,
  ClassNames,
  isClass,
  JsonObject,
  ToPlainOptions
} from "./internal";

/**
 * Base class for other classes in this library.
 */
export class LottieItem {
  /**
   * Test if this item is an instance of `class_`. You can also use instanceof, but this is more conventient.
   *
   * ```
   * // example
   * const fill = new FillShape();
   *
   * fill.is("FillShape") // true
   * fill.is("Shape") // true
   * fill.is("LottieItem") // true
   *
   * fill.is("Lottie") // false
   * ```
   * @param class_
   * @returns
   */
  is<T extends ClassNames>(class_: T): this is InstanceType<typeof classes[T]>;
  /**
   * ```
   * // example
   * const fill = new FillShape();
   *
   * fill.is(FillShape) // true
   * fill.is(Shape) // true
   * fill.is(LottieItem) // true
   *
   * fill.is(Lottie) // false
   * ```
   * @param class_
   * @returns
   */
  is<T extends abstract new (...args: any) => any>(class_: T): this is T;
  is<T extends ClassNames | (abstract new (...args: any) => any)>(
    class_: T
  ): boolean {
    if (typeof class_ === "string") {
      return isClass(this, classes[class_ as ClassNames]);
    }
    return isClass(this, class_);
  }

  /**
   * Ensure this instance is `class_`.
   *
   * ```
   * animation.find("my rect").setDirection(1); // type error
   * animation.find("my rect").cast("RectShape").setDirection(1); // works
   * ```
   * @param class_
   * @returns
   */
  cast<T extends ClassNames>(class_: T): InstanceType<typeof classes[T]>;
  /**
   * ```
   * animation.find("my rect").cast(RectShape).setDirection(1);
   * ```
   * @param class_
   * @throws {@link CastError}
   * @returns
   */
  cast<T extends abstract new (...args: any) => any>(class_: T): T;
  cast<T extends ClassNames | (abstract new (...args: any) => any)>(
    class_: T
  ): any {
    if (!this.is(class_ as abstract new (...args: any) => any)) {
      throw new CastError(
        `item "${this.constructor.name || String(this)}" is not a "${class_}"`
      );
    }
    return this;
  }

  /**
   * Convert this instance to a plain object with shortened property names
   * @returns
   */
  /**
   * @internal
   */
  toPlain(_options: ToPlainOptions): JsonObject {
    return {};
  }

  /**
   * Deep clones this object
   */
  clone(): this {
    return cloneDeep<this>(this);
  }

  /**
   * @internal
   */
  toInstance(_value: any) {}
}
