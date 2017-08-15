import { assert as t } from "chai";
import { plugin } from "../sprite-symbol";
import { traverse } from "../../transform/visitor";
import Node from "../../transform/Node";

describe("Symbol Sprite", () => {
  it("should replace <svg> with <symbol>", () => {
    const ast = new Node("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      preserveAspectRatio: true,
    });
    const node = traverse(ast, plugin().visitor);

    t.equal(node.tag, "svg");
    t.deepEqual(node.props, {});
  });
});
