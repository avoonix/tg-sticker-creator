import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, {}),
  displayName: "Plushie",
  emojis: [
    { name: "teddy", emoji: "🧸" },
    { name: "drool", emoji: "🤤" },
  ],
});
