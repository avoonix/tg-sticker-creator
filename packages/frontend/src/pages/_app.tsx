import MainLayout from "@/layouts/MainLayout";
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

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useAtom(themeAtom);

  // Use the layout defined at the page level, if available
  const getLayout =
    (Component as any).getLayout ||
    ((page: any) => <MainLayout>{page}</MainLayout>);

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
