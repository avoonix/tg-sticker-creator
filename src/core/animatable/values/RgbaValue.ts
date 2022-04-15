import tinycolor from "tinycolor2";

/**
 * A combination of color and opacity
 */
export class RgbaValue {
  private _values: [number, number, number, number];

  constructor(arg: [number, number, number, number]) {
    this._values = [arg[0] ?? 0, arg[1] ?? 0, arg[2] ?? 0, arg[3] ?? 1];
  }

  rgbArray() {
    return [...this._values].slice(0, -1);
  }

  alpha() {
    return this._values[3];
  }

  toTinycolor() {
    return tinycolor.fromRatio({
      r: this._values[0],
      g: this._values[1],
      b: this._values[2],
      a: this._values[3],
    });
  }

  values() {
    return [...this._values] as typeof this._values;
  }
}
