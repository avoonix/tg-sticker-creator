import {
  CancellableCallback,
  EachOptions,
  JsonObject,
  LottieItem,
  Shape,
  shapeConverter,
  toInstance,
  toPlain,
  ToPlainOptions
} from "../internal";

export class Shapes {
  shapes: Shape[] = [];

  setShapes(shapes: Shape[]) {
    this.shapes = shapes;
    return this;
  }

  addShapeBack(shape: Shape) {
    this.shapes.push(shape);
    return this;
  }

  addShapeFront(shape: Shape) {
    this.shapes.unshift(shape);
    return this;
  }

  eachImmediateChildShape(
    callback: CancellableCallback<Shape>,
    { parents = [] }: EachOptions = {}
  ) {
    let cancel = false;
    for (const shape of this.shapes) {
      callback(shape, () => (cancel = true), [...parents, this] as any);
      if (cancel) break;
    }
    return this;
  }

  eachChildShape(
    callback: CancellableCallback<Shape>,
    { parents = [] }: EachOptions = {}
  ) {
    let cancel = false;
    const cb = (item: Shape, cancelFn: () => void, parents: LottieItem[]) => {
      callback(
        item,
        () => {
          cancel = true;
          cancelFn();
        },
        parents
      );
    };
    this.eachImmediateChildShape(
      (shape, cancelFn, parents) => {
        cb(shape, () => (cancel = true), parents);
        if (cancel) return cancelFn();
        if (shape.is("GroupShape")) {
          shape.eachChildShape(cb, { parents });
        }
        if (cancel) cancelFn();
      },
      { parents }
    );
    return this;
  }

  // prettier-ignore
  /**
   * @internal
   */
  shapesToPlain(options: ToPlainOptions, key: string): JsonObject {
    return {
      [key]: toPlain(this.shapes, shapeConverter(), options),
    };
  }

  // prettier-ignore
  /**
   * @internal
   */
  shapesToInstance(value: JsonObject, key: string) {
    this.shapes = toInstance(value[key], shapeConverter(), this.shapes);
  }
}
