import tinycolor from "tinycolor2";

export default function ThemeProvider() {
  const telegram = (typeof window !== "undefined" ? (window as any) : {})
    ?.Telegram?.WebApp;
  const baseColor = telegram?.themeParams?.button_color ?? "#bf8a0f";
  const color = tinycolor(baseColor);

  return (
    <style global jsx>{`
      *,
      :root {
        --spectrum-global-color-static-blue-200: ${color
          .clone()
          .darken(50)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-300: ${color
          .clone()
          .darken(40)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-400: ${color
          .clone()
          .darken(30)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-500: ${color
          .clone()
          .darken(20)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-600: ${color
          .clone()
          .darken(10)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-600: ${baseColor} !important;
        --spectrum-global-color-static-blue-700: ${color
          .clone()
          .lighten(10)
          .toHexString()} !important;
        --spectrum-global-color-static-blue-800: ${color
          .clone()
          .lighten(20)
          .toHexString()} !important;
      }
    `}</style>
  );
}
