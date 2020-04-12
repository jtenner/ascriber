import { compile } from "./setup/compile";
import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { BlockStatement } from "assemblyscript";
import { VisitorContext } from "../src";

const visitor: IVisitorMock = {
  statement: createVisitorPattern(),
  blockStatement: createVisitorPattern(),
};

compile(`{}`, visitor);

describe("BlockStatement", () => {
  test("blockStatement", () => {
    expect(visitor.blockStatement.enter).toBeCalledTimes(1);
    expect(visitor.blockStatement.exit).toBeCalledTimes(1);
    const call = visitor.blockStatement.enter.mock.calls[0];
    const node: BlockStatement = call[0];
    const context: VisitorContext<BlockStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(BlockStatement);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });
});
