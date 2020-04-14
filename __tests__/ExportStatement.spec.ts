import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ExportStatement, ExportMember } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  exportStatement: createVisitorPattern(),
  exportMember: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

visit(`export { a as b }`, visitor);

describe("ExportStatement", () => {
  test("ExportStatement", () => {
    expect(visitor.exportStatement.enter).toBeCalledTimes(1);
    expect(visitor.exportStatement.exit).toBeCalledTimes(1);
    const call = visitor.exportStatement.enter.mock.calls[0];
    const node: ExportStatement = call[0];
    const context: VisitorContext<ExportStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ExportStatement);
  });

  test("ExportMember", () => {
    expect(visitor.exportMember.enter).toBeCalledTimes(1);
    expect(visitor.exportMember.exit).toBeCalledTimes(1);
    const call = visitor.exportMember.enter.mock.calls[0];
    const node: ExportMember = call[0];
    const context: VisitorContext<ExportMember> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ExportMember);
  });

  test("statement", () => {
    expect(visitor.statement.enter).toBeCalledTimes(1);
    expect(visitor.statement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(2);
    expect(visitor.expression.exit).toBeCalledTimes(2);
  });

  test("identifierExpression", () => {
    expect(visitor.identifierExpression.enter).toBeCalledTimes(2);
    expect(visitor.identifierExpression.exit).toBeCalledTimes(2);
  });
});

const visitor2: IVisitorMock = {
  exportStatement: createVisitorPattern(),
  exportMember: createVisitorPattern(),
  statement: createVisitorPattern(),
  expression: createVisitorPattern(),
  identifierExpression: createVisitorPattern(),
};

visit(`export { a }`, visitor2);

describe("ExportStatement single member", () => {
  test("ExportStatement", () => {
    expect(visitor2.exportStatement.enter).toBeCalledTimes(1);
    expect(visitor2.exportStatement.exit).toBeCalledTimes(1);
    const call = visitor2.exportStatement.enter.mock.calls[0];
    const node: ExportStatement = call[0];
    const context: VisitorContext<ExportStatement> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ExportStatement);
  });

  test("ExportMember", () => {
    expect(visitor2.exportMember.enter).toBeCalledTimes(1);
    expect(visitor2.exportMember.exit).toBeCalledTimes(1);
    const call = visitor2.exportMember.enter.mock.calls[0];
    const node: ExportMember = call[0];
    const context: VisitorContext<ExportMember> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ExportMember);
  });

  test("statement", () => {
    expect(visitor2.statement.enter).toBeCalledTimes(1);
    expect(visitor2.statement.exit).toBeCalledTimes(1);
  });

  test("expression", () => {
    expect(visitor2.expression.enter).toBeCalledTimes(1);
    expect(visitor2.expression.exit).toBeCalledTimes(1);
  });

  test("identifierExpression", () => {
    expect(visitor2.identifierExpression.enter).toBeCalledTimes(1);
    expect(visitor2.identifierExpression.exit).toBeCalledTimes(1);
  });
});
