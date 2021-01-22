import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDiscrepancyDetailComponent } from './total-discrepancy-detail.component';

describe('TotalDiscrepancyDetailComponent', () => {
  let component: TotalDiscrepancyDetailComponent;
  let fixture: ComponentFixture<TotalDiscrepancyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalDiscrepancyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDiscrepancyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
