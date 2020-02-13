import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRadioSelectComponent } from './custom-radio-select.component';

describe('CustomRadioSelectComponent', () => {
  let component: CustomRadioSelectComponent;
  let fixture: ComponentFixture<CustomRadioSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRadioSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRadioSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
