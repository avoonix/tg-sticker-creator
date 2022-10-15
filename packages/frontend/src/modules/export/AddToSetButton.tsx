import { Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import { useAtom } from "jotai";
import { FC, useCallback } from "react";
import { Lottie, optimizeFilesize } from "tg-sticker-creator";
import { paletteAtom } from "../palette/ColorList";
import { configAtom, stickerAtom } from "../stickers/useSticker";
import { authAtom } from "./auth";
import { gzip } from "./gzip";
import { saveSticker } from "./requests";

interface Props {
  lottie: Lottie;
}

const AddToSetButton: FC<Props> = (props) => {
  const [config] = useAtom(configAtom);
  const [colors] = useAtom(paletteAtom);
  const [sticker] = useAtom(stickerAtom);
  const [auth] = useAtom(authAtom);

  const save = useCallback(async () => {
    if (!auth.data || !auth.type) throw new Error("missing auth");
    console.log({ config, colors, sticker, auth });
    const response = await saveSticker({
      settings: JSON.stringify(config),
      palette: JSON.stringify(colors),
      file: await gzip(optimizeFilesize(props.lottie.clone())),
      emojis: sticker.emojis.map((e) => e.emoji).join(""),
      authData: auth.data,
      authType: auth.type,
      sticker: sticker.id,
    });

    console.log("response", response);
    // TODO
  }, [config]);

  return (
    <div>
      <Button elementType="a" variant="cta" onPress={save}>
        <Export />
        <Text>Save &amp; Add to Set (as {auth.name})</Text>
      </Button>
    </div>
  );
};

export default AddToSetButton;
