import { create, Easing, Lottie } from "tg-sticker-creator";

export const slideIn = (animation: Lottie, easing: Easing) => {
  animation.eachChildLayer((layer) => {
    if (typeof layer.parentIndex !== "number") {
      layer.transform.setPosition(
        create
          .value(0, 256 * 2)
          .toAnimated(animation.initialFrame)
          .addKeyframe(animation.frameAt(0.4), [0, 0], easing)
          .addKeyframe(animation.frameAt(0.8), [0, 0], easing)
          .addKeyframe(animation.frameAt(1), [0, 256 * 2], easing),
      );
    }
  });
};
