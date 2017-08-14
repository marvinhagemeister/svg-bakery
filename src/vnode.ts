export interface VNode {
  tag: string;
  props: Record<string, string | number>;
  children: VNode[];
}

export function createVNode(tag: string): VNode {
  return {
    tag,
    props: {},
    children: [],
  };
}
