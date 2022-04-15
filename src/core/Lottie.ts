import { mix } from "ts-mixer";
import {
  CancellableCallback,
  converters,
  Dimensions,
  EachOptions,
  FindOptions,
  JsonObject,
  Layer,
  Layers,
  LottieItem,
  PreComp,
  Resolvable,
  resolveChildren,
  Resolver,
  Shape,
  toInstance,
  toPlain,
  ToPlainOptions
} from "./internal";

@mix(Dimensions, Layers, Resolver)
export class Lottie extends LottieItem implements Resolvable {
  /**
   * @internal
   */
  resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ) {
    const layers = this.layers;
    const assets = this.assets;
    return resolveChildren(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      function* () {
        for (const layer of layers) {
          yield layer;
        }
        for (const asset of assets) {
          for (const layer of asset.layers) {
            yield layer;
          }
        }
      },
      options
    );
  }

  author?: string;

  tgsFlag = true;

  version: string = "5.0.0";

  frameRate: number = 60;

  initialFrame: number = 0;

  finalFrame: number = 60 * 3;

  name?: string = "animation";

  has3dLayers = false;

  setFrameRate(frameRate: number) {
    this.frameRate = frameRate;
    return this;
  }

  setFinalFrame(finalFrame: number) {
    this.finalFrame = finalFrame;
    return this;
  }

  setInitialFrame(initialFrame: number) {
    this.initialFrame = initialFrame;
    return this;
  }

  addAsset(asset: PreComp) {
    this.assets.push(asset);
    return this;
  }

  assets: PreComp[] = [];

  /**
   * also iterate `PreComp` layers
   * @param callback
   */
  eachChildLayer(
    callback: CancellableCallback<Layer>,
    { parents = [] }: EachOptions = {}
  ) {
    let cancel = false;
    const cb = (item: Layer, cancelFn: () => void, parents: LottieItem[]) => {
      callback(
        item,
        () => {
          cancel = true;
          cancelFn();
        },
        parents
      );
    };
    this.eachImmediateChildLayer(cb, { parents });
    if (cancel) return this;
    for (const preComp of this.assets) {
      preComp.eachImmediateChildLayer(cb, { parents: [...parents, this] });
      if (cancel) return this;
    }
    return this;
  }

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
    this.eachChildLayer(
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
   * Transforms this object into a lottie json string
   *
   * This stringification may result in a different ordering of keys compared to `JSON.stringify` since some lottie players require keys to be in a certain order.
   *
   * The result is not compressed.
   *
   * ```
   * // example usage
   * import pako from "pako";
   * const text = animation.toTgsString();
   * const zipped = pako.gzip(text, { level: 9 });
   * promptDownload(new Blob([zipped], { type: "application/gzip" }));
   * ```
   *
   * The resulting compressed file should be less than 64KiB to be displayed correctly in the Telegram app (Telegram Desktop has a different limit)
   * In node environments, zopfli may result in better compression than zlib.
   *
   * spaces - number of spaces for pretty-printing
   * precision - decimal places to round to
   * @returns
   */
  toTgsString(
    options: ToPlainOptions & { spaces?: number } = { precision: 4 }
  ) {
    return JSON.stringify(this.toPlain(options), null, options.spaces);
  }

  /**
   * @internal
   */
  static toPlain(value: Lottie, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const lottie = new Lottie();
    lottie.toInstance(value);
    return lottie;
  }

  // pretter-ignore
  /**
   * Convert this sticker to a plain javascript object
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      _author: toPlain(this.author, converters.string, options),
      tgs: toPlain(this.tgsFlag, converters.numberBoolean, options),
      v: toPlain(this.version, converters.string, options),
      fr: toPlain(this.frameRate, converters.number, options),
      ip: toPlain(this.initialFrame, converters.number, options),
      op: toPlain(this.finalFrame, converters.number, options),
      ...this.dimensionsToPlain(options),
      nm: toPlain(this.name, converters.string, options),
      ddd: toPlain(this.has3dLayers, converters.numberBoolean, options),
      assets: toPlain(this.assets, converters.array(PreComp), options),
      ...this.layersToPlain(options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.dimensionsToInstance(value);
    this.layersToInstance(value)
    this.tgsFlag = toInstance(value.tgs, converters.numberBoolean, this.tgsFlag);
    this.version = toInstance(value.v, converters.string, this.version);
    this.frameRate = toInstance(value.fr, converters.number, this.frameRate);
    this.initialFrame = toInstance( value.ip, converters.number, this.initialFrame);
    this.finalFrame = toInstance(value.op, converters.number, this.finalFrame);
    this.has3dLayers = toInstance(value.ddd, converters.numberBoolean, this.has3dLayers);
    this.name = toInstance(value.nm, converters.string, undefined);
    this.author = toInstance(value._author, converters.string, undefined);
    this.assets = toInstance(value.assets, converters.array(PreComp), this.assets);
  }
}
export interface Lottie extends Dimensions, Layers, Resolver {}
