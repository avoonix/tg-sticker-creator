import download from "downloadjs";
import { Lottie, optimizeFilesize } from "tg-sticker-creator";
import { gzip } from "./gzip";

interface Props {
  lottie: Lottie;
}

export const generateTgs = async (props: Props) => {
  const blob = await gzip(optimizeFilesize(props.lottie.clone()));

  console.log("size in KiB", blob.size / (1 << 10));

  download(blob, `${props.lottie.name || "sticker"}.tgs`, "application/octet-stream");
};
