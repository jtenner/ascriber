import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { FieldDeclaration } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  fieldDeclaration: createVisitorPattern(),
  classDeclaration: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
  integerLiteralExpression: createVisitorPattern(),
};

visit(`class A { b: i32 = 0; }`, visitor);

describe("FieldDeclaration", () => {
  test("FieldDeclaration", () => {
    expect(visitor.fieldDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.fieldDeclaration.exit).toBeCalledTimes(1);
    const call = visitor.fieldDeclaration.enter.mock.calls[0];
    const node: FieldDeclaration = call[0];
    const context: VisitorContext<FieldDeclaration> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(FieldDeclaration);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(2);
    expect(visitor.statement.exit).toBeCalledTimes(2);
  });

  test("declarationStatement", () => {
    expect(visitor.declarationStatement.enter).toBeCalledTimes(2);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(2);
  });

  test("classDeclaration", () => {
    expect(visitor.classDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.classDeclaration.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(4);
    expect(visitor.expression.exit).toBeCalledTimes(4);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(3);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(3);
  });

  test("integerLiteralExpression", () => {
    expect(visitor.integerLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.integerLiteralExpression.exit).toBeCalledTimes(1);
  });
});
