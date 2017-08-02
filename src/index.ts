import { readFile, writeFile, find } from "nicer-fs";
import * as path from "path";

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

  // TODO
}
