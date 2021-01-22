import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EBorrowersComponent } from './e-borrowers.component';

describe('EBorrowersComponent', () => {
  let component: EBorrowersComponent;
  let fixture: ComponentFixture<EBorrowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EBorrowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EBorrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
