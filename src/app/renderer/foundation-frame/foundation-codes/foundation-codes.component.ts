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
import { Language } from '../../config/highlight';
import { HighlightService } from '../../highlight.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'foundation-codes',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './foundation-codes.component.html',
  styleUrls: ['./foundation-codes.component.scss'],
})
export class FoundationCodesComponent implements AfterViewChecked {
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

  constructor() {}

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
