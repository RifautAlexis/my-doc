import { existsSync, readdir } from 'fs-extra';
import { normalize } from 'path';
import { createProgram } from 'typescript';
import { astParser } from './ast-parser';
import cs from './component-structure';

export async function apiParser(path: string): Promise<cs.ComponentStructure | undefined> {
  const regex = /^((?!index).)*\.ts$/gm;

  if (existsSync(path)) {
    const filesPAth = await getAllFilesPathInDirectory(path);

    const typescriptFilesPath = filesPAth.filter((filePath) =>
      regex.test(filePath)
    );
    
    const program = createProgram(typescriptFilesPath, {});
    const sourceFile = program.getSourceFile(typescriptFilesPath[0]);
    const checker = program.getTypeChecker();
      
    const componentStructure: cs.ComponentStructure = astParser(sourceFile, checker);
    return componentStructure;
  }

  return undefined;
}

async function getAllFilesPathInDirectory(path: string): Promise<string[]> {
  const items = await readdir(path, {
    withFileTypes: true,
    encoding: 'utf-8',
    recursive: true,
  });

  const filesPath: string[] = [];

  for (const item of items) {
    if (item.isDirectory()) {
      filesPath.push(
        ...(await getAllFilesPathInDirectory(
          normalize(`${path}\\${item.name}`)
        ))
      );
    } else {
      filesPath.push(normalize(`${path}\\${item.name}`));
    }
  }
  return filesPath;
}
