import { compile } from "./setup/compile";
import { createVisitorPattern } from "./setup/createVisitorPattern";

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
