import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { AssertionExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  arrayLiteralExpression: createVisitorPattern(),
  assertionExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

visit(`[1, 2, 3] as StaticArray<i32>;`, visitor);

describe("AssertionExpression", () => {
  test("assertionExpression", () => {
    expect(visitor.assertionExpression.enter).toBeCalledTimes(1);
    expect(visitor.assertionExpression.exit).toBeCalledTimes(1);
    const call = visitor.assertionExpression.enter.mock.calls[0];
    const node: AssertionExpression = call[0];
    const context: VisitorContext<AssertionExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(AssertionExpression);
  });
  test("arrayLiteralExpression", () => {
    expect(visitor.arrayLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.arrayLiteralExpression.exit).toBeCalledTimes(1);
  });
  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(4);
    expect(visitor.literalExpression.exit).toBeCalledTimes(4);
  });
  test("expression", () => {
    // List of expressions:
    // [1, 2, 3] as StaticArray<i32>
    // StaticArray
    // i32
    // [1, 2, 3]
    // 1
    // 2
    // 3
    expect(visitor.expression.enter).toBeCalledTimes(7);
    expect(visitor.expression.exit).toBeCalledTimes(7);
  });
});
