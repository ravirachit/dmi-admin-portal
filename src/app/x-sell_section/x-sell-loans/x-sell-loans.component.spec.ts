import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSellLoansComponent } from './x-sell-loans.component';

describe('XSellLoansComponent', () => {
  let component: XSellLoansComponent;
  let fixture: ComponentFixture<XSellLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XSellLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XSellLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
