import { RgbaValue } from "../../internal";

/**
 * A combination of color, opacity and a position
 */
export class RgbaStopValue extends RgbaValue {
  private _stop: number;

  constructor(arg: [number, number, number, number], stop: number) {
    super(arg);
    this._stop = stop;
  }

  stop() {
    return this._stop;
  }
}
