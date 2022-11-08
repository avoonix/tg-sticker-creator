import {
  BezierValues,
  converters,
  JsonObject,
  LottieItem,
  toInstance,
  toPlain,
  ToPlainOptions,
} from "../../internal";

/**
 * Base class for keyframes
 */
export abstract class Keyframe extends LottieItem {
  startTime: number = 0;

  setStartTime(v: number) {
    this.startTime = v;
    return this;
  }

  jumpToEnd? = false;

  setJumpToEnd(jump: boolean | undefined) {
    this.jumpToEnd = jump;
    return this;
  }

  bezierIn?: BezierValues;

  bezierOut?: BezierValues;

  setBezierIn(inP: BezierValues | undefined) {
    this.bezierIn = inP;
    return this;
  }

  setBezierOut(outP: BezierValues | undefined) {
    this.bezierOut = outP;
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      h: toPlain(this.jumpToEnd, converters.optional(converters.numberBoolean), options),
      i: toPlain(this.bezierIn, converters.optional(BezierValues), options),
      o: toPlain(this.bezierOut, converters.optional(BezierValues), options),
      t: toPlain(this.startTime, converters.number, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.startTime = toInstance(value.t, converters.number, this.startTime);
    this.jumpToEnd = toInstance(value.h, converters.optional(converters.numberBoolean), undefined);
    this.bezierIn = toInstance(value.i, converters.optional(BezierValues), this.bezierIn);
    this.bezierOut = toInstance(value.o, converters.optional(BezierValues), this.bezierOut);
  }
}
