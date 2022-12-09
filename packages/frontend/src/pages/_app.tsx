import { useUpdateAuthData } from "@/modules/export/auth";
import { themeAtom } from "@/modules/misc/theme";
import ThemeProvider from "@/modules/misc/ThemeProvider";
import "@/styles/global.scss";
import {
  defaultTheme,
  Provider,
  SSRProvider,
  View,
} from "@adobe/react-spectrum";
import { useAtom } from "jotai";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useAtom(themeAtom);
  const { updateAuthData } = useUpdateAuthData();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.hash) return;
    const data = JSON.stringify(
      Object.fromEntries(
        Object.entries(router.query).filter(([key]) =>
          [
            "id",
            "first_name",
            "username",
            "photo_url",
            "auth_date",
            "hash",
          ].includes(key),
        ),
      ),
    );
    updateAuthData(data);
    router.replace(router.route); // route without query
  }, [router, updateAuthData]);

  return (
    <>
      <Head>
        <title>Avoo's Sticker Stash</title>
        <meta name="description" content="A Telegram sticker generator" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SSRProvider>
        <Provider theme={defaultTheme} colorScheme={theme.type} locale="en">
          <Component {...pageProps} />
          <View padding="size-100">
            <a
              href="https://github.com/avoonix/tg-sticker-creator/tree/master/packages/frontend"
              target="_blank"
              rel="noreferrer noopener"
            >
              sauce
            </a>{" "}
            &bull;{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              code license
            </a>{" "}
            &bull;{" "}
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              rel="noreferrer noopener"
            >
              template license
            </a>
          </View>
        </Provider>
      </SSRProvider>
      <ThemeProvider />
    </>
  );
}
