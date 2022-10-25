import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import StepGroups from "@/modules/editor/StepGroups";
import StickerRenderer from "@/modules/editor/StickerRenderer";
import AddToSetButton from "@/modules/export/AddToSetButton";
import { authAtom } from "@/modules/export/auth";
import GifButton from "@/modules/export/GifButton";
import TgsButton from "@/modules/export/TgsButton";
import VideoButton from "@/modules/export/VideoButton";
import ColorList from "@/modules/palette/ColorList";
import { getSummary } from "@/modules/stickers";
import { useApiSettings } from "@/modules/stickers/useApiSettings";
import { useGeneratedSticker, useSticker } from "@/modules/stickers/useSticker";
import {
  ActionButton,
  Heading,
  Item,
  Menu,
  MenuTrigger,
  View,
} from "@adobe/react-spectrum";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { InView } from "react-intersection-observer";

interface Props {
  stickerId: string;
}

export default function Home(props: Props) {
  const [stickerId, setStickerId] = useState(props.stickerId);
  // const { sticker } = useSticker(props.stickerId);
  const { sticker } = useSticker(stickerId);
  const { lottie } = useGeneratedSticker();
  const [auth] = useAtom(authAtom);

  const { userSettings } = useApiSettings();

  const stickers = ["halloween", "popping", "headpats"];

  console.log("user settings", userSettings);

  return (
    <View padding="size-100">
      <Head>
        {/* <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading level={1}>Edit</Heading>
        {lottie && (
          <>
            {auth.type !== "web-app" && (
              <>
                <GifButton lottie={lottie} />
                <TgsButton lottie={lottie} />
                <VideoButton lottie={lottie} />
              </>
            )}
            {auth.data && <AddToSetButton lottie={lottie} />}
          </>
        )}
        <StickerBreadcrumb stickerName={sticker.displayName} />
        <ColorList />
        <MenuTrigger>
          <ActionButton>Convert to other sticker type</ActionButton>
          <Menu onAction={(key: any) => setStickerId(key)}>
            {stickers.map((s) => (
              <Item key={s}>{s}</Item>
            ))}
          </Menu>
        </MenuTrigger>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <View maxWidth="size-5000" width="size-5000">
            <InView>
              {({ inView, ref, entry }) => (
                <div
                  style={{
                    backgroundColor: "#bf8a0f",
                    borderRadius:
                      "var(--spectrum-button-primary-border-radius,var(--spectrum-alias-border-radius-large))",
                  }}
                  ref={ref}
                >
                  {inView ? (
                    <StickerRenderer sticker={lottie} />
                  ) : (
                    <div style={{ aspectRatio: 1, width: "100%" }}></div>
                  )}
                </div>
              )}
            </InView>
          </View>
        </div>
        <StepGroups groups={sticker.groups} />
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
