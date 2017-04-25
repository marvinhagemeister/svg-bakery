import { assert as t } from "chai";
import * as path from "path";
import { findFiles } from "../fs";

describe("findFiles", () => {
  it("should resolve to absolute file paths", async () => {
    const files = ["foo/a.svg", "b.svg"];
    const fakeFind = (globs: string) => Promise.resolve(files);

    const res = await findFiles("bla/**/*", fakeFind);
    const expected = files.map(file => path.resolve(file));
    t.deepEqual(res, expected);
  });
});
