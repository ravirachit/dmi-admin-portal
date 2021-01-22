import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSellDashboardComponent } from './x-sell-dashboard.component';

describe('XSellDashboardComponent', () => {
  let component: XSellDashboardComponent;
  let fixture: ComponentFixture<XSellDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XSellDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XSellDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
