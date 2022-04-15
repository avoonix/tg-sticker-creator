import {
  create,
  FillShape,
  LayerTransform,
  Lottie,
  LottieItem,
  Shape,
  TransformShape,
} from "../src";

describe("is", () => {
  test("regular inheritance (strings)", () => {
    const fill = create.fill();

    expect(fill.is("FillShape")).toBeTruthy();
    expect(fill.is("Shape")).toBeTruthy();
    expect(fill.is("LottieItem")).toBeTruthy();

    expect(fill.is("Lottie")).toBeFalsy();
  });

  test("mixins (strings)", () => {
    const transform = create.transform();

    expect(transform.is("TransformShape")).toBeTruthy();
    expect(transform.is("Shape")).toBeTruthy();
    expect(transform.is("LottieItem")).toBeTruthy();
    // expect(transform.is("TransformMixin")).toBeTruthy();

    expect(transform.is("LayerTransform")).toBeFalsy();
  });

  test("regular inheritance (classes)", () => {
    const fill = create.fill();

    expect(fill.is(FillShape)).toBeTruthy();
    expect(fill.is(Shape)).toBeTruthy();
    expect(fill.is(LottieItem)).toBeTruthy();

    expect(fill.is(Lottie)).toBeFalsy();
  });

  test("mixins (classes)", () => {
    const transform = create.transform();

    expect(transform.is(TransformShape)).toBeTruthy();
    expect(transform.is(Shape)).toBeTruthy();
    expect(transform.is(LottieItem)).toBeTruthy();
    // expect(transform.is(TransformMixin)).toBeTruthy();

    expect(transform.is(LayerTransform)).toBeFalsy();
  });
});
