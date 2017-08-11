import { VNode } from "../vnode";

export type Predicate = <N>(path: Node<N>) => boolean;

export interface Path {
  is(tag: string): boolean;
  findParent(precicate: Predicate): void;
  find(predicate: Predicate): void;
  replace(node: Node<any>): void;
  insertBefore(): void;
  insertAfter(): void;
  remove(): void;
}

export interface Props extends Record<string, any> {
  key?: string;
}

export default class Node<P extends Props = {}> implements Path {
  parent: Node | undefined;

  constructor(
    public tag: string,
    public props: P,
    public children: Node[] = [],
  ) {}

  is(tag: string) {
    return this.tag === tag;
  }

  find(predicate: Predicate) {}

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
    }
  }

  replace(node: Node) {
    if (this.parent === undefined) {
      return;
    }

    const idx = this._parentIdx();
    this.parent[idx] = node;
  }

  insertBefore() {}

  insertAfter() {}

  private _parentIdx(): number {
    return this.parent.children.findIndex(item => item === this);
  }
}
