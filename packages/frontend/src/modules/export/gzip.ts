import pako from "pako";
import { Lottie } from "tg-sticker-creator";

export const ungzip = async (tgs: Blob) => {
  const output = pako.inflate(new Uint8Array(await tgs.arrayBuffer()));
  const text = new TextDecoder().decode(output);
  return JSON.parse(text);
};

export const gzip = async (obj: Lottie) => {
  const tgsString = obj.toTgsString({ precision: 4 }); // TODO: change precision?
  const zipped = pako.gzip(tgsString, { level: 9 });

  const blob = new Blob([zipped], {
    type: "application/gzip",
  });

  // TODO: warning if blob.size > 64 << 10

  return blob;
};
