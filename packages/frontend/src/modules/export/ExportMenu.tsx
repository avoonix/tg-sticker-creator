import {
  ActionButton,
  DialogContainer,
  Item,
  Menu,
  MenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import { FC, useCallback, useState } from "react";
import { Lottie } from "tg-sticker-creator";
import { generateGif } from "./generateGif";
import { generateTgs } from "./generateTgs";
import { generateVideo } from "./generateVideo";
import PngDialog from "./PngDialog";

interface Props {
  lottie: Lottie;
}

const ExportMenu: FC<Props> = ({ lottie }) => {
  const [isOpen, setOpen] = useState(false);

  const handleExport = useCallback(
    (key: string | number) => {
      if (key === "png") return setOpen(true);
      switch (key) {
        case "tgs":
          generateTgs({ lottie });
          break;
        case "gif":
          generateGif({ lottie });
          break;
        case "video":
          generateVideo({ lottie, onProgress: console.log });
          break;
      }
    },
    [setOpen, lottie],
  );

  return (
    <>
      <MenuTrigger>
        <ActionButton>
          <Export />
          <Text>Sticker Export</Text>
        </ActionButton>
        <Menu onAction={handleExport}>
          <Item key="tgs">Telegram Sticker</Item>
          <Item key="gif">GIF</Item>
          <Item key="video">Video</Item>
          <Item key="png">Single Frame (PNG)</Item>
        </Menu>
      </MenuTrigger>

      <DialogContainer onDismiss={() => setOpen(false)}>
        {isOpen && lottie && <PngDialog lottie={lottie} />}
      </DialogContainer>
    </>
  );
};

export default ExportMenu;
