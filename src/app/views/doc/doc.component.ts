import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MyButtonComponent,
  MyChipsComponent,
} from 'src/app/my-custom-components/index';
import { DocSideNavComponent } from '../doc-side-nav/doc-side-nav.component';

@Component({
  selector: 'doc',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    MyButtonComponent,
    MyChipsComponent,
    DocSideNavComponent,
  ],
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocComponent implements OnInit {
  componentName?: string | null;
  headings: Element[] = [];

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private elementRef = inject(ElementRef<HTMLElement>);

  markdown: WritableSignal<string> = signal<string>('');

  async ngOnInit(): Promise<void> {
    this.componentName = this.route.snapshot.paramMap.get('component');
    let markdownUrl: string;

    if (!!!this.componentName) {
      markdownUrl = 'assets/content/getting-started.md';
    } else {
      markdownUrl = `assets/content/${this.componentName}.md`;
    }

    this.httpClient
      .get(markdownUrl, {
        responseType: 'text',
      })
      .subscribe({
        next: (data) => {
          this.markdown.set(data);
        },
        error: (err) => {
          this.router.navigate(['']);
        },
      });
  }

  onReady(): void {
    this.headings = this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('h1, h2');
    console.log(this.headings);
  }
}
