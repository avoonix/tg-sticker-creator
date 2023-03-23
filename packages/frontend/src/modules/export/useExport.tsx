import download from "downloadjs";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { paletteAtom } from "../palette/ColorList";
import { configAtom } from "../stickers/configAtom";

export const useExport = () => {
  const [config] = useAtom(configAtom);
  const [palette] = useAtom(paletteAtom);

  const downloadJson = useCallback(() => {
    download(
      JSON.stringify({ settings: config, palette }),
      "sticker-settings.json",
      "application/json",
    );
  }, [config]);

  return {
    downloadJson,
  };
};
