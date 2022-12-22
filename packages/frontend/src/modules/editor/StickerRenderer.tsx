import lottie, { AnimationItem } from "lottie-web";
import { FC, useEffect, useRef, useState } from "react";
import { JsonObject, Lottie } from "tg-sticker-creator";

interface Props {
  sticker: Lottie | null;
  animate?: boolean;
}

const StickerRenderer: FC<Props> = (props) => {
  const ref = useRef();
  const [animationData, setAnimationData] = useState<JsonObject | null>(null);

  useEffect(() => {
    if (!props.sticker) return;
    const data = props.sticker.toPlain({ precision: Infinity });
    setAnimationData(data);
    // play(animationData);
    return () => {
      setAnimationData(null);
    };
  }, [props.sticker]);

  useEffect(() => {
    if (!animationData) return;
    let animation: AnimationItem;
    try {
      if (!ref.current) throw new Error("div missing");
      animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        animationData,
        loop: true,
        autoplay: props.animate ?? false,
      });
      animation.addEventListener("error", (event) => {
        console.log("lottie error event", event); // TODO: display errors
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      if (animation) animation.destroy();
    };
  }, [animationData]);

  return (
    <div
      style={{ aspectRatio: 1, width: "100%", display: "flex" }}
      ref={ref as any}
    />
  );
};

export default StickerRenderer;
