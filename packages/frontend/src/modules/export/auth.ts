import { atom } from "jotai";

export interface Auth {
  type?: "web-app" | "telegram-login";
  data?: string; // data submitted to server for validation

  name?: string;
  photoUrl?: string;
}

export const authAtom = atom<Auth>({
  data:
    typeof localStorage !== "undefined"
      ? localStorage.getItem("auth-data") ?? undefined
      : undefined,
  type: "telegram-login",
  name: "username", // TODO
  photoUrl: "https://via.placeholder.com/150",
});
