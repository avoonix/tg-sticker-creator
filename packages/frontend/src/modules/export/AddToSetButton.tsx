import {
  Button,
  Item,
  Menu,
  MenuTrigger,
  ProgressCircle,
  Text,
} from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useState } from "react";
import { Lottie, optimizeFilesize } from "tg-sticker-creator";
import { paletteAtom } from "../palette/ColorList";
import { configAtom } from "../stickers/configAtom";
import { stickerAtom } from "../stickers/useSticker";
import { authAtom } from "./auth";
import { gzip } from "./gzip";
import { saveSticker } from "./requests";

type ActionType = "save" | "add" | "saveAndAdd";

interface Props {
  lottie: Lottie;
  action: ActionType;
  children: ReactNode;
}

const AddToSetButton: FC<Props> = (props) => {
  const [config] = useAtom(configAtom);
  const [colors] = useAtom(paletteAtom);
  const [sticker] = useAtom(stickerAtom);
  const [auth] = useAtom(authAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const save = useCallback(async () => {
    if (!auth.data || !auth.type) throw new Error("missing auth");
    setLoading(true);
    try {
      const file = await gzip(optimizeFilesize(props.lottie.clone()));
      // TODO: refactor
      const response = await saveSticker({
        settings: JSON.stringify(config),
        palette: JSON.stringify(colors),
        file,
        emojis: sticker.emojis.map((e) => e.emoji).join(""),
        authData: auth.data,
        authType: auth.type,
        sticker: sticker.id,
        action: props.action,
      });
      if (props.action === "save" || props.action === "saveAndAdd") {
        router.push(router.asPath.replace(/step\/\d/, "step/4"));
      }
      console.log("response", response);
    } catch (error: any) {
      alert(error.message || error); // TODO: proper error handling
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [config, colors, sticker, auth, router, setLoading, props]);

  return (
    <Button variant="cta" onPress={save}>
      {loading ? (
        <ProgressCircle isIndeterminate variant="overBackground" size="S" />
      ) : (
        <Export />
      )}
      <Text marginStart="size-100">{props.children}</Text>
    </Button>
  );
};

export default AddToSetButton;
