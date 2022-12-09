import { authAtom } from "@/modules/export/auth";
import { getSettings } from "@/modules/export/requests";
import DisableSsr from "@/modules/misc/DisableSsr";
import Introduction from "@/modules/misc/Introduction";
import Title from "@/modules/misc/Title";
import VideoCardList from "@/modules/overview/VideoCardList";
import { VideoEntry } from "@/modules/overview/VideoEntry";
import { Heading, View } from "@adobe/react-spectrum";
import { useAtom } from "jotai";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export interface Props {
  videos: VideoEntry[];
}

export default function Home(props: Props) {
  const [auth] = useAtom(authAtom);
  const [savedEntries, setSavedEntries] = useState<VideoEntry[]>([]);

  const loggedIn = !!auth.data;

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
                emojis: [],
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
  }, [auth, savedEntries.length]);

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
        <Title />
        <DisableSsr>
          {loggedIn ? (
            <>
              {savedEntries?.length ? (
                <>
                  <Heading level={2}>Saved Templates</Heading>
                  <VideoCardList videos={savedEntries} />
                </>
              ) : null}
            </>
          ) : (
            <Introduction />
          )}
        </DisableSsr>
        <Heading level={2}>Starter Templates</Heading>
        <VideoCardList videos={props.videos} />
      </main>
    </View>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { default: videos } = await import(
    "../modules/stickers/globalStickers.json"
  );
  return {
    props: {
      videos,
    },
  };
};
