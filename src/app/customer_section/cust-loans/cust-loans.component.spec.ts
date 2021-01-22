import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustLoansComponent } from './cust-loans.component';

describe('CustLoansComponent', () => {
  let component: CustLoansComponent;
  let fixture: ComponentFixture<CustLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
