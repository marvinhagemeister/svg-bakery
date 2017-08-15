import { Visitor } from "../transform/visitor";
import { Plugin } from "../transform/plugin";
import Node from "../transform/Node";

export interface State {
  seen: Set<Node>;
}

export function cleanupParent(node: Node, state: State) {
  let next = node;
  while (next !== undefined && !state.seen.has(next)) {
    state.seen.add(next);

    if (next.props.fill === "none") {
      delete next.props.fill;
    }

    next = next.parent;
  }
}

export interface Options {
  colorToReplace: string;
}

export function plugin(opts: Options): Plugin {
  const fn = (node: Node, state: State) => {
    cleanupParent(node, state);
    if (node.props.fill === opts.colorToReplace) {
      node.props.fill = "currentcolor";
    }
  };

  const visitor: Visitor<State> = {
    path: fn,
    ellipse: fn,
    circle: fn,
    polygon: fn,
    polyline: fn,
    pattern: fn,
  };

  return {
    visitor,
  };
}
