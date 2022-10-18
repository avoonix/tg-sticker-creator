import { Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const save = useCallback(async () => {
    if (!auth.data || !auth.type) throw new Error("missing auth");
    const file = await gzip(optimizeFilesize(props.lottie.clone()));
    console.log("size in KiB", file.size / (1 << 10));
    const response = await saveSticker({
      settings: JSON.stringify(config),
      palette: JSON.stringify(colors),
      file,
      emojis: sticker.emojis.map((e) => e.emoji).join(""),
      authData: auth.data,
      authType: auth.type,
      sticker: sticker.id,
    });

    router.push("/"); // TODO: close gui if used from within bot
    console.log("response", response);
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
