import { Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import { FC, useCallback } from "react";
import { Lottie, optimizeFilesize } from "tg-sticker-creator";
import download from "downloadjs";
import { gzip } from "./gzip";

interface Props {
  lottie: Lottie;
}

const TgsButton: FC<Props> = (props) => {
  const generate = useCallback(async () => {
    const blob = await gzip(optimizeFilesize(props.lottie.clone()));

    download(blob, `${props.lottie.name || "sticker"}.tgs`, "application/gzip");
  }, [props.lottie]);

  return (
    <div>
      <Button elementType="a" variant="cta" onPress={generate}>
        <Export />
        <Text>Export as TGS</Text>
      </Button>
    </div>
  );
};

export default TgsButton;
