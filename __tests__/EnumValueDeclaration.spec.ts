import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { EnumValueDeclaration } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  enumDeclaration: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  enumValueDeclaration: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
  integerLiteralExpression: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
};

visit(`enum A { b = 1 }`, visitor);

describe("EnumValueDeclaration", () => {
  test("EnumValueDeclaration", () => {
    expect(visitor.enumValueDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.enumValueDeclaration.exit).toBeCalledTimes(1);
    const call = visitor.enumValueDeclaration.enter.mock.calls[0];
    const node: EnumValueDeclaration = call[0];
    const context: VisitorContext<EnumValueDeclaration> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(EnumValueDeclaration);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(2);
    expect(visitor.statement.exit).toBeCalledTimes(2);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(3);
    expect(visitor.expression.exit).toBeCalledTimes(3);
  });

  test("enumValueDeclaration", () => {
    expect(visitor.enumValueDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.enumValueDeclaration.exit).toBeCalledTimes(1);
  });

  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(1);
    expect(visitor.literalExpression.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(2);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(2);
  });

  test("integerLiteralExpression", () => {
    expect(visitor.integerLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.integerLiteralExpression.exit).toBeCalledTimes(1);
  });

  test("declarationStatement", () => {
    expect(visitor.declarationStatement.enter).toBeCalledTimes(2);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(2);
  });
});
