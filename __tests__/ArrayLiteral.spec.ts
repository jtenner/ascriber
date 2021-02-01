import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ArrayLiteralExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  arrayLiteralExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

visit(`[];`, visitor);

describe("ArrayLiteral", () => {
  test("arrayLiteralExpression", () => {
    expect(visitor.arrayLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.arrayLiteralExpression.exit).toBeCalledTimes(1);
    const call = visitor.arrayLiteralExpression.enter.mock.calls[0];
    const node: ArrayLiteralExpression = call[0];
    const context: VisitorContext<ArrayLiteralExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ArrayLiteralExpression);
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