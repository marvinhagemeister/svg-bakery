import { assert as t } from "chai";
import * as sinon from "sinon";
import { traverse } from "../visitor";
import Node from "../Node";

describe("traverse", () => {
  it("should do nothing if emtpy", () => {
    const root = new Node("svg");
    t.strictEqual(traverse(root, {}), root);
  });

  it("should call listener", () => {
    const root = new Node("svg");
    const spy = sinon.spy();

    traverse(root, {
      svg() {
        spy();
      },
    });

    t.equal(spy.callCount, 1);
  });

  it("should mutate tree", () => {
    const root = new Node("svg");
    const res = traverse(root, {
      svg(node) {
        node.children = [new Node("g")];
      },
    });

    t.equal(res.children.length, 1);
    t.equal(res.children[0].tag, "g");
  });

  it("should pass state", () => {
    const root = new Node("svg", {}, [new Node("g")]);
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    const res = traverse(root, {
      svg(node, state) {
        spy1(state);
      },
      g(node, state) {
        spy2(state);
      },
    });

    t.deepEqual(spy1.args[0][0], {});
    t.deepEqual(spy2.args[0][0], {});
  });
});
