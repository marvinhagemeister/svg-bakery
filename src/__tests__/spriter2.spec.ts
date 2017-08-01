import { assert as t } from "chai";
import * as path from "path";
import { readFile } from "nicer-fs";
import { render, ast2VNode, SVGAst } from "../spriter2";

async function getFixtures(name: string) {
  const root = path.join(__dirname, "fixtures2");
  const input = await readFile(path.join(root, name, "input.svg"), "utf-8");
  const output = await readFile(path.join(root, name, "output.svg"), "utf-8");
  return { input, output };
}

describe("render", () => {
  it("should render simple", async () => {
    const { input, output } = await getFixtures("simple");
    const res = await render([input]);
    t.equal(res, output);
  });
});

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

    t.deepEqual(ast2VNode(ast), {
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
    });
  });
});
