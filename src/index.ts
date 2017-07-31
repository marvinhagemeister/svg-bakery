import { readFile, writeFile, find } from "nicer-fs";
import * as path from "path";
import Spriter, { SpriteBuilder, SpriteResult } from "./Spriter";

export interface PreparedFiles {
  file: string;
  buf: Buffer;
}

export async function build(
  dest: string,
  needle: string | string[] = [],
): Promise<void> {
  if (!Array.isArray(needle)) {
    needle = [needle];
  }

  if (needle.length === 0) {
    return Promise.reject(new Error("No input files found."));
  }

  const spriter = new Spriter(dest);

  const spriteFiles = await Promise.all(
    needle.map(globPath => attachFiles(globPath, spriter)),
  );

  const prepared: PreparedFiles[] = [].concat.apply([], spriteFiles);
  const sprite = await Promise.all(spriteFiles);
  prepared.forEach(res => spriter.add(res.file, res.buf));

  const res = await spriter.compile();
  const { path: target, contents } = res.symbol.sprite;
  return writeFile(path.dirname(target), contents, "utf-8");
}

export async function attachFiles(
  globber: string,
  spriter: SpriteBuilder,
): Promise<any> {
  const files = await find(globber);
  if (files.length === 0) {
    throw new Error("No input files found.");
  }

  return Promise.all(
    files.map(file => {
      return readFile(path.resolve(file)).then(buf => ({ buf, file }));
    }),
  );
}
