import MainLayout from "@/layouts/MainLayout";
import StickerEditLayout from "@/layouts/StickerEditLayout";
import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import { animateAtom } from "@/modules/editor/animate";
import StepDescription from "@/modules/editor/StepDescription";
import StepGroups from "@/modules/editor/StepGroups";
import StepStickerView from "@/modules/editor/StepStickerView";
import StepTemplateChanger from "@/modules/editor/StepTemplateChanger";
import StepToolbarContainer from "@/modules/editor/StepToolbarContainer";
import AddToSetButton from "@/modules/export/AddToSetButton";
import { authAtom } from "@/modules/export/auth";
import ExportMenu from "@/modules/export/ExportMenu";
import ColorList from "@/modules/palette/ColorList";
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
  const step = Number(router.query.step || 4);
  const { sticker } = useSticker();
  const { lottie } = useGeneratedSticker();
  const [auth] = useAtom(authAtom);

  const [animatePreviews, setAnimatePreviews] = useAtom(animateAtom);

  return (
    <main>
      <Heading level={1}>Export</Heading>
      <StepDescription>
        Step 4: Export your stickers! If you're logged in, you can add them to
        your set directly; otherwise export them to .tgs files that you can send
        to the @Stickers Telegram bot to create the set by yourself.
        <br />
        You can also export multiple versions of a sticker, like skirt and
        non-skirt variants by toggling the relevant options.
      </StepDescription>
      <StepToolbarContainer>
        <Switch isSelected={animatePreviews} onChange={setAnimatePreviews}>
          Animate Previews
        </Switch>
        {auth.type !== "web-app" && lottie && <ExportMenu lottie={lottie} />}
        <StepTemplateChanger step={step} stickers={props.stickers} />
        {lottie && (
          <>
            {auth.data && (
              <AddToSetButton action="add" lottie={lottie}>
                Add to Your Set
              </AddToSetButton>
            )}
          </>
        )}
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
