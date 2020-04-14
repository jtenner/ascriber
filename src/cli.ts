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

export enum ExitCode {
  Success = 0,
  Fail = 0,
}

export interface IWritable {
  write(value: string): void;
}

export interface IExitable {
  exit(code: ExitCode): void;
}

export interface ICLIConfiguration {
  stdout: IWritable;
  stderr: IWritable;
  process: IExitable;
}

export function main(argv: string[], cliConfig: ICLIConfiguration): void {
  const cliResult = parse(argv, config);
  const options = cliResult.options;
  const unknown = cliResult.unknown;
  // const entryPoints = cliResult.args;
  // const rest = cliResult.trailing;

  const { stderr, stdout, process } = cliConfig;

  stdout.write(`ascriber cli version ${pkg.version}\n`);

  if (unknown.length > 0) {
    for (const arg of unknown) {
      stderr.write(`Unknown cli option: ${colors.red(arg)}\n`);
    }
    return process.exit(1);
  }

  if (options.help) {
    const helpText = help(config);
    stdout.write(`\n${helpText}\n`);
    return process.exit(0);
  }

  return process.exit(1);
}
