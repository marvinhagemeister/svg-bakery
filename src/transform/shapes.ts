export type Length = number | string;
export type CalcMode = "discrete" | "linear" | "paced" | "spline";
export type RepeatCount = number | "indefinite";
export type MaskUnits = "userSpaceOnUse" | "objectBoundingBox";

export type DescriptiveElements = Desc | Metadata | Title;

export interface A {}

export interface Animate {
  attributeName: string;
  attributeType: any; // TODO
  /** Example: `0 60 70` */
  from: string;
  /** Example: `360 60 70` */
  to: string;
  dur: string;
  repeatCount: RepeatCount;
}

export interface AnimateMotion {
  calcMode: CalcMode;
  path: string;
  keyPoints: any;
  rotate: any;
  origin: any;
  children: undefined | DescriptiveElements | Mpath;
}

export interface AnimateTransform {
  attributeName: string;
  attributeType: string;
  type: "rotate";
  from: string;
  to: string;
  dur: string;
  repeatCount: RepeatCount;
  children: undefined | DescriptiveElements;
}

export interface Circle {
  cx: number;
  xy: number;
  r: number;
  children: undefined | any;
}

export interface ClipPath {
  clipPathUnits: MaskUnits;
}

export interface ColorProfile {
  local: string;
  name: any;
  renderingIntent: any;
  children: undefined | DescriptiveElements;
}

export interface Defs {
  children: any;
}

export interface Desc {
  children: any; // yep
}

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  children: any;
}

export interface FeBlend {}
export interface FeColorMatrix {}
export interface FeComponentTransfer {}
export interface FeComposite {}
export interface FeConvolveMatrix {}
export interface FeDiffuseLighting {}
export interface FeDisplacementMap {}
export interface FeDistantLight {}
export interface FeFlood {}
export interface FeFuncA {}
export interface FeFuncB {}
export interface FeFuncG {}
export interface FeFuncR {}
export interface FeGaussianBlur {}
export interface FeImage {}
export interface FeMerge {}
export interface FeMergeNode {}
export interface FeMorphology {}
export interface FeOffset {}
export interface FePointLight {}
export interface FeSpecularLighting {}
export interface FeSpotLight {}
export interface FeTile {}
export interface FeTurbulence {}
export interface Filter {}
export interface Font {}
export interface FontFace {}
export interface FontFaceFormat {}
export interface FontFaceName {}
export interface FontFaceSrc {}
export interface FontFaceUri {}
export interface ForeignObject {}

export interface G {
  children: any;
}

export interface Image {
  x: number;
  y: number;
  width: string;
  height: string;
  preserveAspectRatio: boolean;
  children: any;
}

export interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  children: any;
}

export interface LinearGradient {
  gradientUnits: any;
  gradientTransform: any;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  spreadMethod: any;
  children: any;
}

export interface Marker {
  markerUnits: any;
  refX: any;
  refY: any;
  markerWidth: number;
  markerHeight: number;
  orient: "auto"; // TODO
  children: any;
}

export interface Mask {
  maskUnits: MaskUnits;
  maskContentUnits: MaskUnits;
  x: number;
  y: number;
  width: string;
  height: string;
}

export interface Metadata {
  children: any; // yep
}

export interface Mpath {
  children: DescriptiveElements;
}

export interface Path {
  d: string;
  pathLength: number;
  fillOpacity: any;
  children: any;
}

export interface Pattern {
  patternUnits: any;
  patternContentUnits: any;
  patternTransform: any;
  x: number;
  y: number;
  width: string;
  height: string;
  preserveAspectRatio: boolean;
  children: any;
}

export interface Polygon {
  points: string;
  children: any;
}

export interface Polyline {
  points: string;
  children: any;
}

export interface RadialGradient {
  gradientUnits: any;
  gradientTransform: any;
  cx: number;
  cy: number;
  r: number;
  fx: number;
  fy: number;
  fr: number;
  spreadMethod: any;
  children: any;
}

export interface Rect {
  x: number;
  y: number;
  width: string;
  height: string;
  rx: number;
  ry: number;
  children: DescriptiveElements | AnimationElements;
}

export interface Script {
  children: any; // yep
}

export interface Set {
  to: any;
  children: DescriptiveElements;
}

export interface Stop {
  offset: any;
  stopColor: string;
  stopOpacity: string;
}

export interface Style {
  type: string;
  media: any;
  title: string;
  children: any; // yep
}

export interface Svg {
  version: string;
  baseProfile: string;
  x: number;
  y: number;
  width: string;
  height: string;
  preserveAspectRatio: boolean;
  contentScriptType: any;
  contentStyleType: any;
  viewBox: string;
  children: any;
}

export interface Switch {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: any;
  rotate: string;
  textLength: any;
  lengthAdjust: any;
  children: any;
}

export interface Symbol {
  viewBox: string;
  preserveAspectRatio: boolean;
  children: any;
}

export interface Text {
  children: any;
}

export interface TextPath {
  childern: A | Animate | Set | TSpan;
}

export interface Title {
  children: any; // yep
}
export interface TSpan {
  children: any;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: string;
  textLength: number;
  lengthAdjust: any;
}

export interface Use {
  children: any;
  x: number;
  y: number;
  width: string;
  height: string;
  href: string;
}

export interface View {
  children: any;
  viewBox: string;
  preserveAspectRatio: boolean;
  zoomAndPan: any;
  viewTarget: any;
}
