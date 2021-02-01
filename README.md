# ascriber

Babel-like transforms for your AssemblyScript modules.

## Example

```ts
import { Transform } from "../../cli/transform"; // "assemblyscript/cli/transform"
import { Parser, Module, SourceKind } from "../.."; // "assemblyscript"
import { Visitor, VisitorContext } from "ascriber";

class MyTransform extends Transform {
  afterParse(parser: Parser): void {
    const visitor = new Visitor();
    for (const source of parser.program.sources) {
      visitor.visit(
        {
          stringLiteralExpression(
            expr: StringLiteralExpression,
            context: VisitorContext<StringLiteralExpression>,
          ): void {
            // reverse the string!
            expr.value = expr.value.split("").reverse().join("");

            // visit the parent
            const parent = context.parentContext.node;

            // eventually will be supported:
            context.replaceNode(someNode);

            // eventually will be supported
            context.removeNode();
          },
        },
        source,
      );
    }
  }
}

export = MyTransform;
```
