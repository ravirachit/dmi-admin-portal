import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLoanDetailComponent } from './total-loan-detail.component';

describe('TotalLoanDetailComponent', () => {
  let component: TotalLoanDetailComponent;
  let fixture: ComponentFixture<TotalLoanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalLoanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalLoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
