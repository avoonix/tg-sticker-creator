import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

const getCoreUrl = async () => {
  // const mod = await import("@ffmpeg/core/dist/ffmpeg-core.js?raw");
  // return URL.createObjectURL(new Blob([mod.default]));
  // const mod = await import("@ffmpeg/core/dist/ffmpeg-core.js?url");
  // return mod.default
  return "/ffmpeg/ffmpeg-core.js";
};

type GenerateFn = (ffmpeg: FFmpeg, fps: number) => Promise<Blob>;

export const generateGif: GenerateFn = async (ffmpeg, fps) => {
  await ffmpeg.run(
    "-pattern_type",
    "glob",
    "-i",
    "*.png",
    "-vf",
    "palettegen=reserve_transparent=1",
    "palette.png",
  );
  await ffmpeg.run(
    "-framerate",
    fps.toFixed(0),
    "-f",
    "image2",
    "-pattern_type",
    "glob",
    "-i",
    "*.png",
    "-lavfi",
    "paletteuse=alpha_threshold=128",
    "-gifflags",
    "-offsetting",
    "out.gif",
  );

  const data = ffmpeg.FS("readFile", "out.gif");
  ffmpeg.FS("unlink", "out.gif");
  ffmpeg.FS("unlink", "palette.png");
  return new Blob([data.buffer], { type: "image/gif" });
};

export const generateMp4: GenerateFn = async (ffmpeg, fps) => {
  await ffmpeg.run(
    "-framerate",
    fps.toFixed(0),
    "-f",
    "image2",
    "-pattern_type",
    "glob",
    "-i",
    "*.png",
    "-c:v",
    "libx264",
    "-crf",
    "27",
    "-pix_fmt",
    "yuv420p",
    "out.mp4",
  );

  const data = ffmpeg.FS("readFile", "out.mp4");
  ffmpeg.FS("unlink", "out.mp4");
  return new Blob([data.buffer], { type: "video/mp4" });
};

export const imagesToVideo = async (
  images: Blob[],
  generate: GenerateFn,
  fps = 60,
) => {
  const ffmpeg = createFFmpeg({
    log: true,
    progress: (p) => console.log("ffmpeg:", p),
    corePath: await getCoreUrl(),
  });
  await ffmpeg.load();
  for (let i = 0; i < images.length; ++i) {
    const num = i.toFixed(0).padStart(5, "0");
    ffmpeg.FS("writeFile", `tmp.${num}.png`, await fetchFile(images[i]));
  }

  const blob = await generate(ffmpeg, fps);

  for (let i = 0; i < images.length; ++i) {
    const num = i.toFixed(0).padStart(5, "0");
    ffmpeg.FS("unlink", `tmp.${num}.png`);
  }

  return blob;
};
