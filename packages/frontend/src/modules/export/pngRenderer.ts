import { Lottie } from "tg-sticker-creator";
import { CanvasRenderOptions, renderOnCanvas } from "./canvas";
import { ProgressListener } from "./progress";

export enum ImageMime {
  png = "image/png",
  jpeg = "image/jpeg",
  webp = "image/webp",
  bmp = "image/bmp",
}

export const renderImages = async (
  animation: Lottie,
  type: ImageMime,
  options: CanvasRenderOptions,
  onProgress: ProgressListener,
) => {
  const images: Blob[] = [];

  await renderOnCanvas(
    animation,
    options,
    async (canvas, context, { progress }) => {
      onProgress({ percentage: progress });
      const url = canvas.toDataURL(type);
      if (!url.match(type)) {
        throw new Error(
          `exporting as ${type} is not supported by this browser`,
        );
      }
      const blob = await (await fetch(url)).blob();
      images.push(blob);
    },
  );

  return images;
};
