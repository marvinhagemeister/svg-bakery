import { padStart, escape } from "vdom-utils";
import { File, parseXml, ast2VNode } from "./parser";
import { VNode, createVNode } from "./vnode";

export async function buildSvg(files: File[]): Promise<VNode> {
  const parsed = await Promise.all(
    files.map(async file => {
      const ast = await parseXml(file.content);
      ast.svg.$.id = file.id;
      return ast;
    }),
  );
  const trees = parsed.map(ast => ast2VNode(ast));

  const out = createVNode("svg");
  out.props = {
    width: 1000,
    height: 1000,
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
  };

  out.children = trees.map(file => {
    file.tag = "symbol";
    delete file.props.xmlns;
    delete file.props["xmlns:svg"];
    delete file.props["xmlns:xlink"];
    delete file.props.preserveAspectRatio;

    const { width, height } = file.props;
    if (width !== undefined && height !== undefined) {
      file.props.viewBox = `0 0 ${width} ${height}`;
      delete file.props.width;
      delete file.props.height;
    }

    return file;
  });

  return out;
}

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
