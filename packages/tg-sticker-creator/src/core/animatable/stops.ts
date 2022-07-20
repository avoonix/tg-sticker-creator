import { RgbaStopValue } from "../internal";

export const stopsToPlain = (stops: RgbaStopValue[]) => {
  const colors: number[] = [];
  const opacity: number[] = [];
  for (const stop of stops) {
    colors.push(stop.stop(), ...stop.rgbArray());
    opacity.push(stop.stop(), stop.alpha());
  }
  return [...colors, ...opacity];
};

export const plainToStops = (plain: number[], colorCount: number) => {
  const stops: RgbaStopValue[] = [];
  const opacities = plain.slice(4 * colorCount);
  const op: { [idx: string]: number } = {};
  for (let i = 0; i < opacities.length; i += 2) {
    op[opacities[i]] = opacities[i + 1];
  }

  for (let i = 0; i < colorCount * 4; i += 4) {
    const stop = plain[i];
    const rgb = [plain[i + 1], plain[i + 2], plain[i + 3]] as const;
    const opacity = op[stop] ?? 1;
    stops.push(new RgbaStopValue([...rgb, opacity], stop));
  }

  return stops;
};
