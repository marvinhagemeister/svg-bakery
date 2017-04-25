import { assert as t } from "chai";
import * as sinon from "sinon";
import { SpriteBuilder } from "../Spriter";
import { build } from "../index";
import * as fs from "fs";
import * as path from "path";
import { deleteFile, readFile } from "nicer-fs";

describe("build", () => {
  const dest = path.resolve(__dirname, "fixtures/sprite.svg");

  afterEach(async () => {
    try {
      await deleteFile(dest);
    } catch (err) {
      /* noop */
    }
  });

  it("should do nothing if no input files given", async () => {
    const res = await build(dest);
    t.equal(fs.existsSync(dest), false);
  });

  it("should generate an svg sprite", async () => {
    const source = path.join(__dirname, "fixtures/input/**/*.svg")
    const res = await build(dest, source);
    t.equal(fs.existsSync(dest), true);

    // Cannot compare files directly, because precision rounds differently
    // sometimes. Not sure what causes this.
    const content = await readFile(dest, "utf-8");
    t.equal(content.match(/symbol/).length, 1);
  });
});
