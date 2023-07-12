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
import { FoundationDirective } from '../tools/foundation.directive';
import { ButtonOverviewExample, ButtonTypesExample, CardFancyExample, CardMediaSizeExample } from "src/app/components-examples";

const COMPONENT_MAP: Record<string, Type<any>> = {
  "ButtonOverviewExample": ButtonOverviewExample,
  "ButtonTypesExample": ButtonTypesExample,
  "CardFancyExample": CardFancyExample,
  "CardMediaSizeExample": CardMediaSizeExample,
};

@Component({
  selector: 'foundation-examples',
  standalone: true,
  templateUrl: 'foundation-examples.component.html',
  imports: [],
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
