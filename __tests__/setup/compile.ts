import { compileString } from "assemblyscript/cli/asc";
import { IVisitorObject } from "../../src";
import SetupTransform from "./trasform";

export function compile(
  source: string,
  visitor: Partial<IVisitorObject>,
): void {
  SetupTransform.MockTransformObject = visitor;
  compileString(source, {
    transform: [require.resolve("./transform.ts")],
  });
}
