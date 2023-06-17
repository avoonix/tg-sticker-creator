import MainLayout from "@/layouts/MainLayout";
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

  // Use the layout defined at the page level, if available
  const getLayout =
    (Component as any).getLayout ||
    ((page: any) => <MainLayout>{page}</MainLayout>);

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
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </SSRProvider>
      <ThemeProvider />
    </>
  );
}
