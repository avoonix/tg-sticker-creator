import { JsonObject, Layer, ToPlainOptions } from "../internal";

/**
 * Not implemented and not supported by telegram stickers
 * 
 * @category Layers
 */
export class ImageLayer extends Layer {
  // currently unused

  /**
   * @internal
   */
  static toPlain(value: ImageLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new ImageLayer();
    instance.toInstance(value);
    return instance;
  }
}
