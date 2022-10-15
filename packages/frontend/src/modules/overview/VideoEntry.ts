import { Emoji } from "../emojis/Emoji";

export interface VideoEntry {
  url: string;
  name: string;
  emojis: Emoji[];
  stickerId: string;
  settingId?: string;
}
