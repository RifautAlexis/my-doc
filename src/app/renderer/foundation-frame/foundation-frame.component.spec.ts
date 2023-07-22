import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationFrameComponent } from './foundation-frame.component';

describe('FoundationFrameComponent', () => {
  let component: FoundationFrameComponent;
  let fixture: ComponentFixture<FoundationFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoundationFrameComponent]
    });
    fixture = TestBed.createComponent(FoundationFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
