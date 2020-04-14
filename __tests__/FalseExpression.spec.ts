import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { FalseExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  expressionStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
  falseExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
};

visit(`false;`, visitor);

describe("FalseExpression", () => {
  test("FalseExpression", () => {
    expect(visitor.falseExpression.enter).toBeCalledTimes(1);
    expect(visitor.falseExpression.exit).toBeCalledTimes(1);
    const call = visitor.falseExpression.enter.mock.calls[0];
    const node: FalseExpression = call[0];
    const context: VisitorContext<FalseExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(FalseExpression);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });
});
