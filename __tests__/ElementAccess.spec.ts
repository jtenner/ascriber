import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ElementAccessExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  statement: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
  elementAccessExpression: createVisitorPattern(),
  integerLiteralExpression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
};

visit(`a[0];`, visitor);

describe("ElementAccessExpression", () => {
  test("ElementAccessExpression", () => {
    expect(visitor.elementAccessExpression.enter).toBeCalledTimes(1);
    expect(visitor.elementAccessExpression.exit).toBeCalledTimes(1);
    const call = visitor.elementAccessExpression.enter.mock.calls[0];
    const node: ElementAccessExpression = call[0];
    const context: VisitorContext<ElementAccessExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ElementAccessExpression);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(3);
    expect(visitor.expression.exit).toBeCalledTimes(3);
  });

  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });

  test("integerLiteralExpression", () => {
    expect(visitor.integerLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.integerLiteralExpression.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(1);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(1);
  });
});
