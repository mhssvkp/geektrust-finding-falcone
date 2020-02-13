import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureViewComponent } from './failure-view.component';

describe('FailureViewComponent', () => {
  let component: FailureViewComponent;
  let fixture: ComponentFixture<FailureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
