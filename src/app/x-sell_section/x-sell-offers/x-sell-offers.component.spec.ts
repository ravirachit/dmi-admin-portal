import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSellOffersComponent } from './x-sell-offers.component';

describe('XSellOffersComponent', () => {
  let component: XSellOffersComponent;
  let fixture: ComponentFixture<XSellOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XSellOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XSellOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
