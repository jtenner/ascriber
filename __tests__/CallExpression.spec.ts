import { compile } from "./setup/compile";
import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { CallExpression } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor: IVisitorMock = {
  callExpression: createVisitorPattern(),
  stringLiteralExpression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
};

compile(`trace("Hello world");`, visitor);

describe("CallExpression", () => {
  test("callExpression", () => {
    expect(visitor.callExpression.enter).toBeCalledTimes(1);
    expect(visitor.callExpression.exit).toBeCalledTimes(1);
    const call = visitor.callExpression.enter.mock.calls[0];
    const node: CallExpression = call[0];
    const context: VisitorContext<CallExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(CallExpression);
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

  test("stringLiteralExpression", () => {
    expect(visitor.stringLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.stringLiteralExpression.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(1);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(1);
  });
});
