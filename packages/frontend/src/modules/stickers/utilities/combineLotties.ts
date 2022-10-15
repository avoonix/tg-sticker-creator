import { Lottie } from "tg-sticker-creator";

export const combineLotties = (bottom: Lottie, top: Lottie) => {
  const suffix = "_" + Math.random().toFixed(5);
  const offset = 10000 + Math.floor(Math.random() * 10000); // FIXME: this will cause bugs
  for (const comp of top.assets) {
    comp.id += suffix;
  }
  top.eachChildLayer((layer) => {
    if (typeof layer.parentIndex === "number") {
      layer.parentIndex += offset;
    }
    if (typeof layer.index === "number") {
      layer.index += offset;
    }
    if (layer.is("CompLayer")) {
      layer.referenceId += suffix;
    }
  });
  bottom.initialFrame = top.initialFrame;
  bottom.finalFrame = top.finalFrame;
  bottom.frameRate = top.frameRate;
  bottom.version = top.version;
  for (const asset of top.assets) {
    bottom.addAsset(asset);
  }
  for (const layer of top.layers) {
    bottom.addLayerBack(layer);
  }
};
