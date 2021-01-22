import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSellBorrowersComponent } from './x-sell-borrowers.component';

describe('XSellBorrowersComponent', () => {
  let component: XSellBorrowersComponent;
  let fixture: ComponentFixture<XSellBorrowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XSellBorrowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XSellBorrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
