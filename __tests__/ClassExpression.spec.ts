import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ClassExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  statement: createVisitorPattern(),
  variableDeclaration: createVisitorPattern(),
  variableStatement: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
  classExpression: createVisitorPattern(),
  classDeclaration: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

visit(`let A = class A {}`, visitor);

describe("ClassExpression", () => {
  test("classExpression", () => {
    expect(visitor.classExpression.enter).toBeCalledTimes(1);
    expect(visitor.classExpression.exit).toBeCalledTimes(1);
    const call = visitor.classExpression.enter.mock.calls[0];
    const node: ClassExpression = call[0];
    const context: VisitorContext<ClassExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ClassExpression);
  });

  test("declarationStatement", () => {
    // let A = class A {}
    // class A {}
    expect(visitor.declarationStatement.enter).toBeCalledTimes(2);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(2);
  });

  test("classDeclaration", () => {
    expect(visitor.classDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.classDeclaration.exit).toBeCalledTimes(1);
  });

  test("statement", () => {
    // let A = class A {}
    // A = class A {}
    // class A {}
    expect(visitor.statement.enter).toBeCalledTimes(3);
    expect(visitor.statement.exit).toBeCalledTimes(3);
  });

  test("expression", () => {
    // A
    // class A {}
    // A
    expect(visitor.expression.enter).toBeCalledTimes(3);
    expect(visitor.expression.exit).toBeCalledTimes(3);
  });

  test("identifierExpression", () => {
    // A
    // A
    expect(visitor.identifierExpression.enter).toBeCalledTimes(2);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(2);
  });

  test("variableDeclaration", () => {
    expect(visitor.variableDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.variableDeclaration.exit).toBeCalledTimes(1);
  });

  test("variableStatement", () => {
    expect(visitor.variableStatement.enter).toBeCalledTimes(1);
    expect(visitor.variableStatement.exit).toBeCalledTimes(1);
  });
});
