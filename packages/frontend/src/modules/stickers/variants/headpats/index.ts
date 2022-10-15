import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) =>
    base().apply(animation, { duration: 1, easing: "ease" }),
  displayName: "Headpats",
  emojis: [
    { name: "waving", emoji: "👋" },
    { name: "love", emoji: "🥰" },
    { name: "hearts", emoji: "💕" },
  ],
});
