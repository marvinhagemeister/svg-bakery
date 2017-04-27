#!/usr/bin/env node
import * as program from "commander";
import * as path from "path";
import * as chalk from "chalk";
import { build } from "./index";
/* tslint:disable-next-line */
const version = require("../package.json").version;

/* tslint:disable no-console */

export interface CLIOptions {
  out?: string;
  args: string[];
}

program
  .version(version)
  .usage("[options] <file ...>")
  .option("-o, --out <dest>", "destination svg, defaults to 'sprite.svg'", "sprite.svg")
  .parse(process.argv);

const options = program as CLIOptions;
options.out = path.resolve(process.cwd(), options.out);

if (options.args.length === 0) {
  console.error(chalk.red("No glob paths specified. Please specify at least one path"));
  process.exit(1);
}

build(options.out, options.args)
  .catch(err => {
    console.error(chalk.red(err.message));
    process.exit(1);
  });
