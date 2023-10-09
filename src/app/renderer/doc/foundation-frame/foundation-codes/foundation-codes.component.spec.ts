import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationCodesComponent } from './foundation-codes.component';

describe('FoundationCodesComponent', () => {
  let component: FoundationCodesComponent;
  let fixture: ComponentFixture<FoundationCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoundationCodesComponent]
    });
    fixture = TestBed.createComponent(FoundationCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
