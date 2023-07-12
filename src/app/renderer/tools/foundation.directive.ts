import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[foundationHost]',
})
export class FoundationDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}