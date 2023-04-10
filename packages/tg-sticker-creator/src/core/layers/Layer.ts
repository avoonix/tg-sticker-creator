import {
  BlendMode,
  CancellableCallback,
  converters,
  EachOptions,
  FindOptions,
  JsonObject,
  LayerTransform,
  LayerType,
  LottieItem,
  Mask,
  MatteMode,
  randInt,
  Resolvable,
  resolveCurrentItemHelper,
  toInstance,
  toPlain,
  ToPlainOptions,
} from "../internal";

/**
 * Base class for layers
 *
 * References:
 * - https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/layer/Layer.java
 *
 * @category Layers
 */
export class Layer extends LottieItem implements Resolvable {
  /**
   * @internal
   */
  resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ) {
    return resolveCurrentItemHelper(
      this,
      keyPath,
      depth,
      currentPartialKeyPath,
      options
    );
  }

  type!: LayerType;

  isThreeDimensional?: boolean;

  index?: number = randInt();

  setIndex(index?: number) {
    this.index = index;
    return this;
  }

  name?: string = `layer${randInt()}`;

  setName(name?: string) {
    this.name = name;
    return this;
  }

  autoOrient = false;

  initialFrame = 0;

  setInitialFrame(frame: number) {
    this.initialFrame = frame;
    return this;
  }

  finalFrame = 60 * 3;

  setFinalFrame(frame: number) {
    this.finalFrame = frame;
    return this;
  }

  startTime = 0;

  setStartTime(time: number) {
    this.startTime = time;
    return this;
  }

  hidden?: boolean;

  setHidden(hidden?: boolean) {
    this.hidden = hidden;
    return this;
  }

  transform: LayerTransform = new LayerTransform();

  parentIndex?: number;

  stretch = 1;

  blendMode: BlendMode = BlendMode.normal;

  matteMode?: MatteMode;

  matteTarget?: number;

  hasMasks?: boolean;

  masks?: Mask[];

  setMatteTarget(targetLayer: number | undefined) {
    this.matteTarget = targetLayer;
    return this;
  }

  setMatteMode(m: MatteMode | undefined) {
    this.matteMode = m;
    return this;
  }

  addMask(mask: Mask) {
    if (!this.masks) {
      this.masks = [];
    }
    this.masks.push(mask);
    this.hasMasks = true;
    return this;
  }

  setTransform(t: LayerTransform) {
    this.transform = t;
    return this;
  }

  eachChildMask(
    callback: CancellableCallback<Mask>,
    { parents = [] }: EachOptions = {}
  ) {
    if (!this.masks) return;
    let cancel = false;
    for (const mask of this.masks) {
      callback(mask, () => (cancel = true), [...parents, this]);
      if (cancel) break;
    }
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toPlain(options: ToPlainOptions): JsonObject {
    return {
      ...super.toPlain(options),
      ddd: toPlain(this.isThreeDimensional, converters.optional(converters.numberBoolean), options),
      ind: toPlain(this.index, converters.optional(converters.number), options),
      ty: toPlain(this.type, converters.pass(), options),
      nm: toPlain(this.name, converters.optional(converters.string), options),
      sr: toPlain(this.stretch, converters.number, options),
      ks: toPlain(this.transform, LayerTransform, options),
      ao: toPlain(this.autoOrient, converters.numberBoolean, options),
      ip: toPlain(this.initialFrame, converters.number, options),
      op: toPlain(this.finalFrame, converters.number, options),
      st: toPlain(this.startTime, converters.number, options),
      hd: toPlain(this.hidden, converters.boolean, options),
      parent: toPlain(this.parentIndex, converters.optional(converters.number), options),
      bm: toPlain(this.blendMode, converters.pass(), options),
      tt: toPlain(this.matteMode, converters.pass(), options),
      td: toPlain(this.matteTarget, converters.optional(converters.number), options),
      hasMask: toPlain(this.hasMasks, converters.boolean, options),
      masksProperties: toPlain(this.masks, converters.optional(converters.array(Mask)), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  override toInstance(value: JsonObject) {
    super.toInstance(value);
    this.type = toInstance(value.ty, converters.pass<LayerType>(), this.type);
    this.isThreeDimensional = toInstance(value.ddd, converters.optional(converters.numberBoolean), this.isThreeDimensional);
    this.index = toInstance(value.ind, converters.optional(converters.number), undefined);
    this.name = toInstance(value.nm, converters.optional(converters.string), undefined);
    this.autoOrient = toInstance(value.ao, converters.numberBoolean, this.autoOrient);
    this.initialFrame = toInstance(value.ip, converters.number, this.initialFrame);
    this.finalFrame = toInstance(value.op, converters.number, this.finalFrame);
    this.startTime = toInstance(value.st, converters.number, this.startTime);
    this.hidden = toInstance(value.hd, converters.boolean, this.hidden);
    this.transform = toInstance(value.ks, LayerTransform, this.transform);
    this.parentIndex = toInstance(value.parent, converters.optional(converters.number), undefined);
    this.stretch = toInstance(value.sr, converters.number, this.stretch);
    this.blendMode = toInstance(value.bm, converters.pass<BlendMode>(), this.blendMode);
    this.matteMode = toInstance(value.tt, converters.pass<MatteMode>(), this.matteMode);
    this.matteTarget = toInstance(value.td, converters.optional(converters.number), undefined);
    this.hasMasks = toInstance(value.hasMask, converters.boolean, this.hasMasks);
    this.masks = toInstance(value.masksProperties, converters.optional(converters.array(Mask)), this.masks);
  }
}
