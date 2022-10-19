import { authAtom, useUpdateAuthData } from "@/modules/export/auth";
import { getSettings } from "@/modules/export/requests";
import VideoCardList from "@/modules/overview/VideoCardList";
import { VideoEntry } from "@/modules/overview/VideoEntry";
import { Heading, View } from "@adobe/react-spectrum";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const videos: VideoEntry[] = [
  {
    url: "https://tg-sticker-bot.vercel.app/api/dev/headpats/null/video.webm",
    emojis: [
      { name: "waving", encoded: "👋" },
      { name: "love", encoded: "🥰" },
      { name: "hearts", encoded: "💕" },
    ],
    name: "Headpats",
    stickerId: "headpats",
  },
  // {
  //   url: "https://bafybeihuhrc4fwpvqwyyjmycl6yc32jde6z4ri4uejvonwp3m3axitxl7u.ipfs.dweb.link/video.webm",
  //   emojis: [
  //     { encoded: "🍕", name: "Pizza" },
  //     { encoded: "❤️", name: "Heart" },
  //   ],
  //   name: "Heart",
  //   stickerId: "heart",
  // },
  // {
  //   url: "https://bafybeihuhrc4fwpvqwyyjmycl6yc32jde6z4ri4uejvonwp3m3axitxl7u.ipfs.dweb.link/video.webm",
  //   emojis: [
  //     { encoded: "🍕", name: "Pizza" },
  //     { encoded: "❤️", name: "Heart" },
  //   ],
  //   name: "A",
  //   stickerId: "a",
  // },
  {
    url: "https://tg-sticker-bot.vercel.app/api/dev/popping/null/video.webm",
    emojis: [
      { name: "cat", encoded: "🐱" },
      { name: "open mouth", encoded: "😮" },
      { name: "screaming cat", encoded: "🙀" },
      { name: "popping cork", encoded: "🍾" },
      { name: "bubbles", encoded: "🫧" },
    ],
    name: "Popping",
    stickerId: "popping",
  },
  {
    url: "https://tg-sticker-bot.vercel.app/api/dev/halloween/null/video.webm",
    emojis: [{ name: "eyes", encoded: "👀" }],
    name: "Halloween",
    stickerId: "halloween",
  },
  // {
  //   url: "https://bafybeihuhrc4fwpvqwyyjmycl6yc32jde6z4ri4uejvonwp3m3axitxl7u.ipfs.dweb.link/video.webm",
  //   emojis: [
  //     { encoded: "🍕", name: "Pizza" },
  //     { encoded: "❤️", name: "Heart" },
  //   ],
  //   name: "Attribution",
  //   stickerId: "attribution",
  // },
];

export default function Home() {
  const router = useRouter();
  const [auth] = useAtom(authAtom);
  const [savedEntries, setSavedEntries] = useState<VideoEntry[]>([]);
  const { updateAuthData } = useUpdateAuthData();

  useEffect(() => {
    if (!auth.data || !auth.type) {
      console.log("no auth data, skipping fetch");
      return;
    }
    if (savedEntries.length) {
      console.log("stickers already fetched");
      return;
    }
    getSettings({
      authData: auth.data,
      authType: auth.type,
    })
      .then((saved) => {
        setSavedEntries(
          saved.map(
            (s: any) =>
              ({
                url: `https://tg-sticker-bot.vercel.app/api/dev/${s.sticker}/${s.id}/video.webm`,
                emojis: [
                  { encoded: "🍕", name: "Pizza" },
                  { encoded: "❤️", name: "Heart" },
                ],
                name: s.id,
                stickerId: s.sticker,
                settingId: s.id,
              } as VideoEntry),
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [auth]);

  useEffect(() => {
    if (!router.query.hash) return;
    console.log(router);
    const data = JSON.stringify(
      Object.fromEntries(
        Object.entries(router.query).filter(([key]) =>
          [
            "id",
            "first_name",
            "username",
            "photo_url",
            "auth_date",
            "hash",
          ].includes(key),
        ),
      ),
    );
    updateAuthData(data);
    router.replace(router.route); // route without query
  }, [router.query]);

  return (
    <View padding="size-100">
      <Head>
        <title>Avoo's Sticker Stash - Telegram Sticker Templates</title>
        <meta
          name="description"
          content="Create your custom sticker pack for telegram in minutes."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading level={1} UNSAFE_style={{ textAlign: "center" }}>
          <img
            src="/favicon.svg"
            alt="Logo"
            style={{
              width: "2em",
              height: "2em",
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />
          <span style={{ color: "#bf8a0f" }}>A</span>voo's{" "}
          <span style={{ color: "#bf8a0f" }}>S</span>ticker{" "}
          <span style={{ color: "#bf8a0f" }}>S</span>tash
        </Heading>
        your own
        <VideoCardList videos={savedEntries} />
        other
        <VideoCardList videos={videos} />
      </main>
    </View>
  );
}
