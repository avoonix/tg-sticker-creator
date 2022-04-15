import { JsonObject, Layer, LayerType, ToPlainOptions } from "../internal";

/**
 * Empty layer
 *
 * References:
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/NullLayer.java
 *
 * @category Layers
 */
export class NullLayer extends Layer {
  constructor() {
    super();
    this.type = LayerType.null;
  }

  /**
   * @internal
   */
  static toPlain(value: NullLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new NullLayer();
    instance.toInstance(value);
    return instance;
  }
}
