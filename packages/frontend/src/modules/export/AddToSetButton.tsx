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
import { FC, useCallback, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const save = useCallback(
    async (key: string | number) => {
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
          action: String(key) as "save" | "add" | "saveAndAdd",
        });
        if(key === "save" || key === "saveAndAdd") {
          router.push("/"); // TODO: close gui if used from within bot?
        }
        console.log("response", response);
      } catch (error: any) {
        alert(error.message || error); // TODO: proper error handling
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [config, colors, sticker, auth, router, setLoading],
  );

  return (
    <div>
      <MenuTrigger>
        <Button elementType="a" variant="cta">
          {loading ? (
            <ProgressCircle isIndeterminate variant="overBackground" size="S" />
          ) : (
            <Export />
          )}
          <Text marginStart="size-100">Save/Upload</Text>
        </Button>
        <Menu onAction={save}>
          <Item key="save">Save</Item>
          <Item key="add">Add to Set</Item>
          <Item key="saveAndAdd">Save &amp; Add to Set</Item>
        </Menu>
      </MenuTrigger>
    </div>
  );
};

export default AddToSetButton;
