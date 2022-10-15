import {
  colors,
  hearts,
  hypno,
  outline,
  sparkles,
  speedlines,
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
    "effect.hypno": () => hypno(id),
    "effect.stroke-width": () => strokeWidth(id),
    "effect.color": () => colors(id),
    "effect.outline": () => outline(id),
  };
  return effects[name]?.() || null;
};
