import { assert as t } from "chai";
import { plugin } from "../current-color";
import { traverse } from "../../transform/visitor";
import Node from "../../transform/Node";

describe("current-color", () => {
  it("should remove fill='none'", () => {
    const ast = new Node("g", {
      fill: "none", // FIXME:
    });

    const res = traverse(ast, plugin({ colorToReplace: "black" }).visitor);
    t.equal(ast.props.fill, undefined);
    // TODO: Children
  });
});
