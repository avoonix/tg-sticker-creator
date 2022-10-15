import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, { base: "white" }),
  displayName: "Popping",
  emojis: [
    { name: "cat", emoji: "🐱" },
    { name: "open mouth", emoji: "😮" },
    { name: "screaming cat", emoji: "🙀" },
    { name: "popping cork", emoji: "🍾" },
    { name: "bubbles", emoji: "🫧" },
  ],
});
