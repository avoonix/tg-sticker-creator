import { AppProps } from "next/app";
import "@/styles/global.css";
import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme} locale="en">
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}
