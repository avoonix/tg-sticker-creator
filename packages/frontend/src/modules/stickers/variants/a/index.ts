import { createSticker } from "../../utilities";
import { base } from "./base";

export default createSticker({
  getBase: () => base(),
  applyBaseAnimation: (animation) => base().apply(animation, {}),
  displayName: "a",
  emojis: [
    { name: "a", emoji: "🅰️" },
    { name: "a", emoji: "📢" },
    { name: "a", emoji: "🔊" },
    { name: "a", emoji: "🗣" },
    { name: "squinting", emoji: "😆" },
    { name: "exclamation", emoji: "❗" },
    { name: "exclamation", emoji: "❕" },
  ],
});
