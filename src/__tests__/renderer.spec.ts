import * as path from "path";
import { readFile } from "nicer-fs";
import { render } from "../renderer";

async function getFixtures(name: string) {
  const root = path.join(__dirname, "fixtures2");
  const input = await readFile(path.join(root, name, "input.svg"), "utf-8");
  const output = await readFile(path.join(root, name, "output.txt"), "utf-8");
  return { input, output };
}

describe("render", () => {
  it("should render simple", async () => {
    const { input, output } = await getFixtures("simple");
    const file = { content: input, id: "input" };
    const res = await render([file]);
    t.equal(res, output);
  });
});
