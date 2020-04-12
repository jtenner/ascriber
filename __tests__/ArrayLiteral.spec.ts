import { compile } from "./setup/compile";
import { createVisitorPattern } from "./setup/createVisitorPattern";
import { ArrayLiteralExpression } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor = {
  arrayLiteralExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

compile(`[];`, visitor);

describe("ArrayLiteral", () => {
  test("arrayLiteralExpression", () => {
    expect(visitor.arrayLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.arrayLiteralExpression.exit).toBeCalledTimes(1);
    const call = visitor.arrayLiteralExpression.enter.mock.calls[0];
    const node: ArrayLiteralExpression = call[0];
    const context: VisitorContext<ArrayLiteralExpression> = call[1];
    expect(context.node).toBe(node);
  });
  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(1);
    expect(visitor.literalExpression.exit).toBeCalledTimes(1);
  });
  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });
  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });
});
