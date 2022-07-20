import {
  Animatable1DValue,
  converters, JsonObject, Shape,
  ShapeType,
  toInstance,
  toPlain, ToPlainOptions, TrimMultiple
} from "../internal";

/**
 * Hides parts of the stroke
 *
 * References:
 * - https://gitlab.com/mattbas/python-lottie/-/blob/master/lib/lottie/objects/shapes.py
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/content/ShapeTrimPath.java
 * 
 * @category Shapes
 */
export class TrimShape extends Shape {
  constructor() {
    super();
    this.type = ShapeType.trim;
  }

  /**
   * percentage
   */
  start: Animatable1DValue = new Animatable1DValue(0);

  setStart(s: Animatable1DValue) {
    this.start = s;
    return this;
  }

  /**
   * percentage
   */
  end: Animatable1DValue = new Animatable1DValue(100);

  setEnd(e: Animatable1DValue) {
    this.end = e;
    return this;
  }

  /**
   * angle (0-360)
   */
  offset: Animatable1DValue = new Animatable1DValue(0);

  setOffset(o: Animatable1DValue) {
    this.offset = o;
    return this;
  }

  multiple: TrimMultiple = TrimMultiple.individually;

  setMultiple(m: TrimMultiple) {
    this.multiple = m;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: TrimShape, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new TrimShape();
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
      s: toPlain(this.start, Animatable1DValue, options),
      e: toPlain(this.end, Animatable1DValue, options),
      o: toPlain(this.offset, Animatable1DValue, options),
      m: toPlain(this.multiple, converters.pass(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.start = toInstance(value.s, Animatable1DValue, this.start);
    this.end = toInstance(value.e, Animatable1DValue, this.end);
    this.offset = toInstance(value.o, Animatable1DValue, this.offset);
    this.multiple = toInstance(value.m, converters.pass<TrimMultiple>(), this.multiple);
  }
}
