import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { FloatLiteralExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  expressionStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  floatLiteralExpression: createVisitorPattern(),
};

visit(`3.14;`, visitor);

describe("FloatLiteralExpression", () => {
  test("FloatLiteralExpression", () => {
    expect(visitor.floatLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.floatLiteralExpression.exit).toBeCalledTimes(1);
    const call = visitor.floatLiteralExpression.enter.mock.calls[0];
    const node: FloatLiteralExpression = call[0];
    const context: VisitorContext<FloatLiteralExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(FloatLiteralExpression);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });

  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(1);
    expect(visitor.literalExpression.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });
});
