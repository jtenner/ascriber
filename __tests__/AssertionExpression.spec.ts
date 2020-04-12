import { compile } from "./setup/compile";
import { createVisitorPattern } from "./setup/createVisitorPattern";

const visitor = {
  arrayLiteralExpression: createVisitorPattern(),
  assertionExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
  expression: createVisitorPattern(),
  expressionStatement: createVisitorPattern(),
};

compile(`[1, 2, 3] as StaticArray<i32>;`, visitor);

describe("AssertionExpression", () => {
  test("assertionExpression", () => {
    expect(visitor.assertionExpression.enter).toBeCalledTimes(1);
    expect(visitor.assertionExpression.exit).toBeCalledTimes(1);
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
