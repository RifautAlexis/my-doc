import cs from './component-structure';
import {
  SourceFile,
  SyntaxKind,
  ImportDeclaration,
  ClassDeclaration,
  TypeChecker,
} from 'typescript';
import { classParser } from './parsers/class-parser';

export function astParser(sourceFile: SourceFile, checker: TypeChecker): cs.ComponentStructure {
  return sourceFileParser(sourceFile, checker);
}

function sourceFileParser(sourceFile: SourceFile, checker: TypeChecker): cs.ComponentStructure {
  let fileContent: Partial<cs.FileContent> = {};

  sourceFile.forEachChild((child) => {

    switch (child.kind) {
      case SyntaxKind.ImportDeclaration:
        const importDeclaration: ImportDeclaration = child as ImportDeclaration;
        fileContent.imports = [...(fileContent.imports || []), importDeclarationParser(importDeclaration)];
        break;

      case SyntaxKind.ClassDeclaration:
        const classDeclaration: ClassDeclaration = child as ClassDeclaration;
        fileContent.content = [...(fileContent.content || []), classParser(classDeclaration, checker)];
        break;

      default:
        break;
    }
  });
  console.log("================================");
  console.log(JSON.stringify(fileContent));
  console.log("================================");
  
  return fileContent as cs.ComponentStructure;
}

function importDeclarationParser(
  node: ImportDeclaration
): string {
    return node.getText();
}