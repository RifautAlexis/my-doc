import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  MyButtonComponent,
  MyChipsComponent,
} from 'src/app/my-custom-components';
import { FoundationDirective } from 'src/app/tools/foundation.directive';

const COMPONENT_MAP: Record<string, Type<any>> = {
  "MyChipsComponent": MyChipsComponent,
  "MyButtonComponent": MyButtonComponent,
};

@Component({
  selector: 'foundation-examples',
  standalone: true,
  templateUrl: 'foundation-examples.component.html',
  imports: [MyChipsComponent],
})
export class FoundationExamplesComponent implements AfterViewInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input({ required: true, alias: 'componentname' }) componentName!: string;

  @ViewChild(FoundationDirective, { static: true })
  foundationHost!: FoundationDirective;

  ngAfterViewInit(): void {
    const componentType = COMPONENT_MAP[this.componentName];

    if (!!componentType) {
      this.viewContainerRef.createComponent(componentType);
      this.changeDetection.detectChanges();
    }
  }
}
