import MainLayout from "@/layouts/MainLayout";
import StickerEditLayout from "@/layouts/StickerEditLayout";
import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import { animateAtom } from "@/modules/editor/animate";
import StepDescription from "@/modules/editor/StepDescription";
import StepGroups from "@/modules/editor/StepGroups";
import StepStickerView from "@/modules/editor/StepStickerView";
import StepTemplateChanger from "@/modules/editor/StepTemplateChanger";
import StepToolbarContainer from "@/modules/editor/StepToolbarContainer";
import { getSummary } from "@/modules/stickers";
import { useGeneratedSticker, useSticker } from "@/modules/stickers/useSticker";
import { Heading, Switch } from "@adobe/react-spectrum";
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
  const step = Number(router.query.step || 2);
  const { sticker } = useSticker();
  const { lottie } = useGeneratedSticker();

  const [animatePreviews, setAnimatePreviews] = useAtom(animateAtom);

  return (
    <main>
      <Heading level={1}>Edit Sticker</Heading>
      <StepDescription>
        Step 2: Edit the patterns and colors to match your character. Make sure
        that you switch through all templates via "Change Template" to ensure
        everything is colored correctly - different templates reveal different
        body parts.
        <br />
        Click the button at the bottom to continue.
      </StepDescription>
      <StepToolbarContainer>
        <Switch isSelected={animatePreviews} onChange={setAnimatePreviews}>
          Animate Previews
        </Switch>
        <StepTemplateChanger step={step} stickers={props.stickers} />
      </StepToolbarContainer>
      <StickerBreadcrumb stickerName={sticker.displayName} />
      <StepStickerView lottie={lottie} sticky />
      <StepGroups groups={sticker.groups} />
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
