import { FC, useEffect } from "react";
import { useGeneratedSticker } from "../stickers/useSticker";
import { renderMp4Webcodec } from "./webcodec2";

const AutoDownloader: FC = (props) => {
  const { lottie } = useGeneratedSticker();
  useEffect(() => {
    if (!lottie) return;
    const fps = 30;
    const start = performance.now();

    renderMp4Webcodec(
      lottie,
      {
        width: 512,
        height: 512,
        transparent: true,
        speed: 1,
        fps,
        backgroundColor: "#000000",
      },
      (p) => console.log(p),
    ).then(() => {
      console.log("duration", (performance.now() - start) / 1000, "s");
    });
  }, [lottie]);

  return <>download starting</>;
};

export default AutoDownloader;
