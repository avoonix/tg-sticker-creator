import StickerRenderer from "@/modules/editor/StickerRenderer";
import { View } from "@adobe/react-spectrum";
import { FC } from "react";
import { InView } from "react-intersection-observer";
import { Lottie } from "tg-sticker-creator";

interface Props {
  lottie: Lottie | null;
  sticky: boolean;
}

const StepStickerView: FC<Props> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: props.sticky ? "sticky" : "initial",
        top: 0,
        zIndex: 3,
        backgroundColor: "var(--spectrum-alias-background-color-default)",
      }}
    >
      <View maxWidth="size-5000" width="size-5000" margin="size-100">
        <InView>
          {({ inView, ref, entry }) => (
            <div
              style={{
                backgroundColor: "var(--spectrum-global-color-static-blue-600)",
                borderRadius:
                  "var(--spectrum-button-primary-border-radius,var(--spectrum-alias-border-radius-large))",
              }}
              ref={ref}
            >
              {inView ? (
                <StickerRenderer sticker={props.lottie} animate />
              ) : (
                <div style={{ aspectRatio: 1, width: "100%" }}></div>
              )}
            </div>
          )}
        </InView>
      </View>
    </div>
  );
};

export default StepStickerView;
