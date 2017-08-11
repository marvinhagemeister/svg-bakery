import { assert as t } from "chai";
import Node from "../Node";

describe("Node", () => {
  it("should instantiate", () => {
    const n = new Node("foo", {});
    const n2 = new Node("foo", {}, ["foo"]);
  });
});
