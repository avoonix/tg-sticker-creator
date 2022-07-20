import {
  CancellableCallback,
  CompLayer,
  Converter,
  converters,
  EachOptions,
  ImageLayer,
  JsonObject,
  JsonValue,
  Layer,
  LayerType, NullLayer,
  ShapeLayer,
  SolidLayer,
  TextLayer,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

const layerConverter = (): Converter<JsonValue, Layer[]> =>
  converters.array(
    converters.multiple<JsonValue, Layer, string>({
      [LayerType.comp]: CompLayer,
      [LayerType.solid]: SolidLayer,
      [LayerType.image]: ImageLayer,
      [LayerType.null]: NullLayer,
      [LayerType.shape]: ShapeLayer,
      [LayerType.text]: TextLayer,
    })
  );

export type MixinBaseConstructor<T = {}> = new (...args: any[]) => T;

export class Layers {
  layers: Layer[] = [];

  setLayers(layers: Layer[]) {
    this.layers = layers;
    return this;
  }

  addLayerBack(layer: Layer) {
    this.layers.push(layer);
    return this;
  }

  addLayerFront(layer: Layer) {
    this.layers.unshift(layer);
    return this;
  }

  /**
   *
   * @param callback
   * @returns
   */
  eachImmediateChildLayer(
    callback: CancellableCallback<Layer>,
    { parents = [] }: EachOptions = {}
  ) {
    let cancel = false;
    for (const layer of this.layers) {
      callback(layer, () => (cancel = true), [...parents, this] as any); // TODO: fix types
      if (cancel) break;
    }
    return this;
  }

  /**
   * @internal
   */
  layersToPlain(options: ToPlainOptions): JsonObject {
    return {
      layers: toPlain(this.layers, layerConverter(), options),
    };
  }

  /**
   * @internal
   */
  layersToInstance(value: JsonObject) {
    this.layers = toInstance(value.layers, layerConverter(), this.layers);
  }
}
