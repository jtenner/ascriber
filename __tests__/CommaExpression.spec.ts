import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { CommaExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  commaExpression: createVisitorPattern(),
  integerLiteralExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

visit(`1, 2, 3;`, visitor);

describe("CommaExpression", () => {
  test("commaExpression", () => {
    expect(visitor.commaExpression.enter).toBeCalledTimes(1);
    expect(visitor.commaExpression.exit).toBeCalledTimes(1);
    const call = visitor.commaExpression.enter.mock.calls[0];
    const node: CommaExpression = call[0];
    const context: VisitorContext<CommaExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(CommaExpression);
  });

  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(3);
    expect(visitor.literalExpression.exit).toBeCalledTimes(3);
  });

  test("expression", () => {
    expect(visitor.expression.enter).toBeCalledTimes(4);
    expect(visitor.expression.exit).toBeCalledTimes(4);
  });

  test("expressionStatement", () => {
    expect(visitor.expressionStatement.enter).toBeCalledTimes(1);
    expect(visitor.expressionStatement.exit).toBeCalledTimes(1);
  });
});
