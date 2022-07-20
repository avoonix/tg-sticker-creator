import { animation } from "./animation";
import { create as c } from "./create";
export { BlinkAnimationOptions, ParticleAnimationOptions, RandomizableValue } from "./animation";
export * from "./enum";

export const create = {
  ...c,
  animation,
};
