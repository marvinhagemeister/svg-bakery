import { parseString } from "xml2js";
import Node from "./transform/Node";

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

export function ast2VNode(ast: SVGAst | Record<string, Ast>): Node<any> {
  const tag = Object.keys(ast)[0];
  const obj: Ast = (ast as any)[tag];

  const node = new Node(tag as any);
  if (obj.$ !== undefined) {
    node.props = obj.$;
  }

  node.children = parseChildren(obj) as any;

  return node;
}

export function parseChildren(obj: Ast): Array<Node<any>> {
  return Object.keys(obj).filter(key => key !== "$").map(key => {
    const node = new Node(key as any);
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
