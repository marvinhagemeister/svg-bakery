import { VNode } from "../vnode";

export type Predicate = <N>(path: Path<N>) => boolean;

export interface Path<T> {
  parent: VNode<any> | undefined;
  node: VNode<T>;
  is(node: any): node is T;
  findParent(precicate: Predicate): void;
  find(predicate: Predicate): void;
  replace(): void;
  replaceWithMultiple(): void;
  insertBefore(): void;
  insertAfter(): void;
  remove(): void;
}

export default class NodePath<T> implements Path<T> {
  parent = undefined;
  constructor(public node: VNode) {}

  is(node: string) {
    return this.node.tag === node;
  }

  find(predicate: Predicate) {}

  remove() {}
}
