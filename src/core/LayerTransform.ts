import { mix } from "ts-mixer";
import { JsonObject, LottieItem, ToPlainOptions, Transform } from "./internal";

/**
 *
 */
@mix(Transform)
export class LayerTransform extends LottieItem {
  type = "tr" as const;

  /**
   * @internal
   */
  static toPlain(value: LayerTransform, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new LayerTransform();
    instance.toInstance(value);
    return instance;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      ...this.transformToPlain(options),
      // doesn't seem to be needed?
      // ty: toPlain(this.type, converters.string, options),
      // ty: "tr",
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.transformToInstance(value);
    // this.type = toInstance(value.ty, converters.pass<"tr">(), this.type);
  }
}
export interface LayerTransform extends Transform {}
