import { ActionButton, Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import download from "downloadjs";
import { useAtom } from "jotai";
import { FC, useCallback } from "react";
import { paletteAtom } from "../palette/ColorList";
import { configAtom } from "../stickers/useSticker";

const JsonExportButton: FC = () => {
  const [config] = useAtom(configAtom);
  const [palette] = useAtom(paletteAtom);

  const downloadJson = useCallback(() => {
    download(
      JSON.stringify({ settings: config, palette }),
      "sticker-settings.json",
      "application/json",
    );
  }, [config]);

  return (
    <div>
      <ActionButton onPress={downloadJson}>
        <Export />
        <Text>Export to File</Text>
      </ActionButton>
    </div>
  );
};

export default JsonExportButton;
