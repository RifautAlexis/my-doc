import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChipsComponent } from './my-chips.component';

describe('MyChipsComponent', () => {
  let component: MyChipsComponent;
  let fixture: ComponentFixture<MyChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyChipsComponent]
    });
    fixture = TestBed.createComponent(MyChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
