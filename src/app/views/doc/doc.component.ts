import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  @Input({ required: true }) componentName!: string;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  markdown: WritableSignal<string> = signal<string>('');

  async ngOnInit(): Promise<void> {
    this.componentName = this.route.snapshot.paramMap.get('component')!;

    this.httpClient.get(`assets/content/${this.componentName}.md`, { responseType: 'text' }).subscribe({
      next: (data) => {
        this.markdown.set(data);
      },
      error: (err) => {
        this.router.navigate(['']);
      },
    });
  }
}
