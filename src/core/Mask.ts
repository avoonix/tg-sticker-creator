import {
  Animatable1DValue,
  AnimatablePath,
  converters,
  FindOptions, JsonObject, LottieItem,
  MaskMode,
  randInt,
  Resolvable,
  resolveCurrentItemHelper,
  toInstance,
  toPlain,
  ToPlainOptions
} from "./internal";

/**
 * Hide parts of shapes on a layer
 */
export class Mask extends LottieItem implements Resolvable {
  /**
   * @internal
   */
  resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ): { currentPartialKeyPath: (string | undefined)[]; thisItem: LottieItem }[] {
    return resolveCurrentItemHelper(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      options
    );
  }

  inverted = false;

  name?: string = `mask${randInt()}`;

  opacity?: Animatable1DValue = new Animatable1DValue(100);

  mode = MaskMode.add;

  dilate?: Animatable1DValue = new Animatable1DValue(0);

  vertices: AnimatablePath = new AnimatablePath();

  setVertices(v: AnimatablePath) {
    this.vertices = v;
    return this;
  }

  setOpacity(o: Animatable1DValue) {
    this.opacity = o;
    return this;
  }

  setDilate(o: Animatable1DValue) {
    this.dilate = o;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: Mask, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new Mask();
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
      inv: toPlain(this.inverted, converters.boolean, options),
      nm: toPlain(this.name, converters.optional(converters.string), options),
      o: toPlain(this.opacity, converters.optional(Animatable1DValue), options),
      mode: toPlain(this.mode, converters.pass(), options),
      x: toPlain(this.dilate, converters.optional(Animatable1DValue), options),
      pt: toPlain(this.vertices, AnimatablePath, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.inverted = toInstance(value.inv, converters.boolean, this.inverted);
    this.name = toInstance(value.nm, converters.optional(converters.string), undefined);
    this.opacity = toInstance(value.o, converters.optional(Animatable1DValue), this.opacity);
    this.mode = toInstance(value.mode, converters.pass<MaskMode>(), this.mode);
    this.dilate = toInstance(value.x, converters.optional(Animatable1DValue), this.dilate);
    this.vertices = toInstance(value.pt, AnimatablePath, this.vertices);
  }
}
