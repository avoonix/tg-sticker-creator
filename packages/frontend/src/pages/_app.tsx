import { AppProps } from "next/app";
import "@/styles/global.css";
import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";
import Head from "next/head";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Avoo's Sticker Stamp</title>
        <meta name="description" content="A Telegram sticker generator" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SSRProvider>
        <Provider theme={defaultTheme} locale="en">
          <Script defer src="/CCapture.all.min.js"></Script>
          <Component {...pageProps} />
          <p>
            License:{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              GNU Affero General Public License
            </a>
            .
          </p>
        </Provider>
      </SSRProvider>
    </>
  );
}