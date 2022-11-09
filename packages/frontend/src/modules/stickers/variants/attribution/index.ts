import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, {}),
  displayName: "Attribution",
  emojis: [
    { name: "info", emoji: "ℹ️" },
    { name: "writing", emoji: "✍️" },
  ],
});
