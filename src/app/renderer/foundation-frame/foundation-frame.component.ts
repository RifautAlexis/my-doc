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
import { FoundationExamplesComponent } from './foundation-examples/foundation-examples.component';
import { FoundationFilesCodeService } from './service/foundation-files-code.service';
import { COMPONENT_MAP } from '../config/component-map';
import { FoundationCodesComponent } from './foundation-codes/foundation-codes.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'foundation-frame',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FoundationExamplesComponent,
    FoundationCodesComponent,
  ],
  templateUrl: './foundation-frame.component.html',
  styleUrls: ['./foundation-frame.component.scss'],
  providers: [FoundationFilesCodeService],
})
export class FoundationFrameComponent implements OnInit {
  private foundationFilesCodeService = inject(FoundationFilesCodeService);
  private clipboard = inject(Clipboard);

  @Input({ required: true, alias: 'componentname' }) componentName!: string;

  hideExampleCode: WritableSignal<boolean> = signal(true);
  filesCode = this.foundationFilesCodeService.filesCode;

  ngOnInit(): void {
    const componentType = COMPONENT_MAP[this.componentName];

    if (!!componentType) {
      this.foundationFilesCodeService.init(this.componentName);
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
