import download from "downloadjs";
import { FC, useEffect } from "react";
import { useGeneratedSticker } from "../stickers/useSticker";
import { renderOnCanvas } from "./canvas";
import { ImageMime } from "./pngRenderer";

const AutoDownloader: FC = (props) => {
  const { lottie } = useGeneratedSticker();
  useEffect(() => {
    if (!lottie) return;
    const start = performance.now();

    renderOnCanvas(
      lottie,
      {
        transparent: true,
        backgroundColor: "#000000",
        fps: 30,
        height: 512,
        speed: 1,
        width: 512,
      },
      async (canvas, context, { progress }) => {
        const type = ImageMime.png;
        const url = canvas.toDataURL(type);
        if (!url.match(type)) {
          throw new Error(
            `exporting as ${type} is not supported by this browser`,
          );
        }
        const blob = await (await fetch(url)).blob();
        download(blob, "file.png", type);
        console.log("duration", (performance.now() - start) / 1000, "s");
        return true;
      },
    );
  }, [lottie]);

  return <>download starting</>;
};

export default AutoDownloader;
