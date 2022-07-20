import { AnimatableValue } from "../internal";

/**
 * Occurs whenever a {@link AnimatableValue} is already animated or the keyframes of an {@link AnimatableValue} are shifted, but it is not animated
 *
 * @category Errors
 */
export class AnimationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AnimationError";
    // typescript is weird
    Object.setPrototypeOf(this, AnimationError.prototype);
  }
}

declare const _: AnimatableValue<any, any>; // to prevent the import from being removed automatically
