import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELoansComponent } from './e-loans.component';

describe('ELoansComponent', () => {
  let component: ELoansComponent;
  let fixture: ComponentFixture<ELoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
