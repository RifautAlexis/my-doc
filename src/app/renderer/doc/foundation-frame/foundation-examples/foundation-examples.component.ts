import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { FoundationDirective } from '../directive/foundation.directive';
import { COMPONENT_MAP } from '../../../config/component-map';

@Component({
  selector: 'foundation-examples',
  standalone: true,
  templateUrl: 'foundation-examples.component.html',
  imports: [],
})
export class FoundationExamplesComponent implements AfterViewInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input({ required: true }) componentName!: string;

  @ViewChild(FoundationDirective, { static: true })
  foundationHost!: FoundationDirective;

  ngAfterViewInit(): void {
    const component = COMPONENT_MAP[this.componentName];

    if (!!component) {
      this.viewContainerRef.createComponent(component.componentType);
      this.changeDetection.detectChanges();
    }
  }
}
