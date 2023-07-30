import { ChangeDetectorRef, Component, Input, OnInit, Signal, Type, ViewChild, ViewContainerRef, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { FoundationDirective } from '../tools/foundation.directive';
import { ButtonOverviewExample, ButtonTypesExample, CardFancyExample, CardMediaSizeExample } from 'src/app/components-examples';
import { FoundationExamplesComponent } from './foundation-examples/foundation-examples.component';
import { FoundationFilesCodeService } from './service/foundation-files-code.service';
import { COMPONENT_MAP } from '../config/component-map';
import { FoundationCodesComponent } from './foundation-codes/foundation-codes.component';

@Component({
  selector: 'foundation-frame',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FoundationExamplesComponent, FoundationCodesComponent],
  templateUrl: './foundation-frame.component.html',
  styleUrls: ['./foundation-frame.component.scss'],
  providers: [FoundationFilesCodeService]
})
export class FoundationFrameComponent implements OnInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private httpClient = inject(HttpClient);
  private foundationFilesCodeService = inject(FoundationFilesCodeService);

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
}
