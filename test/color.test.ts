import { RgbaValue } from "../src";
import { colorFromTinycolor } from "../src/core/util";

describe("color", () => {
  test("rgbaValue", () => {
    const rgba = new RgbaValue([0.2, 0.3, 0.5, 0.7]);
    expect(rgba.rgbArray()).toEqual([0.2, 0.3, 0.5]);
    expect(rgba.alpha()).toEqual(0.7);
    const rgba2 = colorFromTinycolor(rgba.toTinycolor());
    expect(rgba2.toTinycolor().toHex8String()).toEqual(
      rgba.toTinycolor().toHex8String()
    );
  });
});
