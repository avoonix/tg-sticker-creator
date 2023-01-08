import { create, Lottie } from "tg-sticker-creator";
import { createStepsNew } from "../create";
import { Group, StickerConfig } from "../execute";
import { FilterDefinition } from "./createFilter";
import { getDefaultValues } from "./getDefaultValues";

export interface StickerDefinition {
  getBase: () => FilterDefinition;
  applyBaseAnimation: (animation: Lottie) => Promise<Lottie>;
  displayName: string;
  emojis: { emoji: string; name: string }[]; // TODO: each step can add emojis
}

export type CreateSteps = () => Promise<{
  groups: Group[];
  defaultConfig: StickerConfig;
  tags: string[];
}>;

export interface Sticker {
  createSteps: CreateSteps;
  displayName: string;
  emojis: { emoji: string; name: string }[];
}

export const createSticker = (definition: StickerDefinition): Sticker => {
  return {
    displayName: definition.displayName,
    emojis: definition.emojis,
    createSteps: async () => {
      const animation = create.sticker();
      const res = await createStepsNew(
        await definition.applyBaseAnimation(animation),
      );
      const base = definition.getBase();

      res.defaultConfig[base.id] = {
        active: true,
        ...getDefaultValues(base.inputs),
      };

      return {
        tags: res.tags,
        defaultConfig: res.defaultConfig,
        groups: [
          {
            name: "Base",
            steps: [base],
            multiple: false,
            visible: true,
          },
          ...res.groups,
        ],
      };
    },
  };
};
