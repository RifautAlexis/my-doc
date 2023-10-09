import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markup';

@Injectable({ providedIn: 'root' })
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightCodeExample(): void {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    } else {
      return;
    }
  }
}
