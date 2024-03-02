import MainLayout from "@/layouts/MainLayout";
import StickerEditLayout from "@/layouts/StickerEditLayout";
import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import { animateAtom } from "@/modules/editor/animate";
import StepDescription from "@/modules/editor/StepDescription";
import StepStickerView from "@/modules/editor/StepStickerView";
import StepToolbarContainer from "@/modules/editor/StepToolbarContainer";
import ExportButton from "@/modules/export/ExportButton";
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
  const step = Number(router.query.step || 3);
  const { sticker } = useSticker();
  const { lottie } = useGeneratedSticker();

  return (
    <main>
      <Heading level={1}>Save</Heading>
      <StepDescription>
        Step 3: Export your character to a file that you can use in step 1 to
        restore your character, or save your character to your account if you're
        signed in via the bot.
      </StepDescription>
      <StepToolbarContainer>
        <ExportButton />
      </StepToolbarContainer>
      <StickerBreadcrumb stickerName={sticker.displayName} />
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
