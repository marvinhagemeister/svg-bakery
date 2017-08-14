import { assert as t } from "chai";
import { ast2VNode, SVGAst } from "../parser";

describe("ast2VNode", () => {
  it("should ", () => {
    const ast: SVGAst = {
      svg: {
        $: {
          width: "100",
          height: "100",
        },
        g: [
          {
            title: ["Layer 1"],
            ellipse: [
              {
                $: {
                  ry: "21",
                  rx: "19",
                  id: "svg_1",
                  cy: "30",
                  cx: "29",
                  "stroke-width": "5",
                  stroke: "#000000",
                  fill: "#FF0000",
                },
              },
            ],
          },
        ],
      },
    };

    t.deepEqual(
      ast2VNode(ast),
      {
        tag: "svg",
        props: {
          width: "100",
          height: "100",
        },
        children: [
          {
            tag: "g",
            props: {},
            children: [
              {
                tag: "title",
                props: {},
                children: ["Layer 1"],
              },
              {
                tag: "ellipse",
                props: {
                  ry: "21",
                  rx: "19",
                  id: "svg_1",
                  cy: "30",
                  cx: "29",
                  "stroke-width": "5",
                  stroke: "#000000",
                  fill: "#FF0000",
                },
                children: [],
              },
            ],
          },
        ],
      } as any,
    );
  });
});
