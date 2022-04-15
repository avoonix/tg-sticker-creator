import tinycolor from "tinycolor2";
import {
    Animatable1DValue,
    Animatable2DValue,
    AnimatableColor,
    AnimatableGradient,
    AnimatablePath,
    AnimatablePosition,
    colorFromString,
    colorFromTinycolor,
    CompLayer,
    Coordinate,
    EllipseShape,
    FillShape,
    GradientFillShape,
    GradientStrokeShape,
    GroupShape,
    JsonObject,
    LayerTransform,
    Lottie,
    Mask,
    MergeShape,
    NullLayer,
    Path,
    PathShape,
    PreComp,
    RectShape,
    RepeaterShape,
    RgbaStopValue,
    RgbaValue,
    RoundedCornersShape,
    ShapeLayer,
    SolidLayer,
    StarShape,
    stopFromString,
    stopFromTinycolor,
    StrokeShape,
    TransformShape,
    TrimShape
} from "../core/internal";

const shapes = {
  ellipse() {
    return new EllipseShape();
  },
  fill() {
    return new FillShape();
  },
  gradientFill() {
    return new GradientFillShape();
  },
  gradientStroke() {
    return new GradientStrokeShape();
  },
  group() {
    return new GroupShape();
  },
  merge() {
    return new MergeShape();
  },
  path() {
    return new PathShape();
  },
  rect() {
    return new RectShape();
  },
  repeater() {
    return new RepeaterShape();
  },
  roundedCorners() {
    return new RoundedCornersShape();
  },
  star() {
    return new StarShape();
  },
  transform() {
    return new TransformShape();
  },
  trim() {
    return new TrimShape();
  },
  stroke() {
    return new StrokeShape();
  },
} as const;

const layers = {
  compLayer(referenceId?: string) {
    return new CompLayer(referenceId);
  },
  nullLayer() {
    return new NullLayer();
  },
  shapeLayer() {
    return new ShapeLayer();
  },
  solidLayer() {
    return new SolidLayer();
  },
} as const;

const misc = {
  preComp() {
    return new PreComp();
  },
  layerTransform() {
    return new LayerTransform();
  },
  mask() {
    return new Mask();
  },
  stop(color: string | tinycolor.Instance, stop: number) {
    if (typeof color === "string") return stopFromString(color, stop);
    return stopFromTinycolor(color, stop);
  },
  rgba(color: string | tinycolor.Instance) {
    if (typeof color === "string") return colorFromString(color);
    return colorFromTinycolor(color);
  },
  pathValue() {
    return new Path();
  }
} as const;

const sticker = {
  sticker() {
    return new Lottie();
  },
  stickerFromPlain(obj: JsonObject) {
    return Lottie.toInstance(obj);
  },
  /**
   * Does not decompress `obj`
   *
   * ```
   * // example usage
   * import pako from "pako";
   * const output = pako.inflate(new Uint8Array(await tgsBlob.arrayBuffer()));
   * const text = new TextDecoder().decode(output);
   * const animation = create.stickerFromTgs(text);
   * ```
   *
   * @param obj
   * @returns
   */
  stickerFromTgs(obj: JsonObject | string) {
    if (typeof obj === "string") {
      obj = JSON.parse(obj) as JsonObject;
    }
    return sticker.stickerFromPlain(obj);
  },
} as const;

function value(value: number | [number]): Animatable1DValue;
function value(value: Coordinate): Animatable2DValue;
function value(x: number, y: number): AnimatablePosition;
function value(x: number | number[], y?: number) {
  if (typeof x === "number") {
    if (typeof y === "number") {
      return new AnimatablePosition([x, y]);
    }
    return new Animatable1DValue(x);
  }
  if (x.length === 1) {
    return new Animatable1DValue(x[0]);
  }
  if (x.length === 2) {
    return new Animatable2DValue(x as Coordinate);
  }
  throw new RangeError("invalid dimension");
}

/**
 *
 * @param red 0-1
 * @param green 0-1
 * @param blue 0-1
 * @param alpha 0-1
 */
function color(
  red: number,
  green: number,
  blue: number,
  alpha: number
): AnimatableColor;
function color(colorNameOrHexValue: string): AnimatableColor;
function color(rgba: RgbaValue): AnimatableColor;
function color(
  color: string | RgbaValue | number,
  green?: number,
  blue?: number,
  alpha?: number
) {
  if (typeof color === "number") {
    if (
      typeof green === "number" &&
      typeof blue === "number" &&
      typeof alpha === "number"
    ) {
      return new AnimatableColor(new RgbaValue([color, green, blue, alpha]));
    }
    throw new TypeError("invalid rgba values");
  }
  return new AnimatableColor(color);
}

function animatablePath(path: Path): AnimatablePath;
function animatablePath(
  inPoints: Coordinate[],
  outPoints: Coordinate[],
  vertices: Coordinate[],
  closed: boolean
): AnimatablePath;
function animatablePath(
  inPointsOrPath: Path | Coordinate[],
  outPoints?: Coordinate[],
  vertices?: Coordinate[],
  closed?: boolean
) {
  if (Array.isArray(inPointsOrPath)) {
    return new AnimatablePath(
      new Path(inPointsOrPath, outPoints, vertices, closed)
    );
  }
  return new AnimatablePath(inPointsOrPath);
}

const gradient = (stops: RgbaStopValue[]) => new AnimatableGradient(stops);

const values = {
  value,
  color,
  animatablePath,
  gradient,
} as const;

export const create = {
  ...shapes,
  ...layers,
  ...misc,
  ...values,
  ...sticker,
} as const;
