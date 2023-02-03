import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, {}),
  displayName: "Hug",
  emojis: [
    { name: "hugging", emoji: "🫂" },
    { name: "open hands", emoji: "🤗" },
  ],
});
