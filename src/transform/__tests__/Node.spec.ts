import { assert as t } from "chai";
import Node from "../Node";

describe("Node", () => {
  describe("constructor", () => {
    it("should instantiate", () => {
      const n1 = new Node("svg");
      t.equal(n1.tag, "svg");

      // FIXME: Types
      const n2 = new Node("svg", { class: "foo" } as any);
      t.deepEqual(
        n2.props,
        {
          class: "foo",
        } as any,
      );
    });

    it("should create child nodes from array", () => {
      const node = new Node("svg", {}, [new Node("g"), new Node("ellipse")]);
      t.equal(node.children.length, 2);
      t.equal(node.children[0].tag, "g");
      t.equal(node.children[1].tag, "ellipse");
    });
  });

  describe("remove()", () => {
    it("should remove node", () => {
      const tree = new Node("g");
      const child = new Node("circle");
      tree.append(child);

      t.equal(child.parent.tag, "g");

      child.remove();
      t.equal(child.parent, undefined);
      t.equal(tree.children.length, 0);
    });
  });

  describe("findParent()", () => {
    it("should findParent()", () => {
      const tree = new Node("g", {});
      const child = new Node("path", {});
      tree.append(child);

      const res = child.findParent(node => node.tag === "g");
      t.equal(res instanceof Node, true);
      t.equal(res.tag, "g");

      const res2 = child.findParent(node => node.tag === "nope");
      t.equal(res2, undefined);
    });
  });

  describe("replace()", () => {
    it("should work node = root", () => {
      const tree = new Node("svg");
      const root = new Node("g");
      const child = new Node("circle");
      tree.append(child);

      const res = tree.replace(root);

      t.equal(res.tag, "g");
      t.equal(res.children.length, 0);
    });

    it("should replace node with parent", () => {
      const root = new Node("svg");
      const tree = new Node("g");
      const child = new Node("circle");
      const child2 = new Node("ellipse");

      tree.append(child);
      child.append(child2);
      child.replace(root);

      t.equal(root.children.length, 0);
    });

    it("should keep children", () => {
      const root = new Node("svg");
      const tree = new Node("g");
      const child = new Node("circle");
      const child2 = new Node("ellipse");

      tree.append(child);
      child.append(child2);
      tree.replace(root, true);

      t.equal(root.children.length, 1);
      t.equal(root.children[0].tag, "circle");
    });
  });

  describe("find()", () => {
    it("should find all instances of element", () => {
      const root = new Node("svg", {}, [
        new Node("circle"),
        new Node("ellipse", {}, [new Node("ellipse")]),
      ]);
      const res = root.find(node => node.tag === "ellipse");

      t.equal(res.length, 2);
      t.equal(res[0].tag, "ellipse");
    });
  });

  describe("findChildren()", () => {
    it("should find child", () => {
      const root = new Node("svg", {}, [
        new Node("circle"),
        new Node("ellipse", {}, [new Node("text")]),
      ]);
      const res = root.findChildren(node => node.tag === "circle");

      t.equal(res.length, 1);
      t.equal(res[0].tag, "circle");
    });
  });

  describe("append()", () => {
    it("should append children", () => {
      const root = new Node("svg", {}, [new Node("circle")]);
      const child = new Node("circle");

      root.append(child, child);
      t.equal(root.children.length, 3);
      t.strictEqual(root.children[1], child);
      t.strictEqual(root.children[2], child);
    });
  });

  describe("prepend()", () => {
    it("should prepend children", () => {
      const root = new Node("svg", {}, [new Node("circle")]);
      const child = new Node("circle");

      root.prepend(child, child);
      t.equal(root.children.length, 3);
      t.strictEqual(root.children[0], child);
      t.strictEqual(root.children[1], child);
    });
  });
});
