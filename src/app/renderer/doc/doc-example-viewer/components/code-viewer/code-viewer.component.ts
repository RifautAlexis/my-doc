import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Language } from '../../../../config/highlight';
import { HighlightService } from '../../service/highlight.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'code-viewer',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent implements AfterViewChecked {
  highlightService = inject(HighlightService);

  @Output() codeCopied = new EventEmitter<string>();

  private _filesCode: Record<string, string> = {};

  @Input({ required: true })
  public get filesCode(): Record<string, string> {
    return this._filesCode;
  }
  public set filesCode(data: Record<string, string>) {
    this._filesCode = data;
    this.filesNames = Object.keys(data);
  }

  filesNames: string[] = [];

  ngAfterViewChecked(): void {
    this.highlightService.highlightCodeExample();
  }

  getLanguage(fileName: string): string {
    const extensionFile = fileName.match(/.+\.([a-z]+)$/);

    if (!!!extensionFile) {
      return Language.none;
    }

    switch (extensionFile![1]) {
      case Language.css:
        return Language.css;
      case Language.scss:
        return Language.scss;
      case Language.ts:
        return Language.ts;
      case Language.html:
        return Language.html;

      default:
        return Language.none;
    }
  }

  onCodeCopied(code: string): void {
    this.codeCopied.emit(code);
  }
}
