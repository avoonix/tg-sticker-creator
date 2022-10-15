import { cloneDeep } from "lodash";
import { StickerConfig } from "../execute";

export const mergeConfig = (
  base: StickerConfig,
  user: StickerConfig = {},
): StickerConfig => {
  const merged = cloneDeep(base);
  for (const [key, config] of Object.entries(user)) {
    const mergedConfig = merged[key];
    if (!mergedConfig) {
      merged[key] = cloneDeep(config);
      continue;
    }
    for (const [key, value] of Object.entries(config)) {
      mergedConfig[key] = config[key] ?? value;
    }
  }
  return merged;
};
