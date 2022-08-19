import StickerBreadcrumb from "@/modules/breadcrumb/StickerBreadcrumb";
import ColorDialog from "@/modules/colors/ColorDialog";
import ColorList from "@/modules/palette/ColorList";
import { Heading, View } from "@adobe/react-spectrum";
import Head from "next/head";

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

        <ColorList />

        TODO
        <ColorDialog color="#00ff00" onChange={() => null} />
      </main>
    </View>
  );
}
