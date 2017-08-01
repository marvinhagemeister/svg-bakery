import { parseString } from "xml2js";
import { padStart, escape } from "vdom-utils";

export function parseXml(content: string): Promise<SVGAst> {
  return new Promise((resolve, reject) => {
    parseString(
      content,
      (err, result) => (err !== null ? reject(err) : resolve(result)),
    );
  });
}

export interface VNode {
  tag: string;
  props: Record<string, string | number>;
  children: VNode[] | string[];
}

export function createVNode(tag: string): VNode {
  return {
    tag,
    props: {},
    children: [],
  };
}

export interface SVGAst {
  svg: Ast;
}

export interface Ast {
  $?: Record<string, string>;
  title?: string[];
  ellipse?: Ast[];
  polygon?: Ast[];
  g?: Ast[];
  [index: string]: any;
}

export function isRootAst(ast: SVGAst | Ast): ast is SVGAst {
  return (ast as any).svg !== undefined;
}

export function ast2VNode(ast: SVGAst | Record<string, Ast>): VNode {
  const tag = Object.keys(ast)[0];
  const obj: Ast = (ast as any)[tag];

  const vnode = createVNode(tag);
  if (obj.$ !== undefined) {
    vnode.props = obj.$;
  }

  vnode.children = parseChildren(obj);

  return vnode;
}

export function parseChildren(obj: Ast): VNode[] | string[] {
  return Object.keys(obj).filter(key => key !== "$").map(key => {
    const node = createVNode(key);
    const next: Ast[] = obj[key];

    node.children = next.reduce((prev, item) => {
      if (item !== null && typeof item === "object") {
        if (item.$ !== undefined) {
          node.props = item.$;
        }

        const children = parseChildren(item);
        prev = [...prev, ...children];
      } else {
        prev.push(item);
      }
      return prev;
    }, []);
    return node;
  });
}

export async function buildSvg(contents: string[]): Promise<VNode> {
  const parsed = await Promise.all(contents.map(content => parseXml(content)));
  const trees = parsed.map(ast => ast2VNode(ast));

  console.log(trees);

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
    delete file.props.preserveAspectRatio;
    return file;
  });

  return out;
}

export function renderToString(vnode: VNode, depth: number = 0): string {
  const { tag, props, children } = vnode;
  let out = "<" + tag;

  const keys = Object.keys(props);
  if (keys.length > 0) {
    out +=
      " " + keys.map(key => `${escape(key)}="${escape(props[key])}"`).join(" ");
  }
  out += ">\n";

  if (children.length > 0) {
    const res = (children as any[])
      .map(child => {
        if (typeof child === "string") {
          return escape(child);
        }
        return renderToString(child, depth + 1);
      })
      .map(item => padStart(item, depth * 2));
    out += res.join("\n") + "\n";
  }

  out += padStart(`</${tag}>`, (depth - 1) * 2);

  return out;
}

export async function render(files: string[]) {
  const nodes = await buildSvg(files);
  console.log(JSON.stringify(nodes, null, 2));

  let out: string = '<?xml version="1.0" encoding="utf-8"?>\n';
  out += renderToString(nodes, 1) + "\n";

  return out;
}
