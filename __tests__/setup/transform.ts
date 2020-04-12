import { Transform } from "assemblyscript/cli/transform";
import { Visitor, IVisitorObject } from "../../src";
import { Parser } from "assemblyscript";

class SetupTransform extends Transform {
  public static MockTransformObject: Partial<IVisitorObject> = {};
  afterParse(parser: Parser): void {
    const visitor = new Visitor();
    for (const source of parser.program.sources) {
      if (source.normalizedPath.endsWith("test.ts")) {
        visitor.traverse(SetupTransform.MockTransformObject, source);
      }
    }
  }
}

export = SetupTransform;
