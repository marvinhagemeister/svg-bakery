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
    });

    it("should set firstChild and lastChild with one child", () => {
      const child = new Node("bar");
      const node = new Node("foo", {}, [child]);

      t.strictEqual(node.firstChild, child);
      t.strictEqual(node.lastChild, child);
    });

    it("should set firstChild and lastChild with multiple children", () => {
      const child1 = new Node("bar");
      const child2 = new Node("baz");
      const node = new Node("foo", {}, [child1, child2]);

      t.strictEqual(node.firstChild, child1);
      t.strictEqual(node.lastChild, child2);
    });

    it("should create child nodes from array", () => {
      const child1 = new Node("bar");
      const child2 = new Node("baz");
      const child3 = new Node("boof");
      const node = new Node("foo", {}, [child1, child2, child3]);

      t.strictEqual(node.firstChild, child1);
      t.strictEqual(node.lastChild, child3);
      t.strictEqual(node.firstChild, child1);
      t.strictEqual(child1.next, child2);
      t.strictEqual(child2.next, child3);
      t.equal(child3.next, undefined);
    });
  });

  describe("remove()", () => {
    it("should work with no children", () => {
      const tree = new Node("foo");
      tree.remove();
    });

    it("should remove itself from parent", () => {
      const child = new Node("child");
      const tree = new Node("foo", {}, [child]);

      t.strictEqual(tree.firstChild, child);
      child.remove();

      t.equal(tree.firstChild, undefined);
    });

    it("should remove node when parent has multiple children", () => {
      const child1 = new Node("child1");
      const child2 = new Node("child2");
      const tree = new Node("foo", {}, [child1, child2]);

      child1.remove();

      t.equal(tree.firstChild, child2);
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
      // t.equal(res.children.length, 0);
    });

    it("should replace node with parent", () => {
      const root = new Node("root");
      const tree = new Node("foo");
      const child = new Node("child");
      const child2 = new Node("child2");

      tree.append(child);
      child.append(child2);
      child.replace(root);

      // t.equal(root.children.length, 0);
    });

    it("should keep children", () => {
      const root = new Node("root");
      const tree = new Node("foo");
      const child = new Node("child");
      const child2 = new Node("child2");

      tree.append(child);
      child.append(child2);
      tree.replace(root, true);

      // t.equal(root.children.length, 1);
      // t.equal(root.children[0].tag, "child");
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
