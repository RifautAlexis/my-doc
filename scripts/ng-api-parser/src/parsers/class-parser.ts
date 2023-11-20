import {
  ComponentDecorator,
  ComponentStructure,
  DecoratorType,
  InjectableDecorator,
  defaultValue,
} from '../component-structure';
import ts from 'typescript';

export function classParser(classDeclaration: ts.ClassDeclaration) {
  const compStruct: ComponentStructure = {
    className: '',
    isExported: false,
  };

  classDeclaration.forEachChild((node) => {
    switch (node.kind) {
      case ts.SyntaxKind.Decorator:
        const classDecorator = classDecoratorParser(node as ts.Decorator);
        if (classDecorator !== null) {
          if(!!!compStruct.classDecorators){
            compStruct.classDecorators = [];
          }
          compStruct.classDecorators.push(classDecorator);
        }
        break;
      case ts.SyntaxKind.ExportKeyword:
        compStruct.isExported = true;
        break;
      case ts.SyntaxKind.Identifier:
        compStruct.className = node.getText();
        break;
      case ts.SyntaxKind.HeritageClause:
        const heritageClause = node as ts.HeritageClause;
        switch (heritageClause.token) {
          case ts.SyntaxKind.ExtendsKeyword:
            compStruct.extends = heritageClauseParser(heritageClause);
            break;
        
          case ts.SyntaxKind.ImplementsKeyword:
            compStruct.implements = heritageClauseParser(heritageClause);
            break;
        }
        break;
      case ts.SyntaxKind.PropertyDeclaration:
        break;
      case ts.SyntaxKind.ExportKeyword:
        break;
      case ts.SyntaxKind.Constructor:
        break;
      case ts.SyntaxKind.MethodDeclaration:
        break;

      default:
        break;
    }
  });

  console.log('+++++++++++++++++++++');
  console.log(JSON.stringify(compStruct));
  console.log('+++++++++++++++++++++');
}

function classDecoratorParser(
  node: ts.Decorator
): ComponentDecorator | InjectableDecorator | null {
  if (
    ts.isCallExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression)
  ) {
    const callExpression: ts.CallExpression = node.expression;
    const serviceTypeName: string = callExpression.expression.getText();

    let newClassDecorator: ComponentDecorator | InjectableDecorator;

    switch (serviceTypeName) {
      case 'Injectable':
        newClassDecorator = injectableDecoratorParser(callExpression);
        break;
      case 'Component':
        newClassDecorator = componentDecoratorParser(callExpression);
        break;

      default:
        break;
    }
    return newClassDecorator || null;
  }
}

function injectableDecoratorParser(callExpression: ts.CallExpression): InjectableDecorator {
  let newClassDecorator: InjectableDecorator = {
    kind: DecoratorType.Injectable
  };

  for (let argument of callExpression.arguments) {
    if (ts.isObjectLiteralExpression(argument)) {
      const properties = argument.properties;
      for (let property of properties) {
        if (ts.isPropertyAssignment(property)) {
          const PropertyParsed = leafParser(property);
          if(PropertyParsed !== null) {
            switch (leafParser(property.name)) {
              case 'providedIn':
                newClassDecorator.providedIn = leafParser(property.initializer) as string;
                break;
            
              default:
                break;
            }
          }
        }
      }
    }
  }

  return newClassDecorator;
}

function componentDecoratorParser(callExpression: ts.CallExpression): ComponentDecorator {
  let newClassDecorator: ComponentDecorator = {
    kind: DecoratorType.Component,
  };

  for (let argument of callExpression.arguments) {
    if (ts.isObjectLiteralExpression(argument)) {
      const properties = argument.properties;
      for (let property of properties) {
        if (ts.isPropertyAssignment(property)) {
          const propertyValue = leafParser(property.initializer);
          switch (leafParser(property.name)) {
            case 'selector':
              newClassDecorator.selector = propertyValue as string;
              break;
            case 'standalone':
              newClassDecorator.standalone = propertyValue as boolean;
              break;
            case 'templateUrl':
              newClassDecorator.templateUrl = propertyValue as string;
              break;
            case 'styleUrls':
              newClassDecorator.styleUrls = propertyValue as string[];
              break;
            case 'imports':
              newClassDecorator.imports = propertyValue as string[];
              break;
          
            default:
              break;
            }
        }
      }
    }
  }
  
  return newClassDecorator;
}

function heritageClauseParser(heritageClause: ts.HeritageClause): string[] {
  let types: string[] = [];

  for (const type of heritageClause.types) {
    types.push(leafParser(type.expression) as string);
  }

  return types;
}

function leafParser(node: ts.Node): defaultValue | null {
  switch (node.kind) {
    case ts.SyntaxKind.Identifier:
      return (node as ts.Identifier).text;
      
    case ts.SyntaxKind.StringLiteral:
      return (node as ts.StringLiteral).text;

    case ts.SyntaxKind.NumericLiteral:
      return (node as ts.NumericLiteral).text;

    case ts.SyntaxKind.TrueKeyword || ts.SyntaxKind.FalseKeyword:
      return (node as ts.BooleanLiteral).getText();

    case ts.SyntaxKind.ArrayLiteralExpression:
      return (node as ts.ArrayLiteralExpression).getText();

    case ts.SyntaxKind.ObjectLiteralExpression:
      return (node as ts.ObjectLiteralExpression).getText();

    case ts.SyntaxKind.FunctionExpression:
      return (node as ts.FunctionExpression).getText();

    case ts.SyntaxKind.ArrowFunction:
      return (node as ts.ArrowFunction).getText();

    default:
      return null;
  }
}

// function propertyAssignementParser(property: ts.PropertyAssignment): PropertyParsed | null {
//   if(ts.isPropertyAssignment(property)) {
//     const name = property.name;
//     const initializer = property.initializer;

//     let propertyParsed: PropertyParsed;
//     if (ts.isIdentifier(name)) {
//       if (ts.isStringLiteral(initializer)) {
//         propertyParsed = {
//           name: name.getText(),
//           value: initializer.text,
//         };
//       } else if (ts.isNumericLiteral(initializer)) {
//         propertyParsed = {
//           name: name.getText(),
//           value: initializer.text,
//         };
//       } else if (initializer.kind === ts.SyntaxKind.TrueKeyword || initializer.kind === ts.SyntaxKind.FalseKeyword) {
//         propertyParsed = {
//             name: name.getText(),
//             value: initializer.getText(),
//           };
//       } else if (ts.isArrayLiteralExpression(initializer)) {
//         propertyParsed = {
//             name: name.getText(),
//             value: initializer.elements.map(e => e.getText()),
//           };
//       } else if (ts.isObjectLiteralExpression(initializer)) {
//         propertyParsed = {
//             name: name.getText(),
//             value: initializer.properties.map(p => p.getText()),
//           };
//       } else if (ts.isFunctionExpression(initializer)) {
//         propertyParsed = {
//             name: name.getText(),
//             value: initializer.getText(),
//           };
//       } else if (ts.isArrowFunction(initializer)) {
//         propertyParsed = {
//             name: name.getText(),
//             value: initializer.getText(),
//           };
//       }
//       return propertyParsed;
//     }
//   }

//   return null;
// }

interface PropertyParsed {
  name: string;
  value: defaultValue;
}