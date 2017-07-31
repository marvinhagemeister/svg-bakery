import * as SVGSpriter from "svg-sprite";
import { readFile } from "nicer-fs";
import * as path from "path";
import * as File from "vinyl";

export interface SpriteBuilder {
  add(file: string | File, contents?: Buffer): void;
  compile(): Promise<SpriteResult>;
}

export interface SpriteResult {
  symbol?: {
    sprite: {
      path: string;
      contents: Buffer;
    };
  };
}

export default class Spriter implements SpriteBuilder {
  private spriter: SVGSpriter.SVGSpriter;

  constructor(destFolder: string, spriter?: any) {
    if (spriter === undefined) {
      this.spriter = new SVGSpriter({
        dest: destFolder,
        mode: {
          symbol: {
            dest: "",
            sprite: path.basename(destFolder),
          },
        },
        shape: {
          dimension: {
            precision: 2,
          },
          id: {
            generator: (name: string) => path.basename(name.replace(/\.svg$/g, "")),
          },
          transform: ["svgo"],
        },
        svg: {
          dimensionAttributes: true,
          rootAttributes: {
            height: 1000,
            width: 1000,
          },
        },
      });
    }
  }

  add(file: File): void;
  add(path: string, contents: Buffer): void;
  add(file: string | File, contents?: Buffer): void {
    if (typeof file === "string") {
      const filePath = path.resolve(file);
      const base = path.dirname(filePath);
      this.spriter.add(new File({
        base,
        contents,
        path: filePath,
      }));
    } else {
      this.spriter.add(file);
    }
  }

  compile(): Promise<SpriteResult> {
    return new Promise<SpriteResult>((resolve, reject) => {
      this.spriter.compile((err, res) => {
        return err !== null ? reject(err) : resolve(res);
      });
    });
  }
}
