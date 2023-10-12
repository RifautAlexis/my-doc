import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExampleViewerComponent } from './doc-example-viewer.component';

describe('DocExampleViewerComponent', () => {
  let component: DocExampleViewerComponent;
  let fixture: ComponentFixture<DocExampleViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocExampleViewerComponent]
    });
    fixture = TestBed.createComponent(DocExampleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
