import { readFile, writeFile } from "nicer-fs";
import * as path from "path";
import { findFiles } from "./fs";
import Spriter, { SpriteBuilder, SpriteResult } from "./Spriter";

export async function build(dest: string, needle: string | string[] = []): Promise<void> {
  if (!Array.isArray(needle)) {
    needle = [needle];
  }

  if (needle.length === 0) {
    return Promise.resolve();
  }

  const spriter = new Spriter(dest);

  await Promise.all(needle
    .map(globPath => attachFiles(globPath, spriter)),
  );

  const res = await spriter.compile();
  const { path: target, contents } = res.symbol.sprite;
  return writeFile(path.dirname(target), contents, "utf-8");
}

export async function attachFiles(globber: string, spriter: SpriteBuilder): Promise<any> {
  const files = await findFiles(globber);
  const spriteFiles = files.map(file => {
    return readFile(path.resolve(file))
      .then(buf => ({ buf, file }));
  });

  const sprite = await Promise.all(spriteFiles);
  sprite.forEach(res => spriter.add(res.file, res.buf));
}
