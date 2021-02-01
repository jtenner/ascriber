import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { EnumDeclaration } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  enumDeclaration: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

visit(`enum A {}`, visitor);

describe("EnumDeclaration", () => {
  test("EnumDeclaration", () => {
    expect(visitor.enumDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.enumDeclaration.exit).toBeCalledTimes(1);
    const call = visitor.enumDeclaration.enter.mock.calls[0];
    const node: EnumDeclaration = call[0];
    const context: VisitorContext<EnumDeclaration> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(EnumDeclaration);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(1);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(1);
  });
});
