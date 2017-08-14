import Node from "./node";
import { PropsTagNameMap } from "./shapes";

export type Visitor<S = {}> = {
  [key in keyof PropsTagNameMap]?: (
    node: PropsTagNameMap[key],
    state: S,
  ) => void
};

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
