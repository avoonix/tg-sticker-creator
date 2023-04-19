import { getStickerInfo } from "./summary";
import { Sticker } from "./utilities";

export const stickers: {
  [idx: string]: (() => Promise<{ default: Sticker }>) | undefined;
} = {
  headpats: () => import("./variants/headpats"),
  a: () => import("./variants/a"),
  popping: () => import("./variants/popping"),
  halloween: () => import("./variants/halloween"),
  hug: () => import("./variants/hug"),
  attribution: () => import("./variants/attribution"),
  paws: () => import("./variants/paws"),
  heart: () => import("./variants/heart"),
  plushie: () => import("./variants/plushie"),
};

export const getSticker = async (id: string) => {
  const sticker = await (await stickers[id]?.())?.default.createSteps();
  if (!sticker) return null;
  const meta = await getStickerInfo(id);
  if (!meta) return null;
  return {
    ...meta,
    ...sticker,
    id,
  };
};
