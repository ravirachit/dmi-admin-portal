import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrackingComponent } from './payment-tracking.component';

describe('PaymentTrackingComponent', () => {
  let component: PaymentTrackingComponent;
  let fixture: ComponentFixture<PaymentTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
