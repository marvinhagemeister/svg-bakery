import { parseString } from "xml2js";

export function parseXml(content: string): Promise<SVGAst> {
  return new Promise((resolve, reject) => {
    parseString(
      content,
      (err, result) => (err !== null ? reject(err) : resolve(result)),
    );
  });
}

export interface Options {
  mode: "symbol";
  addNamespace?: boolean;
}

const defaultOpts: Options = {
  mode: "symbol",
  addNamespace: true,
};

export interface VNode {
  tag: string;
  props: Record<string, string | number>;
  children: VNode[] | string[];
}

export function createVNode(tag: string): VNode {
  return {
    tag: "svg",
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
  const el = Object.keys(ast)[0];
  const tag = isRootAst(ast) ? "symbol" : el;
  const obj: Ast = (ast as any)[el];

  const vnode = createVNode(tag);
  if (obj.$ !== undefined) {
    vnode.props = obj.$;
  }

  vnode.children = parseChildren(obj);

  return vnode;
}

export function parseChildren(obj: Ast): VNode[] {
  return Object.keys(obj).filter(key => key !== "$").reduce((prev, key) => {
    const next: Ast | Ast[] = (obj as any)[key];
    const node = createVNode(key);

    // const children = next.map(it);
    if (Array.isArray(next)) {
      prev = [...prev, ...parseChildren(next)];
    } else {
      console.log("foo");
    }

    prev.push(node);
    return prev;
  }, []);
}

export async function buildSvg(contents: string[]): Promise<VNode> {
  const parsed = await Promise.all(contents.map(content => parseXml(content)));

  const out = createVNode("svg");
  out.props = {
    width: 1000,
    height: 1000,
  };

  out.children = parsed.map(file => {
    // We need to remove the root svg node.
    let id = file.svg.$.id;
    const nodes = Object.keys(file.svg).filter(key => key !== "$").map(key => {
      const vnode = createVNode(key);

      if (id === undefined && file.svg.title !== undefined) {
        id = file.svg.title[0];
      }
      vnode.props.id = id;

      if (Array.isArray((file as any)[key])) {
        vnode.children = (file as any)[key];
      }
      return vnode;
    });

    return [].concat.apply([], nodes);
  });

  return out;
}

export async function render(files: string[], opts: Options) {
  let out: string = '<?xml version="1.0" encoding="utf-8"?>\n<svg';

  if (opts.addNamespace) {
    out +=
      ' xmlns="http://www.w3.org/2000/svg" ' +
      'xmlns: xlink = "http://www.w3.org/1999/xlink"';
  }

  const parsed = await Promise.all(files.map(file => parseXml(file)));

  if (opts.mode === "symbol") {
    out += parsed
      .map(xml => {
        console.log(xml as any);

        let content = '<symbol viewBox="23 20 50 50" id="allgefahren">';

        content += "</symbol>";
        return content;
      })
      .join("");
  }

  return out;
}
