import fs from 'fs-extra';
import { normalize } from 'path';
import { createProgram } from 'typescript';
import { sourceFileParser } from './ast-parser';
import cs from './component-structure';

export class ApiParser {
  private readonly typescriptFilesParsableRegex = /^((?!index).)*\.ts$/gm;

  private program;
  private sourceFile;
  private checker;
  private readonly paths: string[];

  constructor(paths: string[]) {
    this.paths = paths;
    this.init(paths);
  }

  parser(): cs.ComponentStructure {
    for (const path of this.paths) {
      const typescriptFilePaths: string[] = [];

      fs.stat(path, (err, stats) => {
        if (err) {
          console.error('An error occurred:', err);
          return;
        }
     
        if (stats.isFile() && this.typescriptFilesParsableRegex.test(path)) {
          typescriptFilePaths.push(path);
        } else if (stats.isDirectory()) {
          fs.readdir(path, (err, files) => {
            if (err) {
              console.error('An error occurred:', err);
              return;
            }

            files.forEach((file) => {
              const filePath = normalize(`${path}\\${file}`);
              fs.stat(filePath, (err, fileStats) => {
                if (err) {
                  console.error('An error occurred:', err);
                  return;
                }
     
                if (fileStats.isFile() && this.typescriptFilesParsableRegex.test(filePath)) {
                  console.log(filePath, 'is a file');
                  typescriptFilePaths.push(filePath);
                }
              });
            });

          });
        }
      });
      
      this.program = createProgram(typescriptFilePaths, {});
      this.sourceFile = this.program.getSourceFile(typescriptFilePaths[0]);
      this.checker = this.program.getTypeChecker();
        
      const componentStructure: cs.ComponentStructure = sourceFileParser(this.sourceFile, this.checker);
      return componentStructure;
    }
    
  }
  
  private init(paths: string[]): void {
    for (const path of paths) {
      if (!fs.existsSync(path)) {
        throw new Error(`${path} do not exist`);
      }
    }
  }
}
