import { JsonObject, Layer, LayerType, ToPlainOptions } from "../internal";

/**
 * Not implemented yet
 *
 * References:
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/SolidLayer.java
 * 
 * @category Layers
 */
export class SolidLayer extends Layer {
  constructor() {
    super();
    this.type = LayerType.solid;
  }

  /**
   * @internal
   */
  static toPlain(value: SolidLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new SolidLayer();
    instance.toInstance(value);
    return instance;
  }
}
