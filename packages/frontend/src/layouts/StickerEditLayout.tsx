import SpectrumLink from "@/modules/editor/SpectrumLink";
import { useApiSettings } from "@/modules/stickers/useApiSettings";
import { useSticker } from "@/modules/stickers/useSticker";
import { Button, Meter, Text, View } from "@adobe/react-spectrum";
import ArrowLeft from "@spectrum-icons/workflow/ArrowLeft";
import ArrowRight from "@spectrum-icons/workflow/ArrowRight";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export default function StickerEditLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const step = Number(router.asPath.match(/step\/(\d)/)?.[1]);
  const prev = step == 1 ? null : step - 1;
  const next = step == 4 ? null : step + 1;
  const stickerId = String(router.query.stickerId);
  const { sticker } = useSticker(stickerId);
  const configString = router.query.config
    ? `?config=${router.query.config}`
    : "";

  useApiSettings();

  return (
    <>
      <Head>
        <title>
          {sticker.displayName} Telegram Sticker Template - Avoo's Sticker Stash
        </title>
      </Head>
      <View padding="size-300">
        <Meter
          width="100%"
          label="Step"
          value={(100 * step) / 4}
          valueLabel={`${step} of 4`}
          variant="positive"
        />
      </View>
      {prev && (
        <Button
          elementType={SpectrumLink}
          variant="cta"
          href={`/edit/${stickerId}/step/${prev}${configString}`}
        >
          <ArrowLeft />
          <Text>Back to Step {prev}</Text>
        </Button>
      )}
      <View padding="size-100">
        <div>{children}</div>
      </View>

      {next ? (
        <Button
          elementType={SpectrumLink}
          variant="cta"
          href={`/edit/${stickerId}/step/${next}${configString}`}
        >
          <ArrowRight />
          <Text>Continue to the Next Step</Text>
        </Button>
      ) : (
        <Button elementType={SpectrumLink} variant="cta" href="/">
          <ArrowRight />
          <Text>Finish</Text>
        </Button>
      )}
    </>
  );
}
