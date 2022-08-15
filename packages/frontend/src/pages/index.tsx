import Head from "next/head";
import VideoCardList from "@/modules/overview/VideoCardList";
import { VideoEntry } from "@/modules/overview/VideoEntry";
import { Heading, View } from "@adobe/react-spectrum";

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
        <Heading level={1}>Title</Heading>

        <VideoCardList
          videos={(new Array(50) as VideoEntry[]).fill({
            url: "https://bafybeihuhrc4fwpvqwyyjmycl6yc32jde6z4ri4uejvonwp3m3axitxl7u.ipfs.dweb.link/video.webm",
            emojis: [
              { encoded: "🍕", name: "Pizza" },
              { encoded: "❤️", name: "Heart" },
            ],
            name: "Sticker 1",
          })}
        />
      </main>
    </View>
  );
}
