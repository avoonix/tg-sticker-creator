import { animation } from "./animation";
import { create as c } from "./create";
export { BlinkAnimationOptions, ParticleAnimationOptions, RandomizableValue } from "./animation";
export * from "./enum";
export { optimizeFilesize, OptimizeFilesizeOptions } from "./optimize";

export const create = {
  ...c,
  animation,
};
