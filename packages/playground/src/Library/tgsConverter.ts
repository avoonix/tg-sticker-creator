import pako from "pako";
import { Lottie } from "tg-sticker-creator";

export const tgsToObject = async (tgs: Blob) => {
  const output = pako.inflate(new Uint8Array(await tgs.arrayBuffer()));
  const text = new TextDecoder().decode(output);
  return JSON.parse(text);
};

export const objectToTgs = async (obj: Lottie) => {
  const zipped = pako.gzip(obj.toTgsString({precision: 3}), { level: 9 });

  const blob = new Blob([zipped], {
    type: "application/gzip",
  });

  return blob;
};
