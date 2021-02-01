import { VisitorObject } from "../../src";

export interface JestMockVisitor {
  enter: jest.Mock<any, any>;
  exit: jest.Mock<any, any>;
}

export interface IVisitorMock {
  [name: string]: VisitorObject<any> & JestMockVisitor;
}

export function createVisitorPattern(): VisitorObject<any> & JestMockVisitor {
  return {
    enter: jest.fn(),
    exit: jest.fn(),
  };
}
