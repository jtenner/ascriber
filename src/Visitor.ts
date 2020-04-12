import {
  ArrayLiteralExpression,
  AssertionExpression,
  BinaryExpression,
  BlockStatement,
  BreakStatement,
  CallExpression,
  ClassDeclaration,
  ClassExpression,
  CommaExpression,
  ConstructorExpression,
  ContinueStatement,
  DecoratorNode,
  DoStatement,
  ElementAccessExpression,
  EmptyStatement,
  EnumDeclaration,
  EnumValueDeclaration,
  ExportDefaultStatement,
  ExportImportStatement,
  ExportMember,
  ExportStatement,
  Expression,
  ExpressionStatement,
  FalseExpression,
  FieldDeclaration,
  FloatLiteralExpression,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  FunctionTypeNode,
  IdentifierExpression,
  IfStatement,
  ImportDeclaration,
  ImportStatement,
  IndexSignatureDeclaration,
  InstanceOfExpression,
  IntegerLiteralExpression,
  InterfaceDeclaration,
  LiteralExpression,
  LiteralKind,
  MethodDeclaration,
  NamedTypeNode,
  NamespaceDeclaration,
  NewExpression,
  Node,
  NodeKind,
  NullExpression,
  ObjectLiteralExpression,
  ParameterNode,
  ParenthesizedExpression,
  PropertyAccessExpression,
  RegexpLiteralExpression,
  ReturnStatement,
  Source,
  Statement,
  StringLiteralExpression,
  SuperExpression,
  SwitchCase,
  SwitchStatement,
  TernaryExpression,
  ThisExpression,
  ThrowStatement,
  TrueExpression,
  TryStatement,
  TypeDeclaration,
  TypeName,
  TypeNode,
  TypeParameterNode,
  VariableDeclaration,
  VariableStatement,
  WhileStatement,
  UnaryExpression,
  UnaryPrefixExpression,
  UnaryPostfixExpression,
} from "assemblyscript";
import { VisitorContext } from "./VisitorContext";

export type VisitorCallback<T extends Node> = (
  node: T,
  ctx: VisitorContext<T>,
) => void;

export type VisitorObject<T extends Node> = Partial<{
  enter(node: T, ctx: VisitorContext<T>): void;
  exit(node: T, ctx: VisitorContext<T>): void;
}>;

export type VisitorPattern<T extends Node> =
  | VisitorCallback<T>
  | VisitorObject<T>;

export interface IVisitorObject {
  arrayLiteralExpression: VisitorPattern<ArrayLiteralExpression>;
  assertionExpression: VisitorPattern<AssertionExpression>;
  binaryExpression: VisitorPattern<BinaryExpression>;
  blockStatement: VisitorPattern<BlockStatement>;
  breakStatement: VisitorPattern<BreakStatement>;
  callExpression: VisitorPattern<CallExpression>;
  classDeclaration: VisitorPattern<ClassDeclaration>;
  classExpression: VisitorPattern<ClassExpression>;
  commaExpression: VisitorPattern<CommaExpression>;
  constructorExpression: VisitorPattern<ConstructorExpression>;
  continueStatement: VisitorPattern<ContinueStatement>;
  decoratorNode: VisitorPattern<DecoratorNode>;
  doStatement: VisitorPattern<DoStatement>;
  elementAccessExpression: VisitorPattern<ElementAccessExpression>;
  emptyStatement: VisitorPattern<EmptyStatement>;
  enumDeclaration: VisitorPattern<EnumDeclaration>;
  enumValueDeclaration: VisitorPattern<EnumValueDeclaration>;
  exportDefaultStatement: VisitorPattern<ExportDefaultStatement>;
  exportImportStatement: VisitorPattern<ExportImportStatement>;
  exportMember: VisitorPattern<ExportMember>;
  exportStatement: VisitorPattern<ExportStatement>;
  expression: VisitorPattern<Expression>;
  expressionStatement: VisitorPattern<ExpressionStatement>;
  falseExpression: VisitorPattern<FalseExpression>;
  fieldDeclaration: VisitorPattern<FieldDeclaration>;
  floatLiteralExpression: VisitorPattern<FloatLiteralExpression>;
  forOfStatement: VisitorPattern<ForOfStatement>;
  forStatement: VisitorPattern<ForStatement>;
  functionDeclaration: VisitorPattern<FunctionDeclaration>;
  functionExpression: VisitorPattern<FunctionExpression>;
  functionTypeNode: VisitorPattern<FunctionTypeNode>;
  identifierExpression: VisitorPattern<IdentifierExpression>;
  ifStatement: VisitorPattern<IfStatement>;
  importDeclaration: VisitorPattern<ImportDeclaration>;
  importStatement: VisitorPattern<ImportStatement>;
  indexSignatureDeclaration: VisitorPattern<IndexSignatureDeclaration>;
  instanceOfExpression: VisitorPattern<InstanceOfExpression>;
  integerLiteralExpression: VisitorPattern<IntegerLiteralExpression>;
  interfaceDeclaration: VisitorPattern<InterfaceDeclaration>;
  literalExpression: VisitorPattern<LiteralExpression>;
  methodDeclaration: VisitorPattern<MethodDeclaration>;
  namedTypeNode: VisitorPattern<NamedTypeNode>;
  namespaceDeclaration: VisitorPattern<NamespaceDeclaration>;
  newExpression: VisitorPattern<NewExpression>;
  nullExpression: VisitorPattern<NullExpression>;
  objectLiteralExpression: VisitorPattern<ObjectLiteralExpression>;
  parameterNode: VisitorPattern<ParameterNode>;
  parenthesizedExpression: VisitorPattern<ParenthesizedExpression>;
  propertyAccessExpression: VisitorPattern<PropertyAccessExpression>;
  regexpLiteralExpression: VisitorPattern<RegexpLiteralExpression>;
  returnStatement: VisitorPattern<ReturnStatement>;
  statement: VisitorPattern<Statement>;
  stringLiteralExpression: VisitorPattern<StringLiteralExpression>;
  superExpression: VisitorPattern<SuperExpression>;
  switchCase: VisitorPattern<SwitchCase>;
  switchStatement: VisitorPattern<SwitchStatement>;
  ternaryExpression: VisitorPattern<TernaryExpression>;
  thisExpression: VisitorPattern<ThisExpression>;
  throwStatement: VisitorPattern<ThrowStatement>;
  trueExpression: VisitorPattern<TrueExpression>;
  tryStatement: VisitorPattern<TryStatement>;
  typeDeclaration: VisitorPattern<TypeDeclaration>;
  typeName: VisitorPattern<TypeName>;
  typeNode: VisitorPattern<TypeNode>;
  typeParameterNode: VisitorPattern<TypeParameterNode>;
  variableDeclaration: VisitorPattern<VariableDeclaration>;
  variableStatement: VisitorPattern<VariableStatement>;
  whileStatement: VisitorPattern<WhileStatement>;
  unaryExpression: VisitorPattern<UnaryExpression>;
  unaryPrefixExpression: VisitorPattern<UnaryPrefixExpression>;
  unaryPostfixExpression: VisitorPattern<UnaryPostfixExpression>;
}

export class Visitor {
  public constructor() {}

  public traverse<T extends Node>(
    visitor: Partial<IVisitorObject>,
    node: Node,
    parentContext: VisitorContext<T> | null = null,
  ): void {
    const context = new VisitorContext(node, parentContext);

    if (node.kind === NodeKind.SOURCE) {
      for (const statement of (node as Source).statements) {
        this.traverse(visitor, statement, context);
      }
      return;
    }

    if (node instanceof TypeNode) {
      this.enter(visitor.typeNode, node as TypeNode, context);
      switch (node.kind) {
        case NodeKind.NAMEDTYPE: {
          const namedTypeNode = node as NamedTypeNode;
          this.enter(visitor.namedTypeNode, namedTypeNode, context);
          this.traverse(visitor, namedTypeNode.name, context);
          if (namedTypeNode.typeArguments) {
            for (const typeArgument of namedTypeNode.typeArguments) {
              this.traverse(visitor, typeArgument, context);
            }
          }
          this.exit(visitor.namedTypeNode, namedTypeNode, context);
          break;
        }

        case NodeKind.FUNCTIONTYPE: {
          const functionTypeNode = node as FunctionTypeNode;
          this.enter(visitor.functionTypeNode, functionTypeNode, context);
          if (functionTypeNode.parameters) {
            for (const parameter of functionTypeNode.parameters) {
              this.traverse(visitor, parameter, context);
            }
          }
          this.exit(visitor.functionTypeNode, functionTypeNode, context);
          break;
        }

        default:
          throw new TypeError("Invalid node type.");
      }
      this.exit(visitor.typeNode, node as TypeNode, context);
      return;
    } else if (node instanceof Statement) {
      this.enter(visitor.statement, node, context);

      switch (node.kind) {
        case NodeKind.EXPRESSION: {
          const expressionStatement = node as ExpressionStatement;
          this.enter(visitor.expressionStatement, expressionStatement, context);
          this.traverse(visitor, expressionStatement.expression, context);
          this.exit(visitor.expressionStatement, expressionStatement, context);
          break;
        }

        case NodeKind.BLOCK: {
          const blockStatement = node as BlockStatement;
          this.enter(visitor.blockStatement, blockStatement, context);
          const block = <BlockStatement>node;
          for (const statement of block.statements) {
            this.traverse(visitor, statement, context);
          }
          this.exit(visitor.blockStatement, blockStatement, context);
          break;
        }

        case NodeKind.BREAK: {
          const breakStatement = node as BreakStatement;
          this.enter(visitor.breakStatement, breakStatement, context);
          this.exit(visitor.breakStatement, breakStatement, context);
          break;
        }

        case NodeKind.CLASSDECLARATION: {
          const classDeclaration = node as ClassDeclaration;
          this.enter(visitor.classDeclaration, classDeclaration, context);
          this.traverse(visitor, classDeclaration.name, context);
          if (classDeclaration.decorators) {
            for (const decorator of classDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          if (classDeclaration.typeParameters) {
            for (const typeParameter of classDeclaration.typeParameters) {
              this.traverse(visitor, typeParameter, context);
            }
          }
          if (classDeclaration.extendsType)
            this.traverse(visitor, classDeclaration.extendsType, context);
          if (classDeclaration.implementsTypes) {
            for (const implementsType of classDeclaration.implementsTypes) {
              this.traverse(visitor, implementsType, context);
            }
          }
          for (const member of classDeclaration.members) {
            this.traverse(visitor, member, context);
          }
          this.exit(visitor.classDeclaration, classDeclaration, context);
          break;
        }

        case NodeKind.CONTINUE: {
          const continueStatement = node as ContinueStatement;
          this.enter(visitor.continueStatement, continueStatement, context);
          this.exit(visitor.continueStatement, continueStatement, context);
          break;
        }

        case NodeKind.DO: {
          const doStatement = node as DoStatement;
          this.enter(visitor.doStatement, doStatement, context);
          this.traverse(visitor, doStatement.condition, context);
          this.traverse(visitor, doStatement.statement, context);
          this.exit(visitor.doStatement, doStatement, context);
          break;
        }

        case NodeKind.EMPTY: {
          const emptyStatement = node as EmptyStatement;
          this.enter(visitor.emptyStatement, emptyStatement, context);
          this.exit(visitor.emptyStatement, emptyStatement, context);
          break;
        }

        case NodeKind.ENUMDECLARATION: {
          const enumDeclaration = node as EnumDeclaration;
          this.enter(visitor.enumDeclaration, enumDeclaration, context);
          this.traverse(visitor, enumDeclaration.name, context);
          if (enumDeclaration.decorators) {
            for (const decorator of enumDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          for (const value of enumDeclaration.values) {
            this.traverse(visitor, value, context);
          }
          this.exit(visitor.enumDeclaration, enumDeclaration, context);
          break;
        }

        case NodeKind.ENUMVALUEDECLARATION: {
          const enumValueDeclaration = node as EnumValueDeclaration;
          this.enter(
            visitor.enumValueDeclaration,
            enumValueDeclaration,
            context,
          );
          this.traverse(visitor, enumValueDeclaration.name, context);
          if (enumValueDeclaration.initializer)
            this.traverse(visitor, enumValueDeclaration.initializer, context);
          this.exit(
            visitor.enumValueDeclaration,
            enumValueDeclaration,
            context,
          );
          break;
        }

        case NodeKind.EXPORT: {
          const exportStatement = node as ExportStatement;
          this.enter(visitor.exportStatement, exportStatement, context);
          if (exportStatement.path)
            this.traverse(visitor, exportStatement.path, context);
          if (exportStatement.members) {
            for (const member of exportStatement.members) {
              this.traverse(visitor, member, context);
            }
          }
          this.exit(visitor.exportStatement, exportStatement, context);
          break;
        }

        case NodeKind.EXPORTDEFAULT: {
          const exportDefaultStatement = node as ExportDefaultStatement;
          this.enter(
            visitor.exportDefaultStatement,
            exportDefaultStatement,
            context,
          );
          this.traverse(visitor, exportDefaultStatement.declaration, context);
          this.exit(
            visitor.exportDefaultStatement,
            exportDefaultStatement,
            context,
          );
          break;
        }

        case NodeKind.EXPORTIMPORT: {
          const exportImportStatement = node as ExportImportStatement;
          this.enter(
            visitor.exportImportStatement,
            exportImportStatement,
            context,
          );
          this.traverse(visitor, exportImportStatement.name, context);
          this.traverse(visitor, exportImportStatement.externalName, context);
          this.exit(
            visitor.exportImportStatement,
            exportImportStatement,
            context,
          );
          break;
        }

        case NodeKind.FOR: {
          const forStatement = node as ForStatement;
          this.enter(visitor.forStatement, forStatement, context);
          if (forStatement.initializer)
            this.traverse(visitor, forStatement.initializer, context);
          if (forStatement.condition)
            this.traverse(visitor, forStatement.condition, context);
          if (forStatement.incrementor)
            this.traverse(visitor, forStatement.incrementor, context);
          this.traverse(visitor, forStatement.statement, context);
          this.exit(visitor.forStatement, forStatement, context);
          break;
        }

        case NodeKind.FOROF: {
          const forOfStatement = node as ForOfStatement;
          this.enter(visitor.forOfStatement, forOfStatement, context);
          this.traverse(visitor, forOfStatement.iterable, context);
          this.traverse(visitor, forOfStatement.variable, context);
          this.traverse(visitor, forOfStatement.statement, context);
          this.exit(visitor.forOfStatement, forOfStatement, context);
          break;
        }

        case NodeKind.FUNCTIONDECLARATION: {
          const functionDeclaration = node as FunctionDeclaration;
          this.enter(visitor.functionDeclaration, functionDeclaration, context);
          this.traverse(visitor, functionDeclaration.name, context);
          if (functionDeclaration.typeParameters) {
            for (const typeParameter of functionDeclaration.typeParameters) {
              this.traverse(visitor, typeParameter, context);
            }
          }
          this.traverse(visitor, functionDeclaration.signature, context);
          if (functionDeclaration.body)
            this.traverse(visitor, functionDeclaration.body, context);
          this.exit(visitor.functionDeclaration, functionDeclaration, context);
          break;
        }

        case NodeKind.FIELDDECLARATION: {
          const fieldDeclaration = node as FieldDeclaration;
          this.enter(visitor.fieldDeclaration, fieldDeclaration, context);
          this.traverse(visitor, fieldDeclaration.name, context);
          if (fieldDeclaration.type)
            this.traverse(visitor, fieldDeclaration.type, context);
          if (fieldDeclaration.initializer)
            this.traverse(visitor, fieldDeclaration.initializer, context);
          if (fieldDeclaration.decorators) {
            for (const decorator of fieldDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          this.exit(visitor.fieldDeclaration, fieldDeclaration, context);
          break;
        }

        case NodeKind.IF: {
          const ifStatement = node as IfStatement;
          this.enter(visitor.ifStatement, ifStatement, context);
          this.traverse(visitor, ifStatement.condition, context);
          this.traverse(visitor, ifStatement.ifTrue, context);
          if (ifStatement.ifFalse)
            this.traverse(visitor, ifStatement.ifTrue, context);
          this.exit(visitor.ifStatement, ifStatement, context);
          break;
        }

        case NodeKind.IMPORT: {
          const importStatement = node as ImportStatement;
          this.enter(visitor.importStatement, importStatement, context);
          if (importStatement.namespaceName)
            this.traverse(visitor, importStatement.namespaceName, context);
          if (importStatement.declarations) {
            for (const declaration of importStatement.declarations) {
              this.traverse(visitor, declaration, context);
            }
          }
          this.exit(visitor.importStatement, importStatement, context);
          break;
        }

        case NodeKind.IMPORTDECLARATION: {
          const importDeclaration = node as ImportDeclaration;
          this.enter(visitor.importDeclaration, importDeclaration, context);
          this.traverse(visitor, importDeclaration.foreignName, context);
          this.traverse(visitor, importDeclaration.name, context);
          if (importDeclaration.decorators) {
            for (const decorator of importDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          this.exit(visitor.importDeclaration, importDeclaration, context);
          break;
        }

        case NodeKind.INDEXSIGNATUREDECLARATION: {
          const indexSignatureDeclaration = node as IndexSignatureDeclaration;
          this.enter(
            visitor.indexSignatureDeclaration,
            indexSignatureDeclaration,
            context,
          );
          this.traverse(visitor, indexSignatureDeclaration.name, context);
          this.traverse(visitor, indexSignatureDeclaration.keyType, context);
          this.traverse(visitor, indexSignatureDeclaration.valueType, context);
          if (indexSignatureDeclaration.decorators) {
            for (const decorator of indexSignatureDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          this.exit(
            visitor.indexSignatureDeclaration,
            indexSignatureDeclaration,
            context,
          );
          break;
        }

        case NodeKind.INTERFACEDECLARATION: {
          const interfaceDeclaration = node as InterfaceDeclaration;
          this.enter(
            visitor.interfaceDeclaration,
            interfaceDeclaration,
            context,
          );
          this.traverse(visitor, interfaceDeclaration.name, context);
          if (interfaceDeclaration.decorators) {
            for (const decorator of interfaceDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          if (interfaceDeclaration.implementsTypes) {
            for (const implementsType of interfaceDeclaration.implementsTypes) {
              this.traverse(visitor, implementsType, context);
            }
          }
          if (interfaceDeclaration.extendsType)
            this.traverse(visitor, interfaceDeclaration.extendsType, context);
          for (const member of interfaceDeclaration.members) {
            this.traverse(visitor, member, context);
          }
          this.exit(
            visitor.interfaceDeclaration,
            interfaceDeclaration,
            context,
          );
          break;
        }

        case NodeKind.METHODDECLARATION: {
          const methodDeclaration = node as MethodDeclaration;
          this.enter(visitor.methodDeclaration, methodDeclaration, context);
          this.traverse(visitor, methodDeclaration.name, context);
          if (methodDeclaration.typeParameters) {
            for (const typeParameter of methodDeclaration.typeParameters) {
              this.traverse(visitor, typeParameter, context);
            }
          }
          this.traverse(visitor, methodDeclaration.signature, context);
          if (methodDeclaration.decorators) {
            for (const decorator of methodDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          if (methodDeclaration.body)
            this.traverse(visitor, methodDeclaration.body, context);
          this.exit(visitor.methodDeclaration, methodDeclaration, context);
          break;
        }

        case NodeKind.NAMESPACEDECLARATION: {
          const namespaceDeclaration = node as NamespaceDeclaration;
          this.enter(
            visitor.namespaceDeclaration,
            namespaceDeclaration,
            context,
          );
          this.traverse(visitor, namespaceDeclaration.name, context);
          if (namespaceDeclaration.decorators) {
            for (const decorator of namespaceDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          for (const member of namespaceDeclaration.members) {
            this.traverse(visitor, member, context);
          }
          this.exit(
            visitor.namespaceDeclaration,
            namespaceDeclaration,
            context,
          );
          break;
        }

        case NodeKind.RETURN: {
          const returnStatement = node as ReturnStatement;
          this.enter(visitor.returnStatement, returnStatement, context);
          if (returnStatement.value)
            this.traverse(visitor, returnStatement.value, context);
          this.exit(visitor.returnStatement, returnStatement, context);
          break;
        }

        case NodeKind.SWITCH: {
          const switchStatement = node as SwitchStatement;
          this.enter(visitor.switchStatement, switchStatement, context);
          this.traverse(visitor, switchStatement.condition, context);
          for (const caseStatement of switchStatement.cases) {
            this.traverse(visitor, caseStatement, context);
          }
          this.exit(visitor.switchStatement, switchStatement, context);
          break;
        }

        case NodeKind.THROW: {
          const throwStatement = node as ThrowStatement;
          this.enter(visitor.throwStatement, throwStatement, context);
          this.traverse(visitor, throwStatement.value, context);
          this.exit(visitor.throwStatement, throwStatement, context);
          break;
        }

        case NodeKind.TRY: {
          const tryStatement = node as TryStatement;
          this.enter(visitor.tryStatement, tryStatement, context);
          for (const statement of tryStatement.statements) {
            this.traverse(visitor, statement, context);
          }
          if (tryStatement.catchVariable)
            this.traverse(visitor, tryStatement.catchVariable, context);
          if (tryStatement.catchStatements) {
            for (const statement of tryStatement.catchStatements) {
              this.traverse(visitor, statement, context);
            }
          }
          if (tryStatement.finallyStatements) {
            for (const statement of tryStatement.finallyStatements) {
              this.traverse(visitor, statement, context);
            }
          }
          this.exit(visitor.tryStatement, tryStatement, context);
          break;
        }

        case NodeKind.TYPEDECLARATION: {
          const typeDeclaration = node as TypeDeclaration;
          this.enter(visitor.typeDeclaration, typeDeclaration, context);
          this.traverse(visitor, typeDeclaration.name, context);
          this.traverse(visitor, typeDeclaration.type, context);
          if (typeDeclaration.decorators) {
            for (const decorator of typeDeclaration.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          if (typeDeclaration.typeParameters) {
            for (const typeParameter of typeDeclaration.typeParameters) {
              this.traverse(visitor, typeParameter, context);
            }
          }
          this.exit(visitor.typeDeclaration, typeDeclaration, context);
          break;
        }

        case NodeKind.VARIABLE: {
          const variableStatement = node as VariableStatement;
          this.enter(visitor.variableStatement, variableStatement, context);
          if (variableStatement.decorators) {
            for (const decorator of variableStatement.decorators) {
              this.traverse(visitor, decorator, context);
            }
          }
          for (const declaration of variableStatement.declarations) {
            this.traverse(visitor, declaration, context);
          }
          this.exit(visitor.variableStatement, variableStatement, context);
          break;
        }

        case NodeKind.VARIABLEDECLARATION: {
          const variableDeclaration = node as VariableDeclaration;
          this.enter(visitor.variableDeclaration, variableDeclaration, context);
          this.traverse(visitor, variableDeclaration.name, context);
          if (variableDeclaration.type)
            this.traverse(visitor, variableDeclaration.type, context);
          if (variableDeclaration.initializer)
            this.traverse(visitor, variableDeclaration.initializer, context);
          this.exit(visitor.variableDeclaration, variableDeclaration, context);
          break;
        }

        case NodeKind.WHILE: {
          const whileStatement = node as WhileStatement;
          this.enter(visitor.whileStatement, whileStatement, context);
          this.traverse(visitor, whileStatement.condition, context);
          this.traverse(visitor, whileStatement.statement, context);
          this.exit(visitor.whileStatement, whileStatement, context);
          break;
        }

        default:
          throw new TypeError("Invalid node type.");
      }
      this.exit(visitor.statement, node, context);
      return;
    } else if (node instanceof Expression) {
      this.enter(visitor.expression, node, context);
      switch (node.kind) {
        case NodeKind.TRUE: {
          const trueExpression = node as TrueExpression;
          this.enter(visitor.identifierExpression, trueExpression, context);
          this.enter(visitor.trueExpression, trueExpression, context);
          this.exit(visitor.trueExpression, trueExpression, context);
          this.exit(visitor.identifierExpression, trueExpression, context);
          break;
        }

        case NodeKind.FALSE: {
          const falseExpression = node as FalseExpression;
          this.enter(visitor.identifierExpression, falseExpression, context);
          this.enter(visitor.falseExpression, falseExpression, context);
          this.exit(visitor.falseExpression, falseExpression, context);
          this.exit(visitor.identifierExpression, falseExpression, context);
          break;
        }

        case NodeKind.NULL: {
          const nullExpression = node as NullExpression;
          this.enter(visitor.identifierExpression, nullExpression, context);
          this.enter(visitor.nullExpression, nullExpression, context);
          this.exit(visitor.nullExpression, nullExpression, context);
          this.exit(visitor.identifierExpression, nullExpression, context);
          break;
        }

        case NodeKind.SUPER: {
          const superExpression = node as SuperExpression;
          this.enter(visitor.identifierExpression, superExpression, context);
          this.enter(visitor.superExpression, superExpression, context);
          this.exit(visitor.superExpression, superExpression, context);
          this.exit(visitor.identifierExpression, superExpression, context);
          break;
        }

        case NodeKind.THIS: {
          const thisExpression = node as ThisExpression;
          this.enter(visitor.identifierExpression, thisExpression, context);
          this.enter(visitor.thisExpression, thisExpression, context);
          this.exit(visitor.thisExpression, thisExpression, context);
          this.exit(visitor.identifierExpression, thisExpression, context);
          break;
        }

        case NodeKind.CONSTRUCTOR: {
          const constructorExpression = node as ConstructorExpression;
          this.enter(
            visitor.identifierExpression,
            constructorExpression,
            context,
          );
          this.enter(
            visitor.constructorExpression,
            constructorExpression,
            context,
          );
          this.exit(
            visitor.constructorExpression,
            constructorExpression,
            context,
          );
          this.exit(
            visitor.identifierExpression,
            constructorExpression,
            context,
          );
          break;
        }

        case NodeKind.IDENTIFIER: {
          const identifierExpression = node as IdentifierExpression;
          this.enter(
            visitor.identifierExpression,
            identifierExpression,
            context,
          );
          this.exit(
            visitor.identifierExpression,
            identifierExpression,
            context,
          );
          break;
        }

        case NodeKind.ASSERTION: {
          const assertionExpression = node as AssertionExpression;
          this.enter(visitor.assertionExpression, assertionExpression, context);
          this.traverse(visitor, assertionExpression.expression, context);
          if (assertionExpression.toType)
            this.traverse(visitor, assertionExpression.toType, context);
          this.exit(visitor.assertionExpression, assertionExpression, context);
          break;
        }

        case NodeKind.BINARY: {
          const binaryExpression = node as BinaryExpression;
          this.enter(visitor.binaryExpression, binaryExpression, context);
          this.traverse(visitor, binaryExpression.left, context);
          this.traverse(visitor, binaryExpression.right, context);
          this.exit(visitor.binaryExpression, binaryExpression, context);
          break;
        }

        case NodeKind.CALL: {
          const callExpression = node as CallExpression;
          this.enter(visitor.callExpression, callExpression, context);
          this.traverse(visitor, callExpression.expression, context);
          if (callExpression.typeArguments) {
            for (const typeArgument of callExpression.typeArguments) {
              this.traverse(visitor, typeArgument, context);
            }
          }
          if (callExpression.arguments) {
            for (const argument of callExpression.arguments) {
              this.traverse(visitor, argument, context);
            }
          }
          this.exit(visitor.callExpression, callExpression, context);
          break;
        }

        case NodeKind.CLASS: {
          const classExpression = node as ClassExpression;
          this.enter(visitor.classExpression, classExpression, context);
          this.traverse(visitor, classExpression.declaration, context);
          this.exit(visitor.classExpression, classExpression, context);
          break;
        }

        case NodeKind.COMMA: {
          const commaExpression = node as CommaExpression;
          this.enter(visitor.commaExpression, commaExpression, context);
          for (const expression of commaExpression.expressions) {
            this.traverse(visitor, expression, context);
          }
          this.exit(visitor.commaExpression, commaExpression, context);
          break;
        }

        case NodeKind.ELEMENTACCESS: {
          const elementAccessExpression = node as ElementAccessExpression;
          this.enter(
            visitor.elementAccessExpression,
            elementAccessExpression,
            context,
          );
          this.traverse(visitor, elementAccessExpression.expression, context);
          this.traverse(
            visitor,
            elementAccessExpression.elementExpression,
            context,
          );
          this.exit(
            visitor.elementAccessExpression,
            elementAccessExpression,
            context,
          );
          break;
        }

        case NodeKind.FUNCTION: {
          const functionExpression = node as FunctionExpression;
          this.enter(visitor.functionExpression, functionExpression, context);
          this.traverse(visitor, functionExpression.declaration, context);
          this.exit(visitor.functionExpression, functionExpression, context);
          break;
        }

        case NodeKind.INSTANCEOF: {
          const instanceOfExpression = node as InstanceOfExpression;
          this.enter(
            visitor.instanceOfExpression,
            instanceOfExpression,
            context,
          );
          this.traverse(visitor, instanceOfExpression.expression, context);
          this.traverse(visitor, instanceOfExpression.isType, context);
          this.exit(
            visitor.instanceOfExpression,
            instanceOfExpression,
            context,
          );
          break;
        }

        case NodeKind.LITERAL: {
          const literalExpression = node as LiteralExpression;
          this.enter(visitor.literalExpression, literalExpression, context);

          switch (literalExpression.literalKind) {
            case LiteralKind.ARRAY: {
              const arrayLiteralExpression = node as ArrayLiteralExpression;
              this.enter(
                visitor.arrayLiteralExpression,
                arrayLiteralExpression,
                context,
              );
              this.exit(
                visitor.arrayLiteralExpression,
                arrayLiteralExpression,
                context,
              );
              break;
            }
            case LiteralKind.FLOAT: {
              const floatLiteralExpression = node as FloatLiteralExpression;
              this.enter(
                visitor.floatLiteralExpression,
                floatLiteralExpression,
                context,
              );
              this.exit(
                visitor.floatLiteralExpression,
                floatLiteralExpression,
                context,
              );
              break;
            }
            case LiteralKind.INTEGER: {
              const integerLiteralExpression = node as IntegerLiteralExpression;
              this.enter(
                visitor.integerLiteralExpression,
                integerLiteralExpression,
                context,
              );
              this.exit(
                visitor.integerLiteralExpression,
                integerLiteralExpression,
                context,
              );
              break;
            }
            case LiteralKind.OBJECT: {
              const objectLiteralExpression = node as ObjectLiteralExpression;
              this.enter(
                visitor.objectLiteralExpression,
                objectLiteralExpression,
                context,
              );
              this.exit(
                visitor.objectLiteralExpression,
                objectLiteralExpression,
                context,
              );
              break;
            }
            case LiteralKind.REGEXP: {
              const regexpLiteralExpression = node as RegexpLiteralExpression;
              this.enter(
                visitor.regexpLiteralExpression,
                regexpLiteralExpression,
                context,
              );
              this.exit(
                visitor.regexpLiteralExpression,
                regexpLiteralExpression,
                context,
              );
              break;
            }
            case LiteralKind.STRING: {
              const stringLiteralExpression = node as StringLiteralExpression;
              this.enter(
                visitor.stringLiteralExpression,
                stringLiteralExpression,
                context,
              );
              this.exit(
                visitor.stringLiteralExpression,
                stringLiteralExpression,
                context,
              );
              break;
            }
            default:
              throw new TypeError("Invalid literal kind.");
          }
          this.exit(visitor.literalExpression, literalExpression, context);
          break;
        }

        case NodeKind.NEW: {
          const newExpression = node as NewExpression;
          this.enter(visitor.newExpression, newExpression, context);
          newExpression.arguments;
          newExpression.typeArguments;
          newExpression.typeName;
          this.traverse(visitor, newExpression.typeName, context);
          if (newExpression.typeArguments) {
            for (const typeArgument of newExpression.typeArguments) {
              this.traverse(visitor, typeArgument, context);
            }
          }
          if (newExpression.arguments) {
            for (const argument of newExpression.arguments) {
              this.traverse(visitor, argument, context);
            }
          }
          this.exit(visitor.newExpression, newExpression, context);
          break;
        }

        case NodeKind.PARENTHESIZED: {
          const parenthesizedExpression = node as ParenthesizedExpression;
          this.enter(
            visitor.parenthesizedExpression,
            parenthesizedExpression,
            context,
          );
          this.traverse(visitor, parenthesizedExpression.expression, context);
          this.exit(
            visitor.parenthesizedExpression,
            parenthesizedExpression,
            context,
          );
          break;
        }

        case NodeKind.PROPERTYACCESS: {
          const propertyAccessExpression = node as PropertyAccessExpression;
          this.enter(
            visitor.propertyAccessExpression,
            propertyAccessExpression,
            context,
          );
          this.traverse(visitor, propertyAccessExpression.expression, context);
          this.traverse(visitor, propertyAccessExpression.property, context);
          this.exit(
            visitor.propertyAccessExpression,
            propertyAccessExpression,
            context,
          );
          break;
        }

        case NodeKind.TERNARY: {
          const ternaryExpression = node as TernaryExpression;
          this.enter(visitor.ternaryExpression, ternaryExpression, context);
          this.traverse(visitor, ternaryExpression.condition, context);
          this.traverse(visitor, ternaryExpression.ifThen, context);
          this.traverse(visitor, ternaryExpression.ifElse, context);
          this.exit(visitor.ternaryExpression, ternaryExpression, context);
          break;
        }

        case NodeKind.UNARYPREFIX: {
          const unaryPrefixExpression = node as UnaryPrefixExpression;
          this.enter(visitor.unaryExpression, unaryPrefixExpression, context);
          this.enter(
            visitor.unaryPrefixExpression,
            unaryPrefixExpression,
            context,
          );
          this.traverse(visitor, unaryPrefixExpression.operand, context);
          this.exit(
            visitor.unaryPrefixExpression,
            unaryPrefixExpression,
            context,
          );
          this.exit(visitor.unaryExpression, unaryPrefixExpression, context);
          break;
        }

        case NodeKind.UNARYPOSTFIX: {
          const unaryPostfixExpression = node as UnaryPostfixExpression;
          this.enter(visitor.unaryExpression, unaryPostfixExpression, context);
          this.enter(
            visitor.unaryPostfixExpression,
            unaryPostfixExpression,
            context,
          );
          this.traverse(visitor, unaryPostfixExpression.operand, context);
          this.exit(
            visitor.unaryPostfixExpression,
            unaryPostfixExpression,
            context,
          );
          this.exit(visitor.unaryExpression, unaryPostfixExpression, context);
          break;
        }

        default:
          throw new TypeError("Invalid node kind.");
      }
      this.exit(visitor.expression, node, context);
      return;
    } else {
      switch (node.kind) {
        case NodeKind.DECORATOR: {
          const decoratorNode = node as DecoratorNode;
          this.enter(visitor.decoratorNode, decoratorNode, context);
          this.traverse(visitor, decoratorNode.name, context);
          if (decoratorNode.arguments) {
            for (const argument of decoratorNode.arguments) {
              this.traverse(visitor, argument, context);
            }
          }
          this.exit(visitor.decoratorNode, decoratorNode, context);
          return;
        }

        case NodeKind.EXPORTMEMBER: {
          const exportMember = node as ExportMember;
          this.enter(visitor.exportMember, exportMember, context);
          this.traverse(visitor, exportMember.localName, context);
          this.traverse(visitor, exportMember.exportedName, context);
          this.exit(visitor.exportMember, exportMember, context);
          return;
        }

        case NodeKind.PARAMETER: {
          const parameterNode = node as ParameterNode;
          this.enter(visitor.parameterNode, parameterNode, context);
          this.traverse(visitor, parameterNode.name, context);
          if (parameterNode.implicitFieldDeclaration)
            this.traverse(
              visitor,
              parameterNode.implicitFieldDeclaration,
              context,
            );
          if (parameterNode.initializer)
            this.traverse(visitor, parameterNode.initializer, context);
          if (parameterNode.type)
            this.traverse(visitor, parameterNode.type, context);
          this.exit(visitor.parameterNode, parameterNode, context);
          return;
        }

        case NodeKind.SWITCHCASE: {
          const switchCase = node as SwitchCase;
          this.enter(visitor.switchCase, switchCase, context);
          if (switchCase.label)
            this.traverse(visitor, switchCase.label, context);
          for (const statement of switchCase.statements) {
            this.traverse(visitor, statement, context);
          }
          this.exit(visitor.switchCase, switchCase, context);
          return;
        }

        case NodeKind.TYPENAME: {
          const typeName = node as TypeName;
          this.enter(visitor.typeName, typeName, context);
          this.traverse(visitor, typeName.identifier, context);
          if (typeName.next) this.traverse(visitor, typeName.next, context);
          this.exit(visitor.typeName, typeName, context);
          return;
        }

        case NodeKind.TYPEPARAMETER: {
          const typeParameterNode = node as TypeParameterNode;
          this.enter(visitor.typeParameterNode, typeParameterNode, context);
          this.traverse(visitor, typeParameterNode.name, context);
          if (typeParameterNode.extendsType)
            this.traverse(visitor, typeParameterNode.extendsType, context);
          if (typeParameterNode.defaultType)
            this.traverse(visitor, typeParameterNode.defaultType, context);
          this.exit(visitor.typeParameterNode, typeParameterNode, context);
          break;
        }

        default:
          throw new TypeError("Invalid node type.");
      }
    }
  }

  private enter<T extends Node>(
    pattern: VisitorPattern<T> | void,
    node: T,
    context: VisitorContext<Node>,
  ): void {
    if (!pattern) return;
    else if (typeof pattern === "function")
      pattern(node, context as VisitorContext<T>);
    else if (typeof pattern.enter === "function")
      pattern.enter(node, context as VisitorContext<T>);
  }

  private exit<T extends Node>(
    pattern: VisitorPattern<T> | void,
    node: T,
    context: VisitorContext<Node>,
  ): void {
    if (!pattern || typeof pattern === "function") return;
    else if (typeof pattern.exit === "function")
      pattern.exit(node, context as VisitorContext<T>);
  }
}
