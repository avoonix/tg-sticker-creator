import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, {}),
  displayName: "Halloween",
  emojis: [{ name: "eyes", emoji: "👀" }],
});
