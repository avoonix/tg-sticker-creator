import { atom, useSetAtom } from "jotai";

const telegram = (typeof window !== "undefined" ? (window as any) : {})
  ?.Telegram?.WebApp;

export interface Auth {
  type?: "web-app" | "telegram-login";
  data?: string; // data submitted to server for validation
  name?: string;
  photoUrl?: string;
}

const getAuthData = (): Auth => {
  if (telegram?.initDataUnsafe?.user)
    return {
      data: telegram?.initData,
      name:
        telegram?.initDataUnsafe?.user?.first_name ||
        telegram?.initDataUnsafe?.user?.username ||
        "User",
      type: "web-app",
    };
  if (typeof localStorage === "undefined") return {};
  const data = localStorage.getItem("auth-data");
  if (!data) return {};
  const parsed = JSON.parse(data);

  return {
    data,
    type: "telegram-login",
    name: parsed.username || parsed.first_name || "user",
    photoUrl: parsed.photo_url,
  };
};

export const useUpdateAuthData = () => {
  const set = useSetAtom(authAtom);
  const updateAuthData = (data: string) => {
    localStorage.setItem("auth-data", data);
    set(getAuthData());
  };

  return {
    updateAuthData,
  };
};

export const authAtom = atom<Auth>(getAuthData());
