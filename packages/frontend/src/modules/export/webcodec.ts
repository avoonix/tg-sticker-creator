import { Lottie } from "tg-sticker-creator";
import { CanvasRenderOptions, renderOnCanvas } from "./canvas";
import { ProgressListener } from "./progress";
import download from "downloadjs";

const config: VideoEncoderConfig = {
  codec: "avc1.42001E",
  width: 512,
  height: 512,
  // hardwareAcceleration: "prefer-hardware",
  avc: { format: "avc" },
};

// await VideoEncoder.isConfigSupported({

//   codec: "avc1",
//   width: 512,
//   height: 512,
//   avc: { format: "annexb" },
// })

export const isSupported = async () => {
  return true;
};

export const renderMp4Webcodec = async (
  animation: Lottie,
  options: CanvasRenderOptions,
  onProgress: ProgressListener,
) => {
  const capturer = new CCapture({
    format: "webm",
    framerate: 30,
    // display: true,
  });
  capturer.start();
  console.log("start");

  await renderOnCanvas(
    animation,
    options,
    (canvas, context, { progress, frame }) => {
      // TODO: fix types
      console.log("capturing frame");
      // await new Promise(requestAnimationFrame);

      onProgress({ percentage: progress });
      capturer.capture(canvas);
    },
  );

  capturer.save();

  // custom save, will get a blob in the callback
  // capturer.save( function( blob ) { /* ... */ } );
};
