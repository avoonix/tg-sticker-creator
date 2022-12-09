import AutoDownloader from "@/modules/export/AutoDownloader";
import { getSummary } from "@/modules/stickers";
import { useApiSettings } from "@/modules/stickers/useApiSettings";
import { useSticker } from "@/modules/stickers/useSticker";
import { View } from "@adobe/react-spectrum";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  stickerId: string;
}

export default function Home(props: Props) {
  const { sticker } = useSticker(props.stickerId);
  const { userSettings, userSettingsLoaded } = useApiSettings();

  return (
    <View padding="size-100">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        {sticker.displayName && userSettingsLoaded && <AutoDownloader />}
      </main>
    </View>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const stickerId = context.params?.stickerId;
  if (typeof stickerId !== "string") throw new Error("invalid id");
  return {
    props: {
      stickerId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stickers = await getSummary();
  return {
    paths: Object.keys(stickers).map((stickerId) => ({
      params: { stickerId },
    })),
    fallback: false,
  };
};
