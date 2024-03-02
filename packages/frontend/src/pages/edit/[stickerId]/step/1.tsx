import MainLayout from "@/layouts/MainLayout";
import StickerEditLayout from "@/layouts/StickerEditLayout";
import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import StepDescription from "@/modules/editor/StepDescription";
import StepStickerView from "@/modules/editor/StepStickerView";
import StepTemplateChanger from "@/modules/editor/StepTemplateChanger";
import StepToolbarContainer from "@/modules/editor/StepToolbarContainer";
import ImportButton from "@/modules/export/ImportButton";
import ColorList from "@/modules/palette/ColorList";
import { getSummary } from "@/modules/stickers";
import { useGeneratedSticker, useSticker } from "@/modules/stickers/useSticker";
import { Heading } from "@adobe/react-spectrum";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  stickerId: string;
  stickers: {
    id: string;
    name: string;
  }[];
}

export default function Home(props: Props) {
  const router = useRouter();
  const step = Number(router.query.step || 1);
  const { sticker } = useSticker();
  const { lottie } = useGeneratedSticker();

  return (
    <main>
      <Heading level={1}>Create Palette</Heading>
      <StepDescription>
        Step 1: Choose the main colors. These are usually all your fur colors
        and other colors that you want to use more than once.
        <br />
        When you're done, continue to the next step with the button at the
        bottom. You can go back to this step later if you need to.
      </StepDescription>
      <StepToolbarContainer>
        <ImportButton />
        <StepTemplateChanger step={step} stickers={props.stickers} />
      </StepToolbarContainer>
      <StickerBreadcrumb stickerName={sticker.displayName} />
      <ColorList />
      <StepStickerView lottie={lottie} sticky={false} />
    </main>
  );
}

Home.getLayout = function getLayout(page: any) {
  return (
    <MainLayout>
      <StickerEditLayout>{page}</StickerEditLayout>
    </MainLayout>
  );
};

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
    paths: Object.keys(stickers).flatMap((stickerId) => [
      {
        params: { stickerId },
      },
    ]),
    fallback: false,
  };
};
