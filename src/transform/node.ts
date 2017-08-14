import { VNode } from "../vnode";

export type Predicate = <N>(path: Node<N>) => boolean;

export interface Path {
  append(node: Node): this;
  prepend(node: Node): this;
  findParent(precicate: Predicate): Node | undefined;
  findChildren(predicate: Predicate): Node[];
  find(predicate: Predicate): Node[];
  replace(node: Node): void;
  insertBefore(node: Node): this;
  insertAfter(node: Node): this;
  remove(): this;
}

export interface NodeBase<P extends Props = {}> {
  parent: Node | undefined;
  children: Node[];
  tag: string;
  props: P;
}

export interface Props extends Record<string, any> {
  key?: string;
}

export default class Node<P extends Props = {}> implements Path, NodeBase<P> {
  props: P;
  parent: Node | undefined;
  children: Node[];

  constructor(public tag: string, props?: P, children: Node[] = []) {
    this.props = props;
    this.children = children.map(child => {
      child.parent = this;
      return child;
    });
  }

  append(...nodes: Node[]) {
    for (const node of nodes) {
      node.parent = this;
    }

    this.children.push(...nodes);
    return this;
  }

  prepend(...nodes: Node[]) {
    for (const node of nodes) {
      node.parent = this;
    }

    this.children.unshift(...nodes);
    return this;
  }

  find(predicate: Predicate): Node[] {
    const result: Node[] = [];
    for (const child of this.children) {
      if (predicate(child)) {
        result.push(child);
      }

      result.push(...child.find(predicate));
    }

    return result;
  }

  findChildren(predicate: Predicate) {
    const result: Node[] = [];
    for (const child of this.children) {
      if (predicate(child)) {
        result.push(child);
      }
    }

    return result;
  }

  findParent(predicate: Predicate): Node | undefined {
    let next = this.parent;
    while (next !== undefined) {
      if (predicate(next)) {
        return next;
      }

      next = next.parent;
    }
  }

  remove() {
    if (this.parent === undefined) {
      return;
    }

    const idx = this._parentIdx();
    if (idx !== undefined) {
      this.parent.children.splice(idx, 1);
      this.parent = undefined;
    }

    return this;
  }

  replace(node: Node, keepChildren: boolean = false) {
    if (this.parent === undefined) {
      if (keepChildren) {
        node.children = this.children;
      }
      return node;
    }

    const idx = this._parentIdx();
    this.parent.children[idx] = node;
    return this;
  }

  insertBefore(node: Node) {
    const idx = this._parentIdx();
    if (idx !== undefined) {
      this.parent.children.splice(idx, 0, node);
    }

    return this;
  }

  insertAfter(node: Node) {
    const idx = this._parentIdx();
    if (idx !== undefined) {
      this.parent.children.splice(idx + 1, 0, node);
    }

    return this;
  }

  // TODO: Switch `Node` to a double linked list structure to remove
  // this loop. Should give a slight performance boost.
  private _parentIdx(): number {
    return this.parent.children.findIndex(item => item === this);
  }
}
