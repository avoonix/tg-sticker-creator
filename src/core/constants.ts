export enum LineCap {
  flat = 1,
  round = 2,
  square = 3,
}

export enum LayerType {
  comp = 0,
  solid = 1,
  image = 2,
  null = 3,
  shape = 4,
  text = 5,
}

export enum BlendMode {
  normal = 0,
  multiply = 1,
  screen = 2,
  overlay = 3,
  darken = 4,
  lighten = 5,
  colorDodge = 6,
  colorBurn = 7,
  hardLight = 8,
  softLight = 9,
  difference = 10,
  exclusion = 11,
  hue = 12,
  saturation = 13,
  color = 14,
  luminosity = 15,
}

export enum FillRule {
  nonZero = 1,
  evenOdd = 2,
}

export enum MatteMode {
  Normal = 0,
  Alpha = 1,
  InvertedAlpha = 2,
  Luma = 3,
  InvertedLuma = 4,
}

export enum ShapeType {
  shape = "sh",
  fill = "fl",
  stroke = "st",
  group = "gr",
  transform = "tr",
  ellipse = "el",
  merge = "mm",
  trim = "tm",
  gradientFill = "gf",
  roundedCorners = "rd",
  gradientStroke = "gs",
  rect = "rc",
  star = "sr",
  repeater = "rp",
}

export enum TrimMultiple {
  simultaneously = 1,
  individually = 2,
}

export enum GradientType {
  linear = 1,
  radial = 2,
}

export enum LineJoin {
  miter = 1,
  round = 2,
  bevel = 3,
}

export enum MaskMode {
  none = "n",
  add = "a",
  subtract = "s",
  intersect = "i",
  lighten = "l",
  darken = "d",
  difference = "f",
}

export enum StarType {
  star = 1,
  polygon = 2,
}

export enum MergeMode {
  merge = 1,
  add = 2,
  subtract = 3,
  intersect = 4,
  excludeIntersections = 5,
}
