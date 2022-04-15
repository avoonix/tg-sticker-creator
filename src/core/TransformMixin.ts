import {
  Animatable1DValue,
  Animatable2DValue,
  AnimatablePosition,
  converters,
  JsonObject, toInstance,
  toPlain,
  ToPlainOptions
} from "./internal";

export class Transform {
  opacity?: Animatable1DValue = new Animatable1DValue(100);

  rotation?: Animatable1DValue = new Animatable1DValue(0);

  position: AnimatablePosition = new AnimatablePosition([0, 0]);

  anchorPoint?: Animatable2DValue = new Animatable2DValue([0, 0]);

  scale?: Animatable2DValue = new Animatable2DValue([100, 100]);

  skew?: Animatable1DValue = new Animatable1DValue(0);

  skewAxis?: Animatable1DValue = new Animatable1DValue(0);

  setOpacity(o: Animatable1DValue) {
    this.opacity = o;
    return this;
  }
  setRotation(o: Animatable1DValue) {
    this.rotation = o;
    return this;
  }
  setPosition(o: AnimatablePosition) {
    this.position = o;
    return this;
  }
  setAnchor(o: Animatable2DValue) {
    this.anchorPoint = o;
    return this;
  }
  setScale(o: Animatable2DValue) {
    this.scale = o;
    return this;
  }
  setSkew(skew: Animatable1DValue, axis: Animatable1DValue) {
    this.skew = skew;
    this.skewAxis = axis;
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  transformToPlain(options: ToPlainOptions): JsonObject {
      return {
        o: toPlain(this.opacity, converters.optional(Animatable1DValue), options),
        r: toPlain(this.rotation, converters.optional(Animatable1DValue), options),
        p: toPlain(this.position, AnimatablePosition, options),
        s: toPlain(this.scale, converters.optional(Animatable2DValue), options),
        sk: toPlain(this.skew, converters.optional(Animatable1DValue), options),
        sa: toPlain(this.skewAxis, converters.optional(Animatable1DValue), options),
        a: toPlain(this.anchorPoint, converters.optional(Animatable2DValue), options),
      };
    }

  // prettier-ignore
  /**
   * @internal
   */
  transformToInstance(value: JsonObject) {
      this.skew = toInstance(value.sk, converters.optional(Animatable1DValue), undefined);
      this.opacity = toInstance(value.o, converters.optional(Animatable1DValue), undefined);
      this.rotation = toInstance(value.r, converters.optional(Animatable1DValue), undefined);
      this.position = toInstance(value.p, AnimatablePosition, this.position);
      this.anchorPoint = toInstance(value.a, converters.optional(Animatable2DValue), undefined);
      this.scale = toInstance(value.s, converters.optional(Animatable2DValue), undefined);
      this.skewAxis = toInstance(value.sa, converters.optional(Animatable1DValue), undefined);
    }
}
