import { Button, Text } from "@adobe/react-spectrum";
import Export from "@spectrum-icons/workflow/Export";
import download from "downloadjs";
import { FC, useCallback, useState } from "react";
import { Lottie } from "tg-sticker-creator";
import { generateMp4, imagesToVideo } from "./ffmpeg";
import { ImageMime, renderImages } from "./pngRenderer";
import { isSupported, renderMp4Webcodec } from "./webcodec";

interface Props {
  lottie: Lottie;
}

const VideoButton: FC<Props> = (props) => {
  const [progress, setProgress] = useState("");
  const generate = useCallback(async () => {
    const fps = 30;

    const start = performance.now();
    if (await isSupported()) {
      await renderMp4Webcodec(
        props.lottie,
        {
          width: 512,
          height: 512,
          transparent: true,
          speed: 1,
          fps,
          backgroundColor: "#000000",
        },
        (p) => setProgress(" (" + Math.floor(p.percentage * 100) + "%)"),
      );
      setProgress("");
    } else {
      const images = await renderImages(
        props.lottie,
        ImageMime.png,
        {
          width: 512,
          height: 512,
          transparent: true,
          speed: 1,
          fps,
          backgroundColor: "#000000",
        },
        (p) => console.log(p),
      );

      const video = await imagesToVideo(images, generateMp4, fps);
      console.log(video, URL.createObjectURL(video));

      download(video, `${props.lottie.name || "sticker"}.mp4`, video.type); // TODO: video component: autoplay, loop
    }

    console.log("duration", (performance.now() - start) / 1000, "s");
  }, [props.lottie]);

  return (
    <div>
      <Button elementType="a" variant="cta" onPress={generate}>
        <Export />
        <Text>Export as MP4 {progress}</Text>
      </Button>
    </div>
  );
};

export default VideoButton;
