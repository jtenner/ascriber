import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ContinueStatement } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  expression: createVisitorPattern(),
  statement: createVisitorPattern(),
  whileStatement: createVisitorPattern(),
  blockStatement: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  trueExpression: createVisitorPattern(),
  continueStatement: createVisitorPattern(),
};

visit(`while(true) { continue; }`, visitor);

describe("ContinueStatement", () => {
  test("ContinueStatement", () => {
    expect(visitor.continueStatement.enter).toBeCalledTimes(1);
    expect(visitor.continueStatement.exit).toBeCalledTimes(1);
    const call = visitor.continueStatement.enter.mock.calls[0];
    const node: ContinueStatement = call[0];
    const context: VisitorContext<ContinueStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ContinueStatement);
  });

  test("trueExpression", () => {
    expect(visitor.trueExpression.enter).toBeCalledTimes(1);
    expect(visitor.trueExpression.exit).toBeCalledTimes(1);
  });

  test("blockStatement", () => {
    expect(visitor.blockStatement.enter).toBeCalledTimes(1);
    expect(visitor.blockStatement.exit).toBeCalledTimes(1);
  });

  test("whileStatement", () => {
    expect(visitor.whileStatement.enter).toBeCalledTimes(1);
    expect(visitor.whileStatement.exit).toBeCalledTimes(1);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(3);
    expect(visitor.statement.exit).toBeCalledTimes(3);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });
});
