import LottieWeb, { AnimationConfig } from "lottie-web";
import { Lottie } from "tg-sticker-creator";

type LottieArgs = AnimationConfig<"canvas"> & {
  animationData?: any;
};

export interface CanvasRenderOptions {
  width: number;
  height: number;
  transparent: boolean;
  backgroundColor: string;
  speed: number; // TODO
  fps: number; // TODO
}

export const calculateTimings = (
  animation: { finalFrame: number; initialFrame: number; frameRate: number },
  options: { speed: number; fps: number },
) => {
  const wholeDurationInFrames = Math.round(
    // TODO: not sure if rounding is the best approach
    (((animation.finalFrame - animation.initialFrame) * (1 / options.speed)) /
      animation.frameRate) *
      options.fps,
  );
  const frameTime = 1 / options.fps;
  const durationIncrementPerFrame = 1 / wholeDurationInFrames;
  return {
    wholeDurationInFrames,
    frameTime,
    durationIncrementPerFrame,
  };
};

export const renderOnCanvas = async (
  animation: Lottie,
  options: CanvasRenderOptions,
  onFrame: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    info: { progress: number; frame: number },
  ) => Promise<void> | void,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = options.width; // animation.width
  canvas.height = options.height;
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!context) throw new Error("no context");
  const args: LottieArgs = {
    container: null as unknown as Element,
    animationData: animation.toPlain({ precision: Infinity }),
    renderer: "canvas",
    rendererSettings: {
      clearCanvas: false,
      context,
    },
  };
  const lottie = LottieWeb.loadAnimation(args as any);

  console.log("loaded animation");

  const { durationIncrementPerFrame, wholeDurationInFrames } = calculateTimings(
    animation,
    options,
  );

  for (let i = 0; i < wholeDurationInFrames; ++i) {
    console.log(`frame ${i + 1}`);
    context.fillStyle = options.backgroundColor;
    if (options.transparent) {
      context.clearRect(0, 0, options.width, options.height);
    } else {
      context.fillRect(0, 0, options.width, options.height);
    }
    const progress =
      i *
      durationIncrementPerFrame *
      (animation.finalFrame - animation.initialFrame);
    lottie.goToAndStop(progress, true);
    // console.log("after goToAndStop");
    // await new Promise((r) => setTimeout(r, 1));
    const result = onFrame(canvas, context, {
      progress: progress / wholeDurationInFrames,
      frame: progress,
    });
    if (result && "then" in result) {
      await result;
    }
    // console.log("called onFrame");
  }
};
