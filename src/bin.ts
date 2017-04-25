import * as program from "commander";
import * as path from "path";
import * as chalk from "chalk";
import { build } from "./index";

export interface CLIOptions {
  out?: string;
  args: string[];
}

program
  .version("0.0.1")
  .usage("[options] <file ...>")
  .option("-o, --out <dest>", "Destination defaults to sprite.svg", "sprite.svg")
  .parse(process.argv);

const options = program as CLIOptions;
options.out = path.resolve(__dirname, options.out);

if (options.args.length === 0) {
  console.error();
  console.error(chalk.red("No glob paths specified. Please specify at least one path"));
  console.error();
  process.exit(1);
}

build(options.out, options.args)
  .then(() => console.warn(chalk.green("done!")))
  .catch(err => {
    console.error();
    console.error(chalk.red(err.message));
    console.error(err);
    console.error();
    process.exit(1);
  });
