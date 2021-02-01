import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ForOfStatement } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  forOfStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
};

visit(`for (const item of items) {}`, visitor);

describe("ForOfStatement", () => {
  test("ForOfStatement", () => {
    expect(visitor.forOfStatement.enter).toBeCalledTimes(1);
    expect(visitor.forOfStatement.exit).toBeCalledTimes(1);
    const call = visitor.forOfStatement.enter.mock.calls[0];
    const node: ForOfStatement = call[0];
    const context: VisitorContext<ForOfStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ForOfStatement);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(4);
    expect(visitor.statement.exit).toBeCalledTimes(4);
  });
});
