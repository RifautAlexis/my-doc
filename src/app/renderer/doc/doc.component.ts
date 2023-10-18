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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DocSideNavComponent } from './doc-side-nav/doc-side-nav.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'doc',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
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
    this.getMarkdownFile();

    this.scrollTo();
  }

  onReady(): void {
    this.headings = this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('h1, h2');
  }

  private getMarkdownFile(): void {
    this.componentName = this.route.snapshot.paramMap.get('component');
    let markdownUrl: string;

    if (!!!this.componentName) {
      markdownUrl = `${environment.markdownContentBasePath}/getting-started.md`;
    } else {
      markdownUrl = `${environment.markdownContentBasePath}/${this.componentName}.md`;
    }

    this.httpClient
      .get(markdownUrl, {
        responseType: 'text',
      })
      .subscribe({
        next: (data) => {
          this.markdown.set(data);
        },
        error: (_) => {
          this.router.navigate(['']);
        },
      });
  }

  private scrollTo(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.getElementById(tree.fragment);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }
      }
    });
  }
}
