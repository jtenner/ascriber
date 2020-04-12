import { compile } from "./setup/compile";
import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ClassDeclaration } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor: IVisitorMock = {
  statement: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
  classDeclaration: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

compile(`class A {}`, visitor);

describe("ClassDeclaration", () => {
  test("classDeclaration", () => {
    expect(visitor.classDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.classDeclaration.exit).toBeCalledTimes(1);
    const call = visitor.classDeclaration.enter.mock.calls[0];
    const node: ClassDeclaration = call[0];
    const context: VisitorContext<ClassDeclaration> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ClassDeclaration);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });

  test("declaration", () => {
    expect(visitor.declarationStatement.enter).toBeCalledTimes(1);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(1);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(1);
  });
});
