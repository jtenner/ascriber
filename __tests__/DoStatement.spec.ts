import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { DoStatement } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  expression: createVisitorPattern(),
  statement: createVisitorPattern(),
  doStatement: createVisitorPattern(),
  trueExpression: createVisitorPattern(),
  blockStatement: createVisitorPattern(),
};

visit(`do {} while(true)`, visitor);

describe("DoStatement", () => {
  test("DoStatement", () => {
    expect(visitor.doStatement.enter).toBeCalledTimes(1);
    expect(visitor.doStatement.exit).toBeCalledTimes(1);
    const call = visitor.doStatement.enter.mock.calls[0];
    const node: DoStatement = call[0];
    const context: VisitorContext<DoStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(DoStatement);
  });

  test("trueExpression", () => {
    expect(visitor.trueExpression.enter).toBeCalledTimes(1);
    expect(visitor.trueExpression.exit).toBeCalledTimes(1);
  });

  test("blockStatement", () => {
    expect(visitor.blockStatement.enter).toBeCalledTimes(1);
    expect(visitor.blockStatement.exit).toBeCalledTimes(1);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(2);
    expect(visitor.statement.exit).toBeCalledTimes(2);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });
});
