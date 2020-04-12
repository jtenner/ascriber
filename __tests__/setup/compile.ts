import { IVisitorObject, Visitor } from "../../src";
import { Parser, Program } from "assemblyscript";

export function compile(
  source: string,
  visitor: Partial<IVisitorObject>,
): void {
  const program = ({
    sources: [],
    diagnostics: [],
  } as unknown) as Program;
  const parser = new Parser(program);
  parser.parseFile(source, "source.ts", true);
  const visitorInstance = new Visitor();
  visitorInstance.traverse(visitor, parser.currentSource);
}
