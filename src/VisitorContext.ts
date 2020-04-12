import { Node } from "assemblyscript";

export class VisitorContext<T extends Node> {
  public constructor(
    public node: T,
    public parentContext: VisitorContext<Node> | null = null,
  ) {}
}
