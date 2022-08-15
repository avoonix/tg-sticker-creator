import Head from "next/head";
import VideoCardList from "@/modules/overview/VideoCardList";
import { VideoEntry } from "@/modules/overview/VideoEntry";
import { Heading, View } from "@adobe/react-spectrum";
import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import ColorPicker from "@/modules/colors/ColorPicker";
import SecondColorPicker from "@/modules/colors/SecondColorPicker";
import ColorDialog from "@/modules/colors/ColorDialog";

export default function Home() {
  return (
    <View padding="size-100">
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading level={1}>Edit</Heading>
        <StickerBreadcrumb />

        TODO
        <ColorDialog />
      </main>
    </View>
  );
}
