import {
  converters,
  JsonObject, toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

export class Dimensions {
  width = 512;
  height = 512;

  setWidth(width: number) {
    this.width = width;
    return this;
  }

  setHeight(height: number) {
    this.height = height;
    return this;
  }

  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * @internal
   */
  dimensionsToPlain(options: ToPlainOptions): JsonObject {
    return {
      w: toPlain(this.width, converters.number, options),
      h: toPlain(this.height, converters.number, options),
    };
  }

  /**
   * @internal
   */
  dimensionsToInstance(value: JsonObject) {
    this.width = toInstance(value.w, converters.number, this.width);
    this.height = toInstance(value.h, converters.number, this.height);
  }
}
