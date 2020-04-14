import { cli } from "../src";

const argList: string[][] = [
  ["long help", "--help"],
  ["short help", "-h"],
  ["invalid", "--invalid"],
];

interface IMockExitable extends cli.IExitable {
  code: number;
}

interface IMockWritable extends cli.IWritable {
  output: string;
}

function createMockExitable(): IMockExitable {
  const result = {
    code: 0,
    exit(code: number): void {
      result.code = code;
    },
  };
  return result;
}

function createMockWritable(): IMockWritable {
  const result = {
    output: "",
    write(contents: string): void {
      result.output += contents;
    },
  };
  return result;
}

function createMockCLIConfig() {
  return {
    process: createMockExitable(),
    stdout: createMockWritable(),
    stderr: createMockWritable(),
  };
}

test("cliOutput", () => {
  for (const [name, ...rest] of argList) {
    const config = createMockCLIConfig();
    cli.main(rest, config);
    expect(config.process.code).toMatchSnapshot(`${name} code`);
    expect(config.stdout.output).toMatchSnapshot(`${name} stdout`);
    expect(config.stderr.output).toMatchSnapshot(`${name} stderr`);
  }
});
