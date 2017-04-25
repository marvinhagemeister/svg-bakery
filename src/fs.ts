import * as path from "path";
import * as fs from "nicer-fs";

export async function findFiles(
  globber: string,
  find: (globs: string) => Promise<string[]> = fs.find,
): Promise<string[]> {
  return find(globber)
    .then(files => files.map(file => path.resolve(file)));
}
