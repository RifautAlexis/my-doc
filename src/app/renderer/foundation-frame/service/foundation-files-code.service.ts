import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  Type,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  forkJoin,
  map,
  mergeMap,
  of,
} from 'rxjs';
import {
  ButtonOverviewExample,
  ButtonTypesExample,
  CardFancyExample,
  CardMediaSizeExample,
} from 'src/app/components-examples';
import { COMPONENT_MAP } from '../../config/component-map';

@Injectable()
export class FoundationFilesCodeService {
  private httpClient = inject(HttpClient);

  private filesCode$ = new BehaviorSubject<Record<string, string>>({});

  filesCode = toSignal<Record<string, string>, Record<string, string>>(
    this.filesCode$,
    {
      initialValue: {},
    }
  );

  init(componentName: string): void {
    const component = COMPONENT_MAP[componentName];
    this.httpClient
      .get(`assets/${component.fileName}`, {
        responseType: 'text',
      })
      .pipe(
        concatMap((masterFileContent) => {
          const filesNames = [
            ...masterFileContent.matchAll(
              /[a-zA-Z0-9\-]+(?:\.html|\.scss|\.css)/gm
            ),
          ];

          let filesContent$: Observable<{ [key: string]: string }>[] = [
            of({ [component.fileName]: masterFileContent }),
          ];
          filesNames.forEach((element) =>
            filesContent$.push(
              this.loadFileCode(element[0]).pipe(
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
        filesContent.forEach(element => {
          const fileName: string = Object.keys(element)[0];
          filesCode[fileName] = element[fileName];
        });
        this.filesCode$.next(filesCode);
      });
  }

  private loadFileCode(fileName: string): Observable<string> {
    return this.httpClient.get(`assets/${fileName}`, {
      responseType: 'text',
    });
  }
}
