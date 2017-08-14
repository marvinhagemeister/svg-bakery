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
  next: Node | undefined;
  prev: Node | undefined;
  tag: string;
  props: P;
}

export interface Props extends Record<string, any> {
  key?: string;
}

export default class Node<P extends Props = {}> implements Path, NodeBase<P> {
  props: P;
  parent: Node | undefined;
  next: Node | undefined;
  prev: Node | undefined;
  firstChild: Node | undefined;
  lastChild: Node | undefined;

  constructor(public tag: string, props?: P, children: Node[] = []) {
    this.props = props;
    children.forEach((child, i) => {
      child.parent = this;

      if (i === 0) {
        this.firstChild = child;
        if (children.length === 1) {
          this.lastChild = child;
        }
      } else {
        const prev = children[i - 1];
        child.prev = prev;
        prev.next = child;

        if (i === children.length - 1) {
          this.lastChild = child;
        }
      }
    });
  }

  append(...nodes: Node[]) {
    nodes.forEach((node, i) => {
      if (i === 0) {
        if (this.lastChild === undefined) {
          this.firstChild = node;
        }
      } else {
        this.lastChild.next = node;
        node.prev = this.lastChild;
      }

      this.lastChild = node;
      node.parent = this;
    });

    return this;
  }

  prepend(...nodes: Node[]) {
    return this;
  }

  find(predicate: Predicate): Node[] {
    if (this.firstChild === undefined) {
      return [];
    }

    const result: Node[] = [];
    let node = this.firstChild;
    while (node.next !== undefined) {
      if (predicate(node)) {
        result.push(node);
      }
      result.push(...node.find(predicate));
      node = node.next;
    }

    return result;
  }

  findChildren(predicate: Predicate) {
    if (this.firstChild === undefined) {
      return [];
    }

    const result: Node[] = [];
    let node = this.firstChild;
    while (node.next !== undefined) {
      if (predicate(node)) {
        result.push(node);
      }
      node = node.next;
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
    if (this.prev !== undefined) {
      this.prev.next = this.next;
    }

    if (this.next !== undefined) {
      this.next.prev = this.prev !== undefined ? this.prev : undefined;
    }

    if (this.parent === undefined) {
      return;
    } else if (this.parent.firstChild === this) {
      this.parent.firstChild = undefined;
    }

    return this;
  }

  replace(node: Node, keepChildren: boolean = false) {
    if (this.parent === undefined) {
      if (keepChildren) {
        node.firstChild = this.firstChild;
      }
      return node;
    }

    return this;
  }

  insertBefore(node: Node) {
    node.next = this;
    node.prev = this.prev;
    this.prev = node;
    return this;
  }

  insertAfter(node: Node) {
    node.next = this.next;
    this.next = node;
    return this;
  }
}
