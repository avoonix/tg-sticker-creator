import { type LottieItem } from "../internal";

/**
 * Occurs whenever a {@link LottieItem} is casted to a wrong class
 * 
 * @category Errors
 */
export class CastError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CastError";
    // typescript is weird
    Object.setPrototypeOf(this, CastError.prototype);
  }
}

declare const _: LottieItem; // to prevent the import from being removed automatically
