import { PropsTagNameMap } from "./shapes";
import { Visitor } from "./visitor";

export type Predicate = <N extends keyof PropsTagNameMap>(
  path: Node<N>,
) => boolean;

export interface Path<T extends keyof PropsTagNameMap> {
  parent: Node | undefined;
  children: Node[];
  tag: T;
  props: Partial<PropsTagNameMap[T]>;
  append(node: Node<T>): this;
  prepend(node: Node<T>): this;
  findParent(precicate: Predicate): Node<T> | undefined;
  findChildren(predicate: Predicate): Array<Node<T>>;
  find(predicate: Predicate): Array<Node<T>>;
  replaceWith(node: Node<T>): void;
  insertBefore(node: Node<T>): this;
  insertAfter(node: Node<T>): this;
  remove(): this;
  hasProps(): boolean;
}

export interface Props extends Record<string, any> {
  key?: string;
}

export default class Node<T extends keyof PropsTagNameMap = any>
  implements Path<T> {
  parent: Node | undefined;
  children: Node[];

  constructor(
    public tag: T,
    public props: Partial<PropsTagNameMap[T]> = {},
    children: Node[] = [],
  ) {
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

  replaceWith(node: Node, keepChildren: boolean = false): Node {
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

  hasProps() {
    return Object.keys(this.props).length > 0;
  }

  private _parentIdx(): number {
    return this.parent.children.findIndex(item => item === this);
  }
}
