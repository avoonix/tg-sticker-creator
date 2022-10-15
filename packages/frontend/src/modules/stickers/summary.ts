import { stickers } from "./getSticker";
import { Sticker } from "./utilities";

export const getSummary = async (): Promise<{
  [key: string]: {
    displayName: string;
    emojis: {
      emoji: string;
      name: string;
    }[];
  };
}> =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(stickers).map(async ([id, def]) => {
        const sticker = (await def?.())?.default as Sticker;
        return [
          id,
          {
            displayName: sticker.displayName,
            emojis: sticker.emojis,
          },
        ] as const;
      }),
    ),
  );

export const getStickerInfo = async (
  name: string,
): Promise<{
  displayName: string;
  emojis: {
    emoji: string;
    name: string;
  }[];
} | null> => (await getSummary())[name] || null;
