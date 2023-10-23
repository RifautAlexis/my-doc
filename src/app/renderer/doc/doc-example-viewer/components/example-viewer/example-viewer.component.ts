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
import { FoundationDirective } from '../../directive/foundation.directive';
import { COMPONENT_MAP } from '../../../../config/component-map';

@Component({
  selector: 'example-viewer',
  standalone: true,
  templateUrl: 'example-viewer.component.html',
})
export class ExampleViewerComponent implements AfterViewInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input({ required: true }) componentName!: string;

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
