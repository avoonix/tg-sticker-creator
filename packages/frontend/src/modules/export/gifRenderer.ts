import GIF from "gif.js";
import { Lottie } from "tg-sticker-creator";
import { CanvasRenderOptions, renderOnCanvas } from "./canvas";
import { ProgressListener } from "./progress";

export const renderGif = async (
  animation: Lottie,
  options: CanvasRenderOptions & { quality: number },
  onProgress: ProgressListener,
) => {
  const transparent = options.transparent ? "#C1876B" : undefined;
  const gif = new GIF({
    workerScript: "/gif.worker.js",
    workers: 4,
    // quality: options.quality / 100,
    width: 512,
    height: 512,
    // quality: 1,
    quality: 0.7,
    // dither: false,
    dither: "FloydSteinberg",
    transparent: undefined,
    // background: transparent,
    // width: animation.width,
    // height: animation.height,
    // transparent
    // background: "red",
    background: transparent,
  });

  await renderOnCanvas(
    animation,
    { ...options, transparent: false, backgroundColor: "#C1876B" },
    async (canvas, context, { progress }) => {
      onProgress({ percentage: 0.5 * progress });
      gif.addFrame(canvas, {
        copy: true,
        delay: (1 / options.fps) * 1000,
      });
    },
  );
  onProgress({ percentage: 0.5 });

  return new Promise<Blob>((resolve) => {
    gif.on("progress", (percent) => {
      onProgress({ percentage: 0.5 + percent * 0.5 });
    });
    gif.on("finished", (blob) => {
      onProgress({ percentage: 1 });
      resolve(blob);
    });
    gif.render();
  });
};
