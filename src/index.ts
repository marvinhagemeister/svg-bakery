import { readFile, writeFile, find } from "nicer-fs";
import * as path from "path";
import { File } from "./parser";
import { render } from "./renderer";

export async function build(needle: string[] = []): Promise<string> {
  if (needle.length === 0) {
    return Promise.reject(new Error("No input files found."));
  }

  const filePaths = (await Promise.all(
    needle.map(glob => find(glob)),
  )).reduce((matches, f) => {
    matches = [...matches, ...f];
    return matches;
  }, [] as string[]);

  const files: File[] = await Promise.all(
    filePaths.map(async file => {
      const content = await readFile(file, "utf8");
      return {
        content,
        id: path.basename(file),
      };
    }),
  );

  return await render(files);
}
