import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EAnalyticsComponent } from './e-analytics.component';

describe('EAnalyticsComponent', () => {
  let component: EAnalyticsComponent;
  let fixture: ComponentFixture<EAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
