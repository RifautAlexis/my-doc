import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  forkJoin,
  map,
  of,
} from 'rxjs';

@Injectable()
export class FileLoaderService {
  private httpClient = inject(HttpClient);

  private filesCode$ = new BehaviorSubject<Record<string, string>>({});

  filesCode = toSignal<Record<string, string>, Record<string, string>>(
    this.filesCode$,
    {
      initialValue: {},
    }
  );

  init(basePath: string, fileName: string): void {
    this.loadFileCode(basePath, fileName)
      .pipe(
        concatMap((masterFileContent) => {
          const filesNames = [
            ...masterFileContent.matchAll(
              /[a-zA-Z0-9\-]+(?:\.html|\.scss|\.css)/gm
            ),
          ];

          let filesContent$: Observable<{ [key: string]: string }>[] = [
            of({ [fileName]: masterFileContent }),
          ];
          filesNames.forEach((element) =>
            filesContent$.push(
              this.loadFileCode(basePath, element[0]).pipe(
                map((data) => {
                  return {
                    [element[0]]: data,
                  };
                })
              )
            )
          );

          return forkJoin(filesContent$);
        })
      )
      .subscribe((filesContent) => {
        let filesCode: Record<string, string> = {};
        filesContent.forEach((element) => {
          const fileName: string = Object.keys(element)[0];
          filesCode[fileName] = element[fileName];
        });
        this.filesCode$.next(filesCode);
      });
  }

  private loadFileCode(filePath: string, fileName: string): Observable<string> {
    return this.httpClient.get(`${environment.codeExampleBasePath}/${filePath}${fileName}`, {
      responseType: 'text',
    });
  }
}
