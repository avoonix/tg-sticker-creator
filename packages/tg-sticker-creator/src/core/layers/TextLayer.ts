import { JsonObject, Layer, LayerType, ToPlainOptions } from "../internal";

/**
 * Not implemented and not supported by telegram stickers
 * 
 * References
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/TextLayer.java
 * 
 * @category Layers
 */
export class TextLayer extends Layer {
  constructor() {
    super();
    this.type = LayerType.text;
  }

  /**
   * @internal
   */
  static toPlain(value: TextLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new TextLayer();
    instance.toInstance(value);
    return instance;
  }
}
