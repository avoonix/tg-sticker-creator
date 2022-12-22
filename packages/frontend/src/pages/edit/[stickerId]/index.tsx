import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import { animateAtom } from "@/modules/editor/animate";
import StepGroups from "@/modules/editor/StepGroups";
import StickerRenderer from "@/modules/editor/StickerRenderer";
import AddToSetButton from "@/modules/export/AddToSetButton";
import { authAtom } from "@/modules/export/auth";
import ExportMenu from "@/modules/export/ExportMenu";
import SettingsMenu from "@/modules/export/SettingsMenu";
import ColorList from "@/modules/palette/ColorList";
import { getSummary } from "@/modules/stickers";
import { useApiSettings } from "@/modules/stickers/useApiSettings";
import { useGeneratedSticker, useSticker } from "@/modules/stickers/useSticker";
import {
  Switch,
  ActionButton,
  Heading,
  Item,
  Menu,
  MenuTrigger,
  Text,
  View,
} from "@adobe/react-spectrum";
import SwitchIcon from "@spectrum-icons/workflow/Switch";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { InView } from "react-intersection-observer";

interface Props {
  stickerId: string;
  stickers: {
    id: string;
    name: string;
  }[];
}

export default function Home(props: Props) {
  const [stickerId, setStickerId] = useState(props.stickerId);
  // const { sticker } = useSticker(props.stickerId);
  const { sticker } = useSticker(stickerId);
  const { lottie } = useGeneratedSticker();
  const [auth] = useAtom(authAtom);

  const { userSettings } = useApiSettings();

  const [animatePreviews, setAnimatePreviews] = useAtom(animateAtom);

  return (
    <View padding="size-100">
      <Head>
        <title>
          {sticker.displayName} Telegram Sticker Template - Avoo's Sticker Stash
        </title>
      </Head>

      <main>
        <Heading level={1}>Edit</Heading>
        <View
          UNSAFE_style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--spectrum-global-dimension-size-65)",
            flexWrap: "wrap",
          }}
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-250"
        >
          <Switch isSelected={animatePreviews} onChange={setAnimatePreviews}>
            Animate Previews
          </Switch>
          {auth.type !== "web-app" && <SettingsMenu />}
          {auth.type !== "web-app" && lottie && <ExportMenu lottie={lottie} />}
          <MenuTrigger>
            <ActionButton>
              <SwitchIcon />
              <Text>Change Template</Text>
            </ActionButton>
            <Menu onAction={(key: any) => setStickerId(key)}>
              {props.stickers.map((s) => (
                <Item key={s.id}>{s.name}</Item>
              ))}
            </Menu>
          </MenuTrigger>
          {lottie && <>{auth.data && <AddToSetButton lottie={lottie} />}</>}
        </View>
        <StickerBreadcrumb stickerName={sticker.displayName} />
        <ColorList />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <View maxWidth="size-5000" width="size-5000">
            <InView>
              {({ inView, ref, entry }) => (
                <div
                  style={{
                    backgroundColor:
                      "var(--spectrum-global-color-static-blue-600)",
                    borderRadius:
                      "var(--spectrum-button-primary-border-radius,var(--spectrum-alias-border-radius-large))",
                  }}
                  ref={ref}
                >
                  {inView ? (
                    <StickerRenderer sticker={lottie} animate />
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
  const stickers = await getSummary();
  if (typeof stickerId !== "string") throw new Error("invalid id");
  return {
    props: {
      stickerId,
      stickers: Object.entries(stickers).map(
        ([id, { displayName, emojis }]) => ({
          id,
          name: `${displayName} - ${emojis.map((e) => e.emoji).join("")}`,
        }),
      ),
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
