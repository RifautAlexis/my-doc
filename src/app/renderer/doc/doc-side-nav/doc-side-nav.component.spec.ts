import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSideNavComponent } from './doc-side-nav.component';

describe('DocSideNavComponent', () => {
  let component: DocSideNavComponent;
  let fixture: ComponentFixture<DocSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocSideNavComponent]
    });
    fixture = TestBed.createComponent(DocSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
