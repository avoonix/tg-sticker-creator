import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, { motion: "med" }),
  displayName: "Paws",
  emojis: [
    { name: "paws", emoji: "🐾" },
    { name: "feet", emoji: "👣" },
  ],
});
