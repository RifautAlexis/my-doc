import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'doc-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doc-side-nav.component.html',
})
export class DocSideNavComponent {
  @Input({ required: true }) headings!: Element[];
  
  isTitleH2(nodeName: string): boolean {
    return nodeName === 'H2';
  }
}
