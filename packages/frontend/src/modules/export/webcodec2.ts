import { Lottie } from "tg-sticker-creator";
import { CanvasRenderOptions, renderOnCanvas } from "./canvas";
import { ProgressListener } from "./progress";
import * as MP4Box from "mp4box";
import download from "downloadjs";
// import CCapture from "ccapture.js";

const durationInMillisecond = 1000; // TODO: change per input
const fps = 30;
const frameTimeInMillisecond = 1000 / fps;
const totalFrames = Math.floor(durationInMillisecond / frameTimeInMillisecond);

const ms = 1000;
const timescale = 1000;

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
  // if(!("VideoEncoder" in window)) return false;

  // const result = (await VideoEncoder.isConfigSupported(config))
  // console.log("config result", result)
  // return result.supported;
  return true;
};

export const renderMp4Webcodec = async (
  animation: Lottie,
  options: CanvasRenderOptions,
  onProgress: ProgressListener,
) => {
  // const capturer = new CCapture({
  //   format: "webm",
  //   framerate: 30,
  //   // display: true,
  // });
  // capturer.start();
  console.log("start");

  let recorder: MediaRecorder | null = null as any;
  const blobs: Blob[] = [];
  if (!MediaRecorder.isTypeSupported("video/webm")) {
    console.log("webm not supported by mediarecorder");
  }

  await renderOnCanvas(
    animation,
    options,
    async (canvas, context, { progress, frame }) => {
      // TODO: fix types
      // console.log("capturing frame");
      if (!recorder) {
        const stream = canvas.captureStream(30);
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => blobs.push(e.data);
        recorder.onstop = () =>
          download(
            new Blob(blobs, { type: "video/webm" }),
            "file.webm",
            "video/webm",
          );
        recorder.start();
      }
      await new Promise(requestAnimationFrame);

      onProgress({ percentage: progress });
      // capturer.capture(canvas);
    },
  );

  console.log("save");
  // capturer.save();
  recorder?.stop();

  // custom save, will get a blob in the callback
  // capturer.save( function( blob ) { /* ... */ } );

  // let track: any = null;
  // const file = MP4Box.createFile();
  // const videoEncoder = new VideoEncoder({
  //   output: (encodedChunk, config) => {
  //     const ab = new ArrayBuffer(encodedChunk.byteLength);
  //     encodedChunk.copyTo(ab);
  //     if (track === null) {
  //       const trackOptions = {
  //         timescale: timescale * ms,
  //         width: 512,
  //         height: 512,
  //         nb_samples: totalFrames,
  //         avcDecoderConfigRecord: config.decoderConfig?.description,
  //       };
  //       track = file.addTrack(trackOptions);
  //     }
  //     const sampleOptions = {
  //       duration: frameTimeInMillisecond * timescale,
  //       dts: encodedChunk.timestamp * 1000,
  //       cts: encodedChunk.timestamp * 1000,
  //       is_sync: encodedChunk.type === "key",
  //     };

  //     console.log(encodedChunk.timestamp);
  //     file.addSample(track, ab, sampleOptions);
  //   },
  //   error: (error) => {
  //     console.log("onCodecError ", error);
  //   },
  // });

  // videoEncoder.configure(config);

  // await renderOnCanvas(
  //   animation,
  //   options,
  //   async (canvas, context, { progress, frame }) => {
  //     onProgress({ percentage: progress });
  //     createImageBitmap(canvas).then((bmp) => {
  //       const videoFrame = new VideoFrame(bmp, {
  //         timestamp: durationInMillisecond * progress,
  //       });
  //       videoEncoder.encode(videoFrame);
  //       videoFrame.close();
  //     });
  //   },
  // );
  // videoEncoder.close();
  // file.save("test.mp4");
  // console.log("completed !", file);
};
