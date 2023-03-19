import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, { }),
  displayName: "Heart",
  emojis: [{ name: "heart", emoji: "❤️" }],
});
