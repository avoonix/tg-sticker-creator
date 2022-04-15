import { mix } from "ts-mixer";
import {
  converters,
  Dimensions,
  JsonObject,
  Layer,
  LayerType,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Instantiates a composition defined in `Lottie.assets`
 *
 * References:
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/CompositionLayer.java
 *
 * @category Layers
 */
@mix(Dimensions)
export class CompLayer extends Layer {
  constructor(referenceId?: string) {
    super();
    this.type = LayerType.comp;
    if (referenceId) this.referenceId = referenceId;
  }
  /**
   * id pointing to the source composition defined on 'assets' object
   */
  referenceId!: string;

  setReferenceId(id: string) {
    this.referenceId = id;
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: CompLayer, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new CompLayer();
    instance.toInstance(value);
    return instance;
  }

  // pretter-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      ...this.dimensionsToPlain(options),
      refId: toPlain(this.referenceId, converters.string, options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.dimensionsToInstance(value);
    this.referenceId = toInstance(value.refId, converters.string, this.referenceId);
  }
}
export interface CompLayer extends Dimensions {}
