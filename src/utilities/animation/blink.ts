import { AnimatableValue, Easing } from "../../core/internal";

/**
 * Adds keyframes to an `AnimatableValue`
 */
export interface BlinkAnimationOptions<V> {
  easing: Easing;
  startFrame: number;
  duration: number;
  interval: number;
  from: V;
  to: V;
}

export const blink = <
  T extends AnimatableValue<any, any>,
  C extends BlinkAnimationOptions<Parameters<T["addKeyframe"]>["1"]>
>(
  animatable: T,
  { startFrame, duration, interval, from, to, easing }: C
): T => {
  for (let i = startFrame; i < startFrame + duration; i += interval) {
    animatable.addKeyframe(i, from, easing);
    animatable.addKeyframe(i + interval / 2, to, easing);
  }
  return animatable;
};
