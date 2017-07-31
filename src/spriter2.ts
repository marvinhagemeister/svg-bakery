export interface Options {
  mode: "symbol";
  addNamespace?: boolean;
}

const defaultOpts: Options = {
  mode: "symbol",
  addNamespace: true,
};

export function render(files: string[], opts: Options) {
  let out: string = '<?xml version="1.0" encoding="utf-8"?><svg';

  if (opts.addNamespace) {
    out +=
      ' xmlns="http://www.w3.org/2000/svg" ' +
      'xmlns: xlink = "http://www.w3.org/1999/xlink"';
  }

  if (opts.mode === "symbol") {
  }

  return out;
}
