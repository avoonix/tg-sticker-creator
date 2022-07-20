import {
  Animatable1DValue,
  Animatable2DValue,
  AnimatableGradient,
  converters,
  GradientType,
  JsonObject, stopFromString, toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

export class GradientMixin {
  startPoint: Animatable2DValue = new Animatable2DValue([0, 0]);

  setStartPoint(o: Animatable2DValue) {
    this.startPoint = o;
    return this;
  }

  endPoint: Animatable2DValue = new Animatable2DValue([512, 512]);

  setEndPoint(o: Animatable2DValue) {
    this.endPoint = o;
    return this;
  }

  gradientType: GradientType = GradientType.linear;

  setGradientType(o: GradientType) {
    this.gradientType = o;
    return this;
  }

  highlightLength: Animatable1DValue = new Animatable1DValue(100);

  setHighlightLength(o: Animatable1DValue) {
    this.highlightLength = o;
    return this;
  }

  highlightAngle: Animatable1DValue = new Animatable1DValue(100);

  setHighlightAngle(o: Animatable1DValue) {
    this.highlightAngle = o;
    return this;
  }

  gradient: AnimatableGradient = new AnimatableGradient([
    stopFromString("red", 0),
    stopFromString("green", 1),
  ]);

  setGradient(ag: AnimatableGradient) {
    this.gradient = ag;
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  gradientToPlain(options: ToPlainOptions): JsonObject {
      return {
        s: toPlain(this.startPoint, Animatable2DValue, options),
        e: toPlain(this.endPoint, Animatable2DValue, options),
        t: toPlain(this.gradientType, converters.pass(), options),
        h: toPlain(this.highlightLength, Animatable1DValue, options),
        a: toPlain(this.highlightAngle, Animatable1DValue, options),
        g: toPlain(this.gradient, AnimatableGradient, options),
      };
    }

  // prettier-ignore
  /**
   * @internal
   */
  gradientToInstance(value: JsonObject) {
      this.startPoint = toInstance(value.s , Animatable2DValue, this.startPoint);
      this.endPoint = toInstance(value.e , Animatable2DValue, this.endPoint);
      this.gradientType = toInstance(value.t , converters.pass<GradientType>(), this.gradientType);
      this.highlightLength = toInstance(value.h , Animatable1DValue, this.highlightLength);
      this.highlightAngle = toInstance(value.a , Animatable1DValue, this.highlightAngle);
      this.gradient = toInstance(value.g , AnimatableGradient, this.gradient);
    }
};
