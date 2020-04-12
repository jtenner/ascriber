import { compile } from "./setup/compile";
import { createVisitorPattern } from "./setup/createVisitorPattern";

const visitor = {
  arrayLiteralExpression: createVisitorPattern(),
  literalExpression: createVisitorPattern(),
};

compile(`export let a = [1, 2, 3, 4];`, visitor);

describe("ArrayLiteral", () => {
  test("arrayLiteralExpression", () => {
    expect(visitor.arrayLiteralExpression.enter).toBeCalledTimes(1);
    expect(visitor.arrayLiteralExpression.exit).toBeCalledTimes(1);
    expect(
      visitor.arrayLiteralExpression.enter.mock.calls[0],
    ).toMatchInlineSnapshot();
    expect(
      visitor.arrayLiteralExpression.exit.mock.calls[0],
    ).toMatchInlineSnapshot();
  });
  test("literalExpression", () => {
    expect(visitor.literalExpression.enter).toBeCalledTimes(1);
    expect(visitor.literalExpression.exit).toBeCalledTimes(1);
    expect(
      visitor.literalExpression.enter.mock.calls[0],
    ).toMatchInlineSnapshot();
    expect(
      visitor.literalExpression.exit.mock.calls[0],
    ).toMatchInlineSnapshot();
  });
});
