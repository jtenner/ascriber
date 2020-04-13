import { Parser, Program, Source, Expression } from "assemblyscript";
import { IVisitorObject, Visitor } from "./Visitor";

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
  const parser = new Parser(({
    diagnostics: [],
    sources: [],
  } as unknown) as Program);
  parser.parseFile(source, "source.ts", true);
  return parser.currentSource;
}

/*
export function template(source: string, templateObject: ITemplateObject): Source {

}
*/
