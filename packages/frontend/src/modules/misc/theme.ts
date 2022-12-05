import { atom } from "jotai";

const telegram = (typeof window !== "undefined" ? (window as any) : {})
  ?.Telegram?.WebApp;

export interface Theme {
  type: "dark" | "light";
}

export const themeAtom = atom<Theme>({
  type: telegram?.initData ? telegram?.colorScheme || "dark" : "dark",
});
