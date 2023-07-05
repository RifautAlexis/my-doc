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
import { MyChipsComponent } from 'src/app/my-custom-components';
import { FoundationDirective } from 'src/app/plop/foundation.directive';

@Component({
  selector: 'foundation-examples',
  standalone: true,
  templateUrl: 'foundation-examples.component.html',
  imports: [MyChipsComponent],
})
export class FoundationExamplesComponent<T> implements AfterViewInit {
  private changeDetection = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input({ required: true }) componentType!: Type<T>;

  @ViewChild(FoundationDirective, { static: true })
  foundationHost!: FoundationDirective;

  ngAfterViewInit(): void {
    this.viewContainerRef.createComponent<T>(this.componentType);
    this.changeDetection.detectChanges();
  }
}
