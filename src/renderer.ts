import { padStart, escape } from "vdom-utils";
import { File, parseXml, ast2VNode } from "./parser";
import { VNode, createVNode } from "./vnode";
import { buildSvg } from "./modes/symbol";

export function renderToString(vnode: VNode, depth: number): string {
  const { tag, props, children } = vnode;
  let out = "<" + tag;

  const keys = Object.keys(props).sort();
  if (keys.length > 0) {
    out +=
      " " + keys.map(key => `${escape(key)}="${escape(props[key])}"`).join(" ");
  }

  if (children.length === 0) {
    out += "/>";
    return out;
  }

  out += ">\n";

  out += (children as any[])
    .map(child => {
      if (typeof child === "string") {
        return escape(child);
      }
      return renderToString(child, depth + 1);
    })
    .map(item => padStart(item, depth * 2))
    .join("\n");

  out += "\n" + padStart(`</${tag}>`, (depth - 1) * 2);

  return out;
}

export async function render(files: File[]) {
  const nodes = await buildSvg(files);

  let out: string = '<?xml version="1.0" encoding="utf-8"?>\n';
  out += renderToString(nodes, 1) + "\n";

  return out;
}
