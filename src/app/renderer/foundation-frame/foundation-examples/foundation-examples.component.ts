import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Signal,
  Type,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FoundationDirective } from '../../tools/foundation.directive';
import { ButtonOverviewExample, ButtonTypesExample, CardFancyExample, CardMediaSizeExample } from "src/app/components-examples";
import { HttpClient } from '@angular/common/http';
import { COMPONENT_MAP } from '../../config/component-map';

@Component({
  selector: 'foundation-examples',
  standalone: true,
  templateUrl: 'foundation-examples.component.html',
  imports: [],
})
export class FoundationExamplesComponent implements OnInit, AfterViewInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private httpClient = inject(HttpClient);

  @Input({ required: true,}) componentName!: string;
  // @Input({ required: true,}) codeFiles!: Record<string, string>;

  @ViewChild(FoundationDirective, { static: true })
  foundationHost!: FoundationDirective;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const component = COMPONENT_MAP[this.componentName];

    if (!!component) {
      this.viewContainerRef.createComponent(component.componentType);
      this.changeDetection.detectChanges();
    }
  }
}
