import { existsSync, readdir } from 'fs-extra';
import { normalize } from 'path';
import { createProgram } from 'typescript';
import { astParser } from './ast-parser';
import { ComponentStructure } from './component-structure';

export async function apiParser(path: string) {
  const regex = /^((?!index).)*\.ts$/gm;

  console.log(path, existsSync(path));

  if (existsSync(path)) {
    const filesPAth = await getAllFilesPathInDirectory(path);

    const typescriptFilesPath = filesPAth.filter((filePath) =>
      regex.test(filePath)
    );
    console.log(typescriptFilesPath);

    // typescriptFilesPath.forEach(async (filePath) => {
    //   const tsFileContent = await readFile(filePath, { encoding: 'utf-8' });

    //   const sourceFile: SourceFile = createSourceFile(
    //     'x.ts',
    //     tsFileContent,
    //     ScriptTarget.Latest
    //   );
      
    //   const componentStructure: ComponentStructure = astParser(sourceFile);
    //   console.log(componentStructure);
    // });
    const program = createProgram(typescriptFilesPath, {});
    const sourceFile = program.getSourceFile(typescriptFilesPath[0]);
    const checker = program.getTypeChecker();
      
    const componentStructure: ComponentStructure = astParser(sourceFile, checker);
  }
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
