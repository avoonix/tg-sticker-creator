import {
  Animatable1DValue,
  BlendMode,
  converters,
  JsonObject,
  LineCap,
  LineJoin,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

export class Stroke {
  width = new Animatable1DValue(1);

  opacity = new Animatable1DValue(100);

  lineJoin = LineJoin.miter;

  lineCap = LineCap.round;

  miterLimit? = 10;

  blendMode: BlendMode = BlendMode.normal;

  setWidth(w: Animatable1DValue) {
    this.width = w;
    return this;
  }

  setOpacity(o: Animatable1DValue) {
    this.opacity = o;
    return this;
  }

  setLineCap(l: LineCap) {
    this.lineCap = l;
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  strokeToPlain(options: ToPlainOptions): JsonObject {
      return {
        // ...super.toPlain(options),
        w: toPlain(this.width, Animatable1DValue, options),
        o: toPlain(this.opacity, Animatable1DValue, options),
        lj: toPlain(this.lineJoin, converters.pass(), options),
        lc: toPlain(this.lineCap, converters.pass(), options),
        ml: toPlain(this.miterLimit, converters.optional(converters.number), options),
        bm: toPlain(this.blendMode, converters.pass(), options),
      };
    }

  // prettier-ignore
  /**
   * @internal
   */
  strokeToInstance(value: JsonObject) {
      // super.toInstance(value);
      this.width = toInstance(value.w, Animatable1DValue, this.width);
      this.opacity = toInstance(value.o, Animatable1DValue, this.opacity);
      this.lineJoin = toInstance(value.lj, converters.pass<LineJoin>(), this.lineJoin);
      this.lineCap = toInstance(value.lc, converters.pass<LineCap>(), this.lineCap);
      this.miterLimit = toInstance(value.ml, converters.optional(converters.number), undefined);
      this.blendMode = toInstance(value.bm, converters.pass<BlendMode>(), this.blendMode);
    }
}
