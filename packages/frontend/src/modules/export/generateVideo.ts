import download from "downloadjs";
import { Lottie } from "tg-sticker-creator";
import { generateMp4, imagesToVideo } from "./ffmpeg";
import { ImageMime, renderImages } from "./pngRenderer";
import { ProgressListener } from "./progress";
import { isSupported, renderMp4Webcodec } from "./webcodec";

interface Props {
  lottie: Lottie;
  onProgress: ProgressListener;
}

export const generateVideo = async (props: Props) => {
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
      props.onProgress,
    );
    // onProgress()
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
      props.onProgress,
    );

    const video = await imagesToVideo(images, generateMp4, fps);
    console.log(video, URL.createObjectURL(video));

    download(video, `${props.lottie.name || "sticker"}.mp4`, video.type); // TODO: video component: autoplay, loop
  }

  console.log("duration", (performance.now() - start) / 1000, "s");
};
