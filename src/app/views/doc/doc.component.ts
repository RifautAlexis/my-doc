import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
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

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MyButtonComponent, MyChipsComponent],
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocComponent implements OnInit {
  componentName?: string | null;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
}
