import { Lottie } from "tg-sticker-creator";
import { setHidden } from "./setHidden";

export const setInitialHidden = (animation: Lottie) => {
  for (const item of animation.all(["{hidden}"], { match: "indexof" })) {
    const group = item.cast("GroupShape");
    setHidden(group, true);
  }
};
