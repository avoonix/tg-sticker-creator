import { mix } from "ts-mixer";
import {
  CancellableCallback,
  converters,
  EachOptions,
  JsonObject,
  Layers,
  LottieItem,
  randInt,
  Shape,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * Reusable set of layers
 */
@mix(Layers)
export class PreComp extends LottieItem {
  id = `comp${randInt()}`;

  eachChildShape(
    callback: CancellableCallback<Shape>,
    { parents = [] }: EachOptions = {}
  ) {
    let cancel = false;
    const cb = (item: Shape, cancelFn: () => void, parents: LottieItem[]) => {
      callback(
        item,
        () => {
          cancel = true;
          cancelFn();
        },
        parents
      );
    };
    this.eachImmediateChildLayer(
      (layer, cancelFn, parents) => {
        if (layer.is("ShapeLayer")) {
          layer.eachChildShape(cb, { parents });
        }
        if (cancel) cancelFn();
      },
      { parents }
    );
    return this;
  }

  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      id: toPlain(this.id, converters.string, options),
      ...this.layersToPlain(options),
    };
  }

  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.layersToInstance(value);
    this.id = toInstance(value.id, converters.string, this.id);
  }

  /**
   * @internal
   */
  static toPlain(value: PreComp, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new PreComp();
    instance.toInstance(value);
    return instance;
  }
}
export interface PreComp extends Layers {}
