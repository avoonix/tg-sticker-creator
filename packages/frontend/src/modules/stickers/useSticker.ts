import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai/optics";
import { useEffect, useState } from "react";
import { Lottie } from "tg-sticker-creator";
import { paletteAtom } from "../palette/ColorList";
import { execute, StickerConfig } from "./execute";
import { getSticker } from "./getSticker";
import { mergeConfig } from "./utilities/merge";

type Config = NonNullable<Awaited<ReturnType<typeof getSticker>>>;

export const stickerAtom = atom<Config>({
  groups: [],
  defaultConfig: {},
  tags: [],
  displayName: "",
  emojis: [],
  id: "",
});
export const configAtom = atom<StickerConfig>({});

export const useSticker = (id: string) => {
  const [sticker, setSticker] = useAtom(stickerAtom);
  const [config, setConfig] = useAtom(configAtom);

  useEffect(() => {
    if (sticker?.id === id) return;
    (async () => {
      const sticker = await getSticker(id);
      if (!sticker) {
        return alert("sticker not found"); // TODO: proper notification
      }
      setSticker(sticker);
      setConfig((old) => mergeConfig(sticker.defaultConfig, old));
    })();
  }, [id, sticker]);

  return {
    sticker,
  };
};

export const getConfigAtom = (stepId: string) =>
  focusAtom(configAtom, (optic) => optic.prop(stepId));

export const useGeneratedSticker = (
  args: { enable?: string[]; disable?: string[] } = {},
) => {
  // TODO: use user config

  const [lottie, setLottie] = useState<Lottie | null>(null);
  const [sticker] = useAtom(stickerAtom);
  const [config] = useAtom(configAtom);
  const [colors] = useAtom(paletteAtom);

  useEffect(() => {
    setLottie(null);
    if (!sticker.groups.length) return;
    execute(sticker.groups, config, colors, args.enable, args.disable).then(
      (lottie) => {
        setLottie(lottie);
      },
    );
  }, [sticker, sticker.groups, config, colors]);

  return {
    lottie,
  };
};
