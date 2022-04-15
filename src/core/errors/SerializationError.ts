/**
 * Occurs whenever the serialization/deserialization fails
 *
 * @category Errors
 */
export class SerializationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "SerializationError";
    // typescript is weird
    Object.setPrototypeOf(this, SerializationError.prototype);
  }
}
