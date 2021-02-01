import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { EmptyStatement } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  emptyStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
};

visit(`;`, visitor);

describe("EmptyStatement", () => {
  test("EmptyStatement", () => {
    expect(visitor.emptyStatement.enter).toBeCalledTimes(1);
    expect(visitor.emptyStatement.exit).toBeCalledTimes(1);
    const call = visitor.emptyStatement.enter.mock.calls[0];
    const node: EmptyStatement = call[0];
    const context: VisitorContext<EmptyStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(EmptyStatement);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });
});
