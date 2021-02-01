import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ConstructorExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  constructorExpression: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  statement: createVisitorPattern(),
};

visit(`class A { constructor() {} }`, visitor);

describe("ConstructorExpression", () => {
  test("ConstructorExpression", () => {
    expect(visitor.constructorExpression.enter).toBeCalledTimes(1);
    expect(visitor.constructorExpression.exit).toBeCalledTimes(1);
    const call = visitor.constructorExpression.enter.mock.calls[0];
    const node: ConstructorExpression = call[0];
    const context: VisitorContext<ConstructorExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ConstructorExpression);
  });

  test("declarationStatement", () => {
    expect(visitor.declarationStatement.enter).toBeCalledTimes(2);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(2);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(2);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(2);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(3);
    expect(visitor.statement.exit).toBeCalledTimes(3);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(2);
    expect(visitor.expression.exit).toBeCalledTimes(2);
  });
});
