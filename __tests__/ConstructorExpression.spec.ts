import {
  createVisitorPattern,
  IVisitorMock,
} from "./setup/createVisitorPattern";
import { ConstructorExpression } from "assemblyscript";
import { VisitorContext, visit } from "../src";

const visitor: IVisitorMock = {
  constructorExpression: createVisitorPattern(),
};

visit(`class A { constructor() {} }`, visitor);

describe("ConstructorExpression", () => {
  test("ConstructorExpression", () => {
    expect(visitor.constructorExpression.enter).toBeCalledTimes(1);
    expect(visitor.constructorExpression.exit).toBeCalledTimes(1);
    const call = visitor.constructorExpression.enter.mock.calls[0];
    const node: ConstructorExpression = call[0];
    const context: VisitorContext<ConstructorExpression> = call[1];
    expect(context.node).toBe(node);
    expect(node).toBeInstanceOf(ConstructorExpression);
  });
});
