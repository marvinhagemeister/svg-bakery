import { Visitor } from "../transform/visitor";
import Node from "../transform/Node";

export function plugin() {
  const visitor: Visitor = {
    svg(node) {
      const props = node.props;
      delete props.xmlns;
      delete props["xmlns:svg"];
      delete props["xmlns:xlink"];
      delete props.preserveAspectRatio;

      const symbol = new Node("symbol", props, node.children);
      node.replaceWith(symbol);
    },
  };

  return visitor;
}
