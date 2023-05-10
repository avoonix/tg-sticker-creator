import {
  brightnessFilter,
  colorMixFilter,
  contrastFilter,
  greyscaleFilter,
  hearts,
  hypnoEffect2,
  hypnoEffect3,
  outline,
  saturationFilter,
  sepiaFilter,
  sparkles,
  speedlines,
  spinFilter,
  strokeWidth,
} from "./utilities";
import { FilterDefinition } from "./utilities/createFilter";

export const getEffect = (
  name: string,
  id: string,
): FilterDefinition | null => {
  const effects: { [name: string]: () => FilterDefinition } = {
    "effect.hearts": () => hearts(id),
    "effect.sparkles": () => sparkles(id),
    "effect.speedlines": () => speedlines(id),
    "effect.stroke-width": () => strokeWidth(id),
    "effect.outline": () => outline(id),
  };
  return effects[name]?.() || null;
};

export const getCommonEffects = () => [
  sepiaFilter("effect.color.sepia"),
  greyscaleFilter("effect.color.greyscale"),
  saturationFilter("effect.color.saturation"),
  brightnessFilter("effect.color.brightness"),
  contrastFilter("effect.color.contrast"),
  spinFilter("effect.color.spin"),
  colorMixFilter("effect.color.mix"),

  hypnoEffect2("effect.hypno"),
  hypnoEffect3("effect.hypno3"),
];
