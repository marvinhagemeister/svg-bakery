import { assert as t } from "chai";
import Node from "../Node";

describe("Node", () => {
  describe("constructor", () => {
    it("should instantiate", () => {
      const n1 = new Node("foo");
      t.equal(n1.tag, "foo");

      const n2 = new Node("bar", { class: "foo" });
      t.deepEqual(n2.props, {
        class: "foo",
      });
      // TODO: Add support for string children
      // const n2 = new Node("foo", {}, ["foo"]);
    });

    it("should create child nodes from array", () => {
      const node = new Node("foo", {}, [new Node("bar"), new Node("boof")]);
      t.equal(node.children.length, 2);
      t.equal(node.children[0].tag, "bar");
      t.equal(node.children[1].tag, "boof");
    });
  });

  describe("remove()", () => {
    it("should remove node", () => {
      const tree = new Node("foo", {});
      const child = new Node("child", {});
      tree.append(child);

      t.equal(child.parent.tag, "foo");

      child.remove();
      t.equal(child.parent, undefined);
      t.equal(tree.children.length, 0);
    });
  });

  describe("findParent()", () => {
    it("should findParent()", () => {
      const tree = new Node("foo", {});
      const child = new Node("child", {});
      tree.append(child);

      const res = child.findParent(node => node.tag === "foo");
      t.equal(res instanceof Node, true);
      t.equal(res.tag, "foo");

      const res2 = child.findParent(node => node.tag === "nope");
      t.equal(res2, undefined);
    });
  });

  describe("replace()", () => {
    it("should work node = root", () => {
      const tree = new Node("foo");
      const root = new Node("root");
      const child = new Node("child");
      tree.append(child);

      const res = tree.replace(root);

      t.equal(res.tag, "root");
      t.equal(res.children.length, 0);
    });

    it("should replace node with parent", () => {
      const root = new Node("root");
      const tree = new Node("foo");
      const child = new Node("child");
      const child2 = new Node("child2");

      tree.append(child);
      child.append(child2);
      child.replace(root);

      t.equal(root.children.length, 0);
    });

    it("should keep children", () => {
      const root = new Node("root");
      const tree = new Node("foo");
      const child = new Node("child");
      const child2 = new Node("child2");

      tree.append(child);
      child.append(child2);
      tree.replace(root, true);

      t.equal(root.children.length, 1);
      t.equal(root.children[0].tag, "child");
    });
  });

  describe("find()", () => {
    it("should find all instances of element", () => {
      const root = new Node("foo", {}, [
        new Node("bar"),
        new Node("baz", {}, [new Node("bar")]),
      ]);
      const res = root.find(node => node.tag === "bar");

      t.equal(res.length, 2);
      t.equal(res[0].tag, "bar");
    });
  });

  describe("findChildren()", () => {
    it("should find child", () => {
      const root = new Node("foo", {}, [
        new Node("bar"),
        new Node("baz", {}, [new Node("bar")]),
      ]);
      const res = root.findChildren(node => node.tag === "bar");

      t.equal(res.length, 1);
      t.equal(res[0].tag, "bar");
    });
  });
});
