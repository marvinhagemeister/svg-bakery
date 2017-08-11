export interface VNode {
  parent: VNode | undefined;
  tag: string;
  props: Record<string, string | number>;
  children: VNode[];
}

export function createVNode(tag: string): VNode {
  return {
    parent: undefined,
    tag,
    props: {},
    children: [],
  };
}
