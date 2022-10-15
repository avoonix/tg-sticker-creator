import { Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import download from "downloadjs";
import { FC, useCallback } from "react";
import { Lottie } from "tg-sticker-creator";
import { generateGif, imagesToVideo } from "./ffmpeg";
import { renderGif } from "./gifRenderer";
import { ImageMime, renderImages } from "./pngRenderer";

interface Props {
  lottie: Lottie;
}

const GifButton: FC<Props> = (props) => {
  const generate = useCallback(async () => {
    const fps = 60;

    const gif = await renderGif(
      props.lottie,
      {
        width: 512,
        height: 512,
        transparent: true,
        speed: 1,
        fps,
        backgroundColor: "#000000",
        quality: 50,
      },
      (p) => console.log(p),
    );

    download(gif, `${props.lottie.name || "sticker"}.gif`, gif.type); // TODO: video component: autoplay, loop
  }, [props.lottie]);

  return (
    <div>
      <Button elementType="a" variant="cta" onPress={generate}>
        <Export />
        <Text>Export as GIF</Text>
      </Button>
    </div>
  );
};

export default GifButton;
