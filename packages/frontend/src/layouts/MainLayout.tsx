import { View } from "@adobe/react-spectrum";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
      {/* footer */}
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
    </>
  );
}
