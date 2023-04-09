import { GroupShape } from "tg-sticker-creator";

/**
 *
 * @param shape shape with a child pathshape
 */
export const getAveragePathPosition = (shape: GroupShape) => {
  let average = [0, 0] as [number, number];
  shape.eachImmediateChildShape((c) => {
    if (!c.is("PathShape")) return;
    const vertices = c.vertices.getValue();
    if (Array.isArray(vertices)) return;
    average = vertices.points
      .reduce(([x, y], cur) => [x + cur[0], y + cur[1]], [0, 0])
      .map((sum) => sum / vertices.points.length) as [number, number];
  });
  return average;
};
