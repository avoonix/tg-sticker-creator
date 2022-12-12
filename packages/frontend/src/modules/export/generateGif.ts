import download from "downloadjs";
import { Lottie } from "tg-sticker-creator";
import { renderGif } from "./gifRenderer";

export interface Props {
  lottie: Lottie;
}

export const generateGif = async (props: Props) => {
  const fps = 60;

  const gif = await renderGif(
    props.lottie,
    {
      width: 512,
      height: 512,
      transparent: true,
      speed: 1,
      fps,
      backgroundColor: "#000000",
      quality: 50,
    },
    (p) => console.log(p),
  );

  download(gif, `${props.lottie.name || "sticker"}.gif`, gif.type); // TODO: video component: autoplay, loop
};
