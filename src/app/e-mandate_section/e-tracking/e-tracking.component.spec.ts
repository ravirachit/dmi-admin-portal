import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ETrackingComponent } from './e-tracking.component';

describe('ETrackingComponent', () => {
  let component: ETrackingComponent;
  let fixture: ComponentFixture<ETrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ETrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ETrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
