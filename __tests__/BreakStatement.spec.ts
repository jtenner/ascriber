import { compile } from "./setup/compile";
import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { BreakStatement } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor: IVisitorMock = {
  statement: createVisitorPattern(),
  whileStatement: createVisitorPattern(),
  breakStatement: createVisitorPattern(),
  expression: createVisitorPattern(),
  trueExpression: createVisitorPattern(),
};

compile(`while (true) break;`, visitor);

describe("BreakStatement", () => {
  test("breakStatement", () => {
    expect(visitor.breakStatement.enter).toBeCalledTimes(1);
    expect(visitor.breakStatement.exit).toBeCalledTimes(1);
    const call = visitor.breakStatement.enter.mock.calls[0];
    const node: BreakStatement = call[0];
    const context: VisitorContext<BreakStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(BreakStatement);
  });

  test("whileStatement", () => {
    expect(visitor.whileStatement.enter).toBeCalledTimes(1);
    expect(visitor.whileStatement.exit).toBeCalledTimes(1);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(2);
    expect(visitor.statement.exit).toBeCalledTimes(2);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(1);
    expect(visitor.expression.exit).toBeCalledTimes(1);
  });

  test("trueExpression", () => {
    expect(visitor.trueExpression.enter).toBeCalledTimes(1);
    expect(visitor.trueExpression.exit).toBeCalledTimes(1);
  });
});
