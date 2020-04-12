import { compileString } from "assemblyscript/cli/asc";
import { IVisitorObject } from "../../src";
import SetupTransform from "./transform";

export function compile(
  source: string,
  visitor: Partial<IVisitorObject>,
): void {
  SetupTransform.MockTransformObject = visitor;
  compileString(
    {
      "test.ts": source,
    },
    {
      transform: [require.resolve("./transform.ts")],
    },
  );
}
