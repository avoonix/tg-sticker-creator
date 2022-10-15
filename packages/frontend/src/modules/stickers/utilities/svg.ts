import LRUCache from "lru-cache";
import * as paper from "paper";
import { create, enums, GroupShape, TransformShape } from "tg-sticker-creator";
import { handleImport } from "./inkscapeImporter";

const setupPaper = () => {
  const canvas = document.createElement("canvas");
  paper.setup(canvas);
};

const paperToLottiePath = (path: paper.Path) => {
  const p = create.pathValue().setClosed(path.closed);
  for (const segment of path.segments) {
    p.addSegment(
      [segment.point.x, segment.point.y],
      [segment.handleIn.x, segment.handleIn.y],
      [segment.handleOut.x, segment.handleOut.y],
    );
  }
  return p;
};

const paperColorToLottieColor = (c: paper.Color) =>
  create.color(c.red, c.green, c.blue, c.alpha);

const paperHiddenToLottieHidden = (hidden: boolean) => hidden || undefined;

const compoundPathToShape = (
  cp: paper.CompoundPath,
  { forceAllShapesVisible }: { forceAllShapesVisible: boolean },
) => {
  const group = create.group().setName(getPaperItemName(cp));
  for (const path of cp.children) {
    if (!(path instanceof paper.Path)) {
      throw new Error(`unexpected ${path}`);
    }
    const p = create
      .path()
      .setVertices(create.animatablePath(paperToLottiePath(path)));
    if (!forceAllShapesVisible) {
      p.setHidden(paperHiddenToLottieHidden(!cp.visible));
    }
    group.addShapeBack(p);
  }

  return addStyles(group, cp);
};

const pathToShape = (
  p: paper.Path,
  { forceAllShapesVisible }: { forceAllShapesVisible: boolean },
) => {
  const pa = create
    .path()
    .setVertices(create.animatablePath(paperToLottiePath(p)));
  if (!forceAllShapesVisible)
    pa.setHidden(paperHiddenToLottieHidden(!p.visible));
  const group = create.group().setName(getPaperItemName(p)).addShapeBack(pa);
  return addStyles(group, p);
};

const addStyles = (group: GroupShape, p: paper.Item) => {
  if (p.style.strokeColor) {
    group.addShapeBack(
      create
        .stroke()
        .setColor(paperColorToLottieColor(p.style.strokeColor))
        // .setWidth(create.value(p.strokeWidth * 5))
        .setWidth(create.value(p.strokeWidth * 2))
        .setOpacity(create.value(p.style.strokeColor.alpha * 100)),
    );
  }
  if (p.style.fillColor) {
    const fill = p.style.fillColor;
    if (fill.type !== "gradient") {
      group.addShapeBack(
        create
          .fill()
          .setColor(paperColorToLottieColor(fill))
          .setOpacity(create.value(fill.alpha * 100)),
      );
    } else {
      const any: any = fill;
      const fillShape = create
        .gradientFill()
        .setStartPoint(create.value([any.origin.x, any.origin.y]))
        .setEndPoint(create.value([any.destination.x, any.destination.y]));

      fillShape.setGradient(
        create.gradient(
          fill.gradient.stops.map((stop) =>
            create.stop(stop.color.toCSS(true), stop.offset),
          ),
        ),
      );

      if (fill.gradient.radial) {
        fillShape
          .setGradientType(enums.GradientType.radial)
          .setHighlightAngle(create.value([fill.highlight.angle]))
          .setHighlightLength(create.value([fill.highlight.length]));
        // TODO: radial
      } else {
        fillShape.setGradientType(enums.GradientType.linear);
        // TODO: linear
      }
      group.addShapeBack(fillShape);
    }
  }
  return group.addShapeBack(setRotationCenter(create.transform(), p));
};

const getPaperItemName = (item: paper.Item) =>
  String(item.data["inkscape:label"] || item.name || item.id);

const groupToShape = (
  g: paper.Group,
  { forceAllShapesVisible }: { forceAllShapesVisible: boolean },
) => {
  const group = create.group().setName(getPaperItemName(g));
  if (!forceAllShapesVisible) group.setHidden(!g.visible);
  for (const child of g.children) {
    // TODO: use child.pivot or child.data.inkscape:transform-center-x|y
    // item.pivot = new Point (item.data["inkscape:transform-center-x"], item.data["inkscape:transform-center-y"]) // of not null
    // TODO: also export pivot
    // TODO: check child.visible?
    if (child instanceof paper.Group) {
      group.addShapeFront(groupToShape(child, { forceAllShapesVisible }));
    } else if (child instanceof paper.Path) {
      group.addShapeFront(pathToShape(child, { forceAllShapesVisible }));
    } else if (child instanceof paper.CompoundPath) {
      group.addShapeFront(
        compoundPathToShape(child, { forceAllShapesVisible }),
      );
    } else if (child instanceof paper.Shape) {
      group.addShapeFront(
        pathToShape(child.toPath(false), { forceAllShapesVisible }),
      ); // TODO: use actual shape
    } else if (child instanceof paper.PointText) {
      console.error("ignoring text");
    } else {
      console.error(`skipping unknown child element ${child}`);
    }
  }
  group.addShapeBack(create.transform());
  return group;
};

const setRotationCenter = (ts: TransformShape, g: paper.Item) => {
  // if (
  //   g.data["inkscape:transform-center-x"] &&
  //   g.data["inkscape:transform-center-y"]
  // ) {
  //   const x = Number(g.data["inkscape:transform-center-x"]);
  //   const y = Number(g.data["inkscape:transform-center-y"]);
  //   if (!isNaN(x) && !isNaN(y)) {
  //     ("TODO: set rotation center", x, y, g);
  //   }
  // }
  return ts;
};

const cache = new LRUCache<string, GroupShape>({
  max: 100,
  ttl: 0,
});

export const svgToLottie = (
  svg: string,
  { forceAllShapesVisible = false }: { forceAllShapesVisible?: boolean } = {},
): GroupShape => {
  const cacheKey = svg + JSON.stringify({ forceAllShapesVisible });
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached.clone(); // TODO: new ids needed?
  }
  const group = svgToLottieUncached(svg, { forceAllShapesVisible });
  cache.set(cacheKey, group.clone());
  return group;
};

const svgToLottieUncached = (
  svg: string,
  { forceAllShapesVisible = false }: { forceAllShapesVisible?: boolean } = {},
) => {
  setupPaper();
  const item = paper.project.importSVG(svg, {
    expandShapes: true,
    insert: false,
    onImport: handleImport,
  });

  if (!(item instanceof paper.Group)) {
    throw new Error("imported svg not a group");
  }

  return groupToShape(item, { forceAllShapesVisible });
};
