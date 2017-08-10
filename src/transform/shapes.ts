export type Length = number | string;
export type CalcMode = "discrete" | "linear" | "paced" | "spline";
export type RepeatCount = number | "indefinite";
export type MaskUnits = "userSpaceOnUse" | "objectBoundingBox";
export type ColorChannel = "R" | "G" | "B" | "A";

export type AnimationElements =
  | Animate
  | AnimateMotion
  | AnimateTransform
  | Mpath
  | Set;
export type ContainerElements =
  | A
  | Defs
  | G
  | Marker
  | Mask
  | Pattern
  | Svg
  | Switch
  | SVGSymbol;
export type DescriptiveElements = Desc | Metadata | Title;
export type GradientElements = LinearGradient | RadialGradient | Stop;
export type FilterElements =
  | FeBlend
  | FeColorMatrix
  | FeComponentTransfer
  | FeComposite
  | FeConvolveMatrix
  | FeDiffuseLighting
  | FeDisplacementMap
  | FeDropShadow
  | FeFlood
  | FeFuncA
  | FeFuncB
  | FeFuncG
  | FeFuncR
  | FeGaussianBlur
  | FeImage
  | FeMerge
  | FeMergeNode
  | FeMorphology
  | FeOffset
  | FeSpecularLighting
  | FeTile
  | FeTurbulence;

export interface PresentationAttributes {}

export interface TransferAttributes {
  type: any;
  tableValues: any;
  slope: any;
  intercept: any;
  amplitude: any;
  exponent: any;
  offset: any;
}

export interface XLinkAttributes {}

export interface ExternalResources {
  externalResourcesRequired: boolean;
}

export interface CoreAttributes {
  id: string;
  "xml:base": string;
  "xml:lang": string;
  "xml:space": string;
  tabindex: number;
}

export interface FilterAttributes {
  height: string;
  result: FilterElements;
  width: string;
  x: number;
  y: number;
}

export interface StyleAttributes {
  class: string;
  style: string;
}

export interface Dimension {
  width: string;
  height: string;
}

export interface Position2D {
  x: number;
  y: number;
}

export interface A {
  children: any;
  href: string;
  target: any;
}

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

export interface FeBlend {
  children: Animate | Set;
  in: string;
  in2: string;
  mode: "normal" | "multiply" | "screen" | "darken" | "lighten";
}

export interface FeColorMatrix {
  children: Animate | Set;
  in: string;
  type: "translate" | "scale" | "rotate" | "skewX" | "skewY";
  values: string | number;
}

export interface FeComponentTransfer {
  children: FeFuncA | FeFuncB | FeFuncG | FeFuncR;
  in: string;
}

export interface FeComposite {
  children: Animate | Set;
  in: string;
  in2: string;
  operator: "over" | "in" | "out" | "atop" | "xor" | "arithmetic";
  k1: number;
  k2: number;
  k3: number;
  k4: number;
}

export interface FeConvolveMatrix {
  children: Animate | Set;
  in: string;
  order: number;
  kernelMatrix: string; // FIXME: of numbers
  divisor: number;
  bias: number;
  targetX: number;
  targetY: number;
  edgeMode: "duplicate" | "wrap" | "none";
  kernelUnitLength: number;
  preserveAlpha: boolean;
}

export interface FeDiffuseLighting
  extends StyleAttributes,
    FilterAttributes,
    CoreAttributes,
    PresentationAttributes {
  in: string;
  surfaceScale: number;
  diffuseConstant: number;
  kernelUnitLength: number;
}

export interface FeDisplacementMap
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes {
  children: Animate | Set;
  in: string;
  in2: string;
  scale: number;
  xChannelSelector: ColorChannel;
  yChannelSelector: ColorChannel;
}

export interface FeDistantLight extends CoreAttributes {
  azimuth: number;
  elevation: number;
}

export interface FeDropShadow
  extends StyleAttributes,
    FilterAttributes,
    PresentationAttributes {
  children: Animate | Script | Set;
  in: string;
  stdDeviation: number;
  dx: number;
  dy: number;
}

export interface FeFlood
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes,
    StyleAttributes {
  floodColor: string;
  floodOpacity: number;
}

export interface FeFuncA extends CoreAttributes, TransferAttributes {
  childern: Animate | Set;
}

// tslint:disable-next-line:no-empty-interface
export interface FeFuncB extends FeFuncA {}
// tslint:disable-next-line:no-empty-interface
export interface FeFuncG extends FeFuncA {}
// tslint:disable-next-line:no-empty-interface
export interface FeFuncR extends FeFuncA {}

export interface FeGaussianBlur
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes,
    StyleAttributes {
  in: string;
  stdDeviation: number;
  edgeMode: "duplicate" | "wrap" | "none";
}

export interface FeImage
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes,
    XLinkAttributes,
    StyleAttributes,
    ExternalResources {
  preserveAspectRatio: boolean;
  "xlink:href": string;
}

export interface FeMerge {
  children: FeMergeNode;
}

/**
 * Takes the result of another filter to be processed by its parent `<feMerge>`
 */
export interface FeMergeNode {
  children: Animate | Set;
  in: string;
}

/**
 * Is used to erode or dilate the input image. It's usefulness lies especially
 * in fattening or thinning effects.
 */
export interface FeMorphology
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes,
    StyleAttributes {
  children: Animate | Set;
  in: string;
  radius: number;
  operator: "erode" | "dilate";
}

/**
 * Allows to offset the input image. The input image as a whole is offset by the
 * values specified in the dx and dy attributes.
 */
export interface FeOffset
  extends CoreAttributes,
    PresentationAttributes,
    FilterAttributes,
    StyleAttributes {
  children: Animate | Set;
  in: string;
  dx: number;
  dy: number;
}

/** Allows to create a point light effect. */
export interface FePointLight {
  children: Animate | Set;
  x: number;
  y: number;
  z: number;
}

export interface FeSpecularLighting {}

export interface FeSpotLight {}
export interface FeTile {}
export interface FeTurbulence {}
export interface Filter
  extends CoreAttributes,
    PresentationAttributes,
    XLinkAttributes,
    StyleAttributes,
    ExternalResources,
    Dimension,
    Position2D {
  children: DescriptiveElements | FilterElements | Animate | Set;
  filterRes: any;
  filterUnits: any;
  primitiveUnits: any;
  "xlink:href": string;
}

// FIXME: interfaces
/**
 * Allows for inclusion of a foreign XML namespace which has its graphical
 * content drawn by a different user agent. The included foreign graphical
 * content is subject to SVG transformations and compositing.
 */
export interface ForeignObject
  extends CoreAttributes,
    PresentationAttributes,
    StyleAttributes,
    ExternalResources,
    Dimension,
    Position2D {
  children: any; // yep
}

export interface G {
  children: any;
}

export interface Image extends Dimension, Position2D {
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

export interface Mask extends Dimension, Position2D {
  maskUnits: MaskUnits;
  maskContentUnits: MaskUnits;
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

export interface Pattern extends Dimension, Position2D {
  patternUnits: any;
  patternContentUnits: any;
  patternTransform: any;
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

export interface Rect extends Dimension, Position2D {
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

export interface Svg extends Dimension, Position2D {
  version: string;
  baseProfile: string;
  preserveAspectRatio: boolean;
  contentScriptType: any;
  contentStyleType: any;
  viewBox: string;
  children: any;
}

export interface Switch extends Position2D {
  dx: number;
  dy: number;
  textAnchor: any;
  rotate: string;
  textLength: any;
  lengthAdjust: any;
  children: any;
}

export interface SVGSymbol {
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
export interface TSpan extends Position2D {
  children: any;
  dx: number;
  dy: number;
  rotate: string;
  textLength: number;
  lengthAdjust: any;
}

export interface Use extends Dimension, Position2D {
  children: any;
  href: string;
}

export interface View {
  children: any;
  viewBox: string;
  preserveAspectRatio: boolean;
  zoomAndPan: any;
  viewTarget: any;
}
