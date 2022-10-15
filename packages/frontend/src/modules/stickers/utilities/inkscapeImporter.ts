type SVG =
  | XMLDocument
  | SVGElement
  | SVGSVGElement
  | SVGCircleElement
  | SVGClipPathElement
  | SVGDefsElement
  | SVGDescElement
  | SVGEllipseElement
  | SVGFEBlendElement
  | SVGFEColorMatrixElement
  | SVGFEComponentTransferElement
  | SVGFECompositeElement
  | SVGFEConvolveMatrixElement
  | SVGFEDiffuseLightingElement
  | SVGFEDisplacementMapElement
  | SVGFEDistantLightElement
  | SVGFEDropShadowElement
  | SVGFEFloodElement
  | SVGFEFuncAElement
  | SVGFEFuncBElement
  | SVGFEFuncGElement
  | SVGFEFuncRElement
  | SVGFEGaussianBlurElement
  | SVGFEImageElement
  | SVGFEMergeElement
  | SVGFEMergeNodeElement
  | SVGFEMorphologyElement
  | SVGFEOffsetElement
  | SVGFEPointLightElement
  | SVGFESpecularLightingElement
  | SVGFESpotLightElement
  | SVGFETileElement
  | SVGFETurbulenceElement
  | SVGFilterElement
  | SVGForeignObjectElement
  | SVGGElement
  | SVGImageElement
  | SVGLineElement
  | SVGLinearGradientElement
  | SVGMarkerElement
  | SVGMaskElement
  | SVGMetadataElement
  | SVGPathElement
  | SVGPatternElement
  | SVGPolygonElement
  | SVGPolylineElement
  | SVGRadialGradientElement
  | SVGRectElement
  | SVGStopElement
  | SVGSwitchElement
  | SVGSymbolElement
  | SVGTextElement
  | SVGTextPathElement
  | SVGTSpanElement
  | SVGUseElement
  | SVGViewElement;

type PAPER =
  | paper.Path
  | paper.Rectangle
  | paper.Shape
  | paper.TextItem
  | paper.CompoundPath
  | paper.Gradient
  | paper.Item
  | paper.Group;

const ignore: Record<string, true | undefined> = {
  d: true,
  class: true,
  fill: true,
  "fill-rule": true,
  "font-family": true,
  "font-size": true,
  "font-weight": true,
  height: true,
  id: true,
  "inkscape:version": true,
  points: true,
  r: true,
  rx: true,
  ry: true,
  cx: true,
  cy: true,
  "sodipodi:nodetypes": true,
  stroke: true,
  "stroke-dasharray": true,
  "stroke-dashoffset": true,
  "stroke-linecap": true,
  "stroke-linejoin": true,
  "stroke-miterlimit": true,
  "stroke-width": true,
  style: true,
  "text-anchor": true,
  transform: true,
  version: true,
  viewBox: true,
  width: true,
  x: true,
  xmlns: true,
  "xmlns:inkscape": true,
  "xmlns:sodipodi": true,
  "xmlns:svg": true,
  "xmlns:xlink": true,
  y: true,
};

export const handleImport = (node: SVG, item: PAPER) => {
  if ("getAttributeNames" in node && "data" in item) {
    for (const attr of node.getAttributeNames()) {
      if (ignore[attr]) continue;
      item.data[attr] = node.getAttribute(attr);
      // TODO: set rotation center?
    }
  }
};
