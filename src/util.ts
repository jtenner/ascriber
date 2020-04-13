import { Parser, Program } from "assemblyscript";
import { IVisitorObject, Visitor } from "./Visitor";

export function visit(source: string, query: Partial<IVisitorObject>): void {
  const parser = new Parser(({
    diagnostics: [],
    sources: [],
  } as unknown) as Program);
  parser.parseFile(source, "source.ts", true);
  const visitor = new Visitor();
  visitor.traverse(query, parser.currentSource);
}
