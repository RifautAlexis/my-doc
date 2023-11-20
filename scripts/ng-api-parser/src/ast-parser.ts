import { ComponentStructure } from './component-structure';
import {
  SourceFile,
  SyntaxKind,
  ImportDeclaration,
  ClassDeclaration,
  Decorator,
  LeftHandSideExpression,
  CallExpression,
  Identifier,
  ObjectLiteralExpression,
  PropertyAssignment,
  PropertyName,
  TypeChecker,
} from 'typescript';
import { classParser } from './parsers/class-parser';

export function astParser(sourceFile: SourceFile, checker: TypeChecker): ComponentStructure {
  return sourceFileParser(sourceFile);
}

function sourceFileParser(sourceFile: SourceFile): ComponentStructure {
  const componentStructure: Partial<ComponentStructure> = {
    imports: [],
  };

  sourceFile.forEachChild((child) => {

    switch (child.kind) {
      case SyntaxKind.ImportDeclaration:
        const importDeclaration: ImportDeclaration = child as ImportDeclaration;
        componentStructure.imports.push(importDeclarationParser(importDeclaration));
        break;

      case SyntaxKind.ClassDeclaration:
        const classDeclaration: ClassDeclaration = child as ClassDeclaration;
        classParser(classDeclaration);

        const classDecorators: Decorator[] = classDeclaration.modifiers.filter(
            (modifier) => modifier.kind === SyntaxKind.Decorator
          ) as Decorator[];
        const classDecoratorsParsed: Record<string, Record<string, string | boolean>> = classDecoratorsParser(classDecorators);

        break;

      default:
        break;
    }
  });
  console.log("================================");
  console.log(JSON.stringify(componentStructure));
  console.log("================================");
  
  return componentStructure as ComponentStructure;
}

function importDeclarationParser(
  node: ImportDeclaration
): string {
    return node.getText();
}

function classDecoratorsParser(
  nodes: Decorator[]
): Record<string, Record<string, string | boolean>> {
  let decorators: Record<string, Record<string, string | boolean>> = {};

  for (const decorator of nodes) {
    // if (decorator.expression.kind === SyntaxKind.CallExpression) {
    //   const callExpression: CallExpression =
    //     decorator.expression as CallExpression;

    //   const decoratorName: string = getIdentifierName(
    //     callExpression.expression
    //   );
    //   const decoratorProperties: Record<string, string | boolean> =
    //     getDecoratorProperties(callExpression);

    //   decorators[decoratorName] = decoratorProperties;
    // }
  }

  return decorators;
}

function getDecoratorProperties(
  node: CallExpression
): Record<string, string | boolean> | null {
  // node.arguments[0] cause generally decorators have one object as argument
  const decoratorProperties: Record<string, string | boolean> = {};
  if (node.arguments[0].kind === SyntaxKind.ObjectLiteralExpression) {
    const objectLiteralExpression = node
      .arguments[0] as ObjectLiteralExpression;
    let counter = 0;
    console.log(objectLiteralExpression.properties.length);
    for (const property of objectLiteralExpression.properties) {
      console.log(counter++);
      let propertyName: string | undefined = undefined;
      let propertyValue: string | boolean | undefined = undefined;

      if (property.kind === SyntaxKind.PropertyAssignment) {
        const propertyAssignment: PropertyAssignment =
          property as PropertyAssignment;
        propertyName = getIdentifierName(propertyAssignment.name);

        switch (propertyAssignment.initializer.kind) {
          case SyntaxKind.TrueKeyword:
            propertyValue = true;
            break;

          case SyntaxKind.FalseKeyword:
            propertyValue = false;
            break;

          // Describe arrays: styleUrls, imports
          case SyntaxKind.ArrayLiteralExpression:
            break;

          default:
            // propertyAssignment.initializer as different possible kind enum which contains property 'text'
            if ('text' in propertyAssignment.initializer) {
              propertyValue = propertyAssignment.initializer.text as string;
            }
            break;
        }

        decoratorProperties[propertyName] = propertyValue;
      }
    }

    return decoratorProperties;
  }

  return null;
}

// kind = 80
function getIdentifierName(
  node: LeftHandSideExpression | PropertyName
): string | null {
  if (node.kind === SyntaxKind.Identifier) {
    const identifier = node as Identifier;
    return identifier.escapedText.toString();
  }

  return null;
}

// 170, 213, expression, 80, Injectable
// 170, 213, arguments, 210, 303, name, 80, provideIn
// 170, 213, arguments, 210, 303, intializer, 11, root

// 170, 213, 80, Component
