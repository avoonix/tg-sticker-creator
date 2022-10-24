import { authAtom, getAuthData } from "@/modules/export/auth";
import { getSticker, getSummary } from "@/modules/stickers";
import { Button, View } from "@adobe/react-spectrum";
import { Heading, Text } from "@react-spectrum/text";
import { useAtom } from "jotai";
import { uniq } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface Props {
  stickerIds: string[];
}

export default function Home(props: Props) {
  const [stickers, setStickers] = useState<
    Array<NonNullable<Awaited<ReturnType<typeof getSticker>>>>
  >([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const _stickers: typeof stickers = [];
      for (const id of props.stickerIds) {
        if (cancelled) break;
        const sticker = await getSticker(id);
        if (!sticker) throw new Error(`unknown sticker ${id}`);
        _stickers.push(sticker);
        setStickers([..._stickers]);
      }
    })();
    return () => {
      cancelled = true;
      setStickers(() => []);
    };
  }, [props.stickerIds]);

  const allTags = uniq(stickers.flatMap((v) => v.tags)).sort();
  const summary = allTags.map((tag) =>
    stickers.map((v) => v.tags.includes(tag)),
  );

  const [auth, setAuth] = useAtom(authAtom);

  const telegram = (typeof window !== "undefined" ? (window as any) : {})
    ?.Telegram?.WebApp;

  return (
    <View padding="size-100">
      <Head>
        {/* <title>TypeScript starter for Next.js</title>
          <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Heading level={1}>Debug</Heading>

        <pre>telegram: {JSON.stringify(telegram, null, 2)}</pre>
        <pre>
          user: {JSON.stringify(telegram?.initDataUnsafe?.user, null, 2)}
        </pre>
        <pre>auth data: {JSON.stringify(getAuthData(), null, 2)}</pre>

        <Button
          elementType="a"
          variant="cta"
          onPress={() => setAuth(getAuthData())}
        >
          <Text>Update Auth Data</Text>
        </Button>

        <div suppressHydrationWarning={true}>
          {/* client render only */}
          {typeof window && <pre>{JSON.stringify(auth, null, 2)}</pre>}
        </div>

        <table className="w-100">
          <thead>
            <tr>
              <th className="text-left">Tag</th>
              {stickers.map((s) => (
                <th className="text-center" key={s.id}>
                  {s.displayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTags.map((tag, idx) => (
              <tr key={tag}>
                <td className="text-left">{tag}</td>
                {summary[idx].map((present, idx) => (
                  <td className="text-center" key={idx}>
                    {present ? "X" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </View>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const stickers = await getSummary();

  return {
    props: {
      stickerIds: Object.keys(stickers),
    },
  };
};
