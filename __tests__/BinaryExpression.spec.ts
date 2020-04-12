import { compile } from "./setup/compile";
import { createVisitorPattern } from "./setup/createVisitorPattern";
import { BinaryExpression } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor = {
  binaryExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

compile(`1 + 2;`, visitor);

describe("BinayExpressions", () => {
  test("binaryExpression", () => {
    expect(visitor.binaryExpression.enter).toBeCalledTimes(1);
    expect(visitor.binaryExpression.exit).toBeCalledTimes(1);
    const call = visitor.binaryExpression.enter.mock.calls[0];
    const node: BinaryExpression = call[0];
    const context: VisitorContext<BinaryExpression> = call[1];
    expect(context.node).toBe(node);
  });

  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(2);
    expect(visitor.literalExpression.exit).toBeCalledTimes(2);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(3);
    expect(visitor.expression.exit).toBeCalledTimes(3);
  });

  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });
});
