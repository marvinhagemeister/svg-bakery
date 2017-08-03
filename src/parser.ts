import { parseString } from "xml2js";
import { VNode, createVNode } from "./vnode";

export function parseXml(content: string): Promise<SVGAst> {
  return new Promise((resolve, reject) => {
    parseString(
      content,
      (err, result) => (err !== null ? reject(err) : resolve(result)),
    );
  });
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

export interface File {
  id: string;
  content: string;
}
