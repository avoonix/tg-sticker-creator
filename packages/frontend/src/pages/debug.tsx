import DisableSsr from "@/modules/misc/DisableSsr";
import { getSticker, getSummary } from "@/modules/stickers";
import { View } from "@adobe/react-spectrum";
import { Heading } from "@react-spectrum/text";
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

  const telegram = (typeof window !== "undefined" ? (window as any) : {})
    ?.Telegram?.WebApp;

  return (
    <View padding="size-100">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <Heading level={1}>Debug</Heading>

        <Heading level={2}>Auth</Heading>

        <Heading level={2}>Telegram</Heading>
        <DisableSsr>
          {typeof window && <pre>{JSON.stringify(telegram, null, 2)}</pre>}
        </DisableSsr>

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
