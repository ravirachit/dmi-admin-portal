import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedBorrowComponent } from './allowed-borrow.component';

describe('AllowedBorrowComponent', () => {
  let component: AllowedBorrowComponent;
  let fixture: ComponentFixture<AllowedBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowedBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
