import { Parser, Source, Expression } from "assemblyscript";
import { IVisitorObject, Visitor } from "./Visitor";
import { ASTBuilder } from "./util/ast";

export interface ITemplateObject {
  [name: string]: Expression;
}

export function visit(source: string, query: Partial<IVisitorObject>): Source {
  const visitor = new Visitor();
  const result = parse(source);
  visitor.traverse(query, result);
  return result;
}

export function parse(source: string): Source {
  const diagnostics = {
    diagnostics: [],
    sources: [],
  } as any;
  const parser = new Parser(diagnostics);
  parser.parseFile(source, "source.ts", true);
  return parser.currentSource;
}

export function transform(
  source: string,
  query: Partial<IVisitorObject>,
): string {
  const output = visit(source, query);
  const builder = new ASTBuilder();
  builder.visitSource(output);
  return builder.finish();
}

/*
export function template(source: string, templateObject: ITemplateObject): Source {

}
*/
