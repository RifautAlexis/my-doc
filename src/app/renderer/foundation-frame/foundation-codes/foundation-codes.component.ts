import {
  AfterViewChecked,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Language } from '../../config/highlight';
import { HighlightService } from '../../highlight.service';

@Component({
  selector: 'foundation-codes',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './foundation-codes.component.html',
  styleUrls: ['./foundation-codes.component.scss'],
})
export class FoundationCodesComponent implements AfterViewChecked {
  highlightService = inject(HighlightService);

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
}
