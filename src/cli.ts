import { parse, Config, help } from "./util/parser";
import colors from "ansi-colors";
const pkg = require("../package.json");

const config: Config = {
  help: {
    alias: "h",
    default: false,
    type: "b",
    description: "Show this help screen.",
  },
};

export function main(argv: string[]): void {
  const cliResult = parse(argv, config);
  const options = cliResult.options;
  const unknown = cliResult.unknown;

  process.stdout.write(`ascriber cli version ${pkg.version}\n`);

  if (unknown.length > 0) {
    for (const arg of unknown) {
      process.stdout.write(`Unknown cli option: ${colors.red(arg)}\n`);
    }
    process.exit(1);
  }

  if (options.help) {
    const helpText = help(config);
    process.stdout.write(`\n${helpText}\n`);
    process.exit(0);
  }

  process.exit(1);
}
