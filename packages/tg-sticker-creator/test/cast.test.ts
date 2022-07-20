import { CastError, create, FillShape, RectShape } from "../src";

describe("cast", () => {
  test("regular inheritance (string)", () => {
    const rect = create.rect();

    expect(() => rect.cast("FillShape")).toThrow(CastError);
    expect(() => rect.cast("RectShape")).not.toThrow();
  });

  test("regular inheritance (class)", () => {
    const rect = create.rect();

    expect(() => rect.cast(FillShape)).toThrow(CastError);
    expect(() => rect.cast(RectShape)).not.toThrow();
  });
});
