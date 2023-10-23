import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExampleViewerComponent } from './components/example-viewer/example-viewer.component';
import { FileLoaderService } from './service/code-file-loader.service';
import { CodeViewerComponent } from './components/code-viewer/code-viewer.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'doc-example-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ExampleViewerComponent,
    CodeViewerComponent,
  ],
  templateUrl: './doc-example-viewer.component.html',
  providers: [FileLoaderService],
})
export class DocExampleViewerComponent implements OnInit {
  private fileLoaderService = inject(FileLoaderService);
  private clipboard = inject(Clipboard);

  @Input({ required: true, alias: 'componentname' }) componentName!: string;
  @Input({ required: true, alias: 'basepath' }) basePath!: string;
  @Input({ required: true, alias: 'filename' }) fileName!: string;

  hideExampleCode: WritableSignal<boolean> = signal(true);
  filesCode = this.fileLoaderService.filesCode;

  ngOnInit(): void {
    if (!!this.componentName && !!this.basePath && !!this.fileName) {
      this.fileLoaderService.init(this.basePath, this.fileName);
    }
  }

  onRevealCode(): void {
    this.hideExampleCode.set(!this.hideExampleCode());
  }

  onCodeCopied(code: string): void {
    const pending = this.clipboard.beginCopy(code);

    let remainingAttempts = 3;

    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };

    attempt();
  }
}
