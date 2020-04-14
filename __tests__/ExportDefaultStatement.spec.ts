import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
// import { ExportDefaultStatement } from "assemblyscript";
import { visit } from "../src";

const visitor: IVisitorMock = {
  exportDefaultStatement: createVisitorPattern(),
  statement: createVisitorPattern(),
};

visit(`export default a;`, visitor);

describe("ExportDefaultStatement", () => {
  test("ExportDefaultStatement", () => {
    // TODO: When export default statements are fixed, support this
    // expect(visitor.exportDefaultStatement.enter).toBeCalledTimes(1);
    // expect(visitor.exportDefaultStatement.exit).toBeCalledTimes(1);
    // const call = visitor.exportDefaultStatement.enter.mock.calls[0];
    // const node: ExportDefaultStatement = call[0];
    // const context: VisitorContext<ExportDefaultStatement> = call[1];
    // expect(context.node).toBe(node);
    // expect(node).toBeInstanceOf(ExportDefaultStatement);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });
});
