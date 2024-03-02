import DisableSsr from "@/modules/misc/DisableSsr";
import Introduction from "@/modules/misc/Introduction";
import Title from "@/modules/misc/Title";
import VideoCardList from "@/modules/overview/VideoCardList";
import { VideoEntry } from "@/modules/overview/VideoEntry";
import { Heading, View } from "@adobe/react-spectrum";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

export interface Props {
  videos: VideoEntry[];
}

export default function Home(props: Props) {
  const [savedEntries, setSavedEntries] = useState<VideoEntry[]>([]);

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
          <Introduction />
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
