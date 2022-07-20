import {
  converters,
  JsonObject,
  LottieItem,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

/**
 * [x, y]
 */
export type Coordinate = [number, number];

/**
 * A bezier path. Points are defined by a [x, y] array. Every point has bezier in and out handles relative to that point.
 *
 * References:
 * - https://github.com/airbnb/lottie-web/blob/master/docs/json/properties/shapeProp.json
 *
 */
export class Path extends LottieItem {
  constructor(
    inHandles?: Coordinate[],
    outHandles?: Coordinate[],
    points?: Coordinate[],
    closed?: boolean
  ) {
    super();
    if (inHandles) {
      this.inHandles = inHandles;
    }
    if (outHandles) {
      this.outHandles = outHandles;
    }
    if (points) {
      this.points = points;
    }
    if (closed) {
      this.closed = closed;
    }
  }

  closed: boolean = false;

  inHandles: Coordinate[] = [];

  outHandles: Coordinate[] = [];

  points: Coordinate[] = [];

  setClosed(closed: boolean) {
    this.closed = closed;
    return this;
  }

  addSegment(point: Coordinate, inHandle: Coordinate, outHandle: Coordinate) {
    this.points.push(point);
    this.inHandles.push(inHandle);
    this.outHandles.push(outHandle);
    return this;
  }

  /**
   * @internal
   */
  static toPlain(value: Path, options: ToPlainOptions) {
    return value.toPlain(options);
  }

  /**
   * @internal
   */
  static toInstance(value: JsonObject) {
    const instance = new Path();
    instance.toInstance(value);
    return instance;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      c: toPlain(this.closed, converters.boolean, options),
      i: toPlain(this.inHandles, converters.array(converters.coordinate), options),
      o: toPlain(this.outHandles, converters.array(converters.coordinate), options),
      v: toPlain(this.points, converters.array(converters.coordinate), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.closed = toInstance(value.c, converters.boolean, this.closed);
    this.inHandles = toInstance(value.i,converters.array(converters.coordinate), this.inHandles);
    this.outHandles = toInstance(value.o, converters.array(converters.coordinate), this.outHandles);
    this.points = toInstance(value.v, converters.array(converters.coordinate), this.points);
  }
}
