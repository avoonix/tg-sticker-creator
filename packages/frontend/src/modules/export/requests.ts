export interface SaveStickerArgs {
  file: Blob;
  emojis: string;
  authData: string;
  authType: "web-app" | "telegram-login";
  settings: string;
  palette: string;
  sticker: string;
}
export interface GetSettingsArgs {
  authData: string;
  authType: "web-app" | "telegram-login";
}

export interface GetSettingArgs {
  id: string;
}

export const saveSticker = async (args: SaveStickerArgs) => {
  const data = new FormData();
  data.append("file", args.file);
  data.append("emojis", args.emojis);
  data.append("auth_type", args.authType);
  data.append("auth_data", args.authData);
  data.append("settings", args.settings);
  data.append("palette", args.palette);
  data.append("sticker", args.sticker);

  const resp = await fetch("https://tg-sticker-bot.vercel.app/api/upload", {
    method: "POST",
    body: data,
  });

  if (resp.status >= 400) {
    throw new Error(await resp.text());
  }

  return resp.json();
};

export const getSettings = async (args: GetSettingsArgs) => {
  const data = new FormData();
  data.append("auth_type", args.authType);
  data.append("auth_data", args.authData);

  const resp = await fetch("https://tg-sticker-bot.vercel.app/api/settings", {
    method: "POST",
    body: data,
  });
  return resp.json();
};

export const getSetting = async (args: GetSettingArgs) => {
  const resp = await fetch(
    `https://tg-sticker-bot.vercel.app/api/settings/${encodeURIComponent(
      args.id,
    )}`,
    { method: "GET" },
  );
  return resp.json();
};
