import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { DecoratorNode } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  expression: createVisitorPattern(),
  statement: createVisitorPattern(),
  decoratorNode: createVisitorPattern(),
  classDeclaration: createVisitorPattern(),
  declarationStatement: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

visit(`@example class A {}`, visitor);

describe("DecoratorNode", () => {
  test("DecoratorNode", () => {
    expect(visitor.decoratorNode.enter).toBeCalledTimes(1);
    expect(visitor.decoratorNode.exit).toBeCalledTimes(1);
    const call = visitor.decoratorNode.enter.mock.calls[0];
    const node: DecoratorNode = call[0];
    const context: VisitorContext<DecoratorNode> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(DecoratorNode);
  });

  test("classDeclaration", () => {
    expect(visitor.classDeclaration.enter).toBeCalledTimes(1);
    expect(visitor.classDeclaration.exit).toBeCalledTimes(1);
  });

  test("declarationStatement", () => {
    expect(visitor.declarationStatement.enter).toBeCalledTimes(1);
    expect(visitor.declarationStatement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(2);
    expect(visitor.expression.exit).toBeCalledTimes(2);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });
});
