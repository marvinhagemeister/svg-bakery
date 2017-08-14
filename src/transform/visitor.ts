import Node from "./node";
import { PropsTagNameMap } from "./shapes";

export type Visitor<S = {}> = {
  [key in keyof PropsTagNameMap]?: (
    node: PropsTagNameMap[key],
    state: S,
  ) => void
};

//   a?(path: Node<t.A>, state: S): void;
//   animate?(path: Node<t.Animate>, state: S): void;
//   animateMotion?(path: Node<t.AnimateMotion>, state: S): void;
//   animateTransform?(path: Node<t.AnimateTransform>, state: S): void;
//   circle?(path: Node<t.Circle>, state: S): void;
//   clipNode?(path: Node<t.ClipPath>, state: S): void;
//   colorProfile?(path: Node<t.ColorProfile>, state: S): void;
//   defs?(path: Node<t.Defs>, state: S): void;
//   desc?(path: Node<t.Desc>, state: S): void;
//   ellipse?(path: Node<t.Ellipse>, state: S): void;
//   feBlend?(path: Node<t.FeBlend>, state: S): void;
//   feColorMatrix?(path: Node<t.FeColorMatrix>, state: S): void;
//   feComponentTransfer?(path: Node<t.FeComponentTransfer>, state: S): void;
//   feComposite?(path: Node<t.FeComposite>, state: S): void;
//   feConvolveMatrix?(path: Node<t.FeConvolveMatrix>, state: S): void;
//   feDiffuseLighting?(path: Node<t.FeDiffuseLighting>, state: S): void;
//   feDisplacementMap?(path: Node<t.FeDisplacementMap>, state: S): void;
//   feDistantLight?(path: Node<t.FeDistantLight>, state: S): void;
//   feFlood?(path: Node<t.FeFlood>, state: S): void;
//   feFuncA?(path: Node<t.FeFuncA>, state: S): void;
//   feFuncB?(path: Node<t.FeFuncB>, state: S): void;
//   feFuncG?(path: Node<t.FeFuncG>, state: S): void;
//   feFuncR?(path: Node<t.FeFuncR>, state: S): void;
//   feGaussianBlur?(path: Node<t.FeGaussianBlur>, state: S): void;
//   feImage?(path: Node<t.FeImage>, state: S): void;
//   feMerge?(path: Node<t.FeMerge>, state: S): void;
//   feMergeNode?(path: Node<t.FeMergeNode>, state: S): void;
//   feMorphology?(path: Node<t.FeMorphology>, state: S): void;
//   feOffset?(path: Node<t.FeOffset>, state: S): void;
//   fePointLight?(path: Node<t.FePointLight>, state: S): void;
//   feSpecularLighting?(path: Node<t.FeSpecularLighting>, state: S): void;
//   feSpotLight?(path: Node<t.FeSpotLight>, state: S): void;
//   feTile?(path: Node<t.FeTile>, state: S): void;
//   feTurbulence?(path: Node<t.FeTurbulence>, state: S): void;
//   filter?(path: Node<t.Filter>, state: S): void;
//   foreignObject?(path: Node<t.ForeignObject>, state: S): void;
//   g?(path: Node<t.G>, state: S): void;
//   image?(path: Node<t.Image>, state: S): void;
//   line?(path: Node<t.Line>, state: S): void;
//   linearGradient?(path: Node<t.LinearGradient>, state: S): void;
//   marker?(path: Node<t.Marker>, state: S): void;
//   mask?(path: Node<t.Mask>, state: S): void;
//   metadata?(path: Node<t.Metadata>, state: S): void;
//   mpath?(path: Node<t.Mpath>, state: S): void;
//   path?(path: Node<t.Path>, state: S): void;
//   pattern?(path: Node<t.Pattern>, state: S): void;
//   polygon?(path: Node<t.Polygon>, state: S): void;
//   polyline?(path: Node<t.Polyline>, state: S): void;
//   radialGradient?(path: Node<t.RadialGradient>, state: S): void;
//   rect?(path: Node<t.Rect>, state: S): void;
//   script?(path: Node<t.Script>, state: S): void;
//   set?(path: Node<t.Set>, state: S): void;
//   stop?(path: Node<t.Stop>, state: S): void;
//   style?(path: Node<t.Style>, state: S): void;
//   svg?(path: Node<t.Svg>, state: S): void;
//   switch?(path: Node<t.Switch>, state: S): void;
//   symbol?(path: Node<t.SVGSymbol>, state: S): void;
//   text?(path: Node<t.Text>, state: S): void;
//   textNode?(path: Node<t.TextPath>, state: S): void;
//   title?(path: Node<t.Title>, state: S): void;
//   tspan?(path: Node<t.TSpan>, state: S): void;
//   use?(path: Node<t.Use>, state: S): void;
//   view?(path: Node<t.View>, state: S): void;
// }

export function traverse(node: Node, visitor: Visitor): Node {
  if (Object.keys(visitor).length === 0) {
    return node;
  }

  return visit(node, visitor, {});
}

function visit(node: Node, visitor: Visitor, state: object): Node {
  const fn = (visitor as any)[node.tag];
  if (fn !== undefined) {
    fn(node, state);
  }

  node.children.map(child => visit(child, visitor, state));

  return node;
}
