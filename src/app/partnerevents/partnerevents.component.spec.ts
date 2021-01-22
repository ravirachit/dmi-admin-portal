import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnereventsComponent } from './partnerevents.component';

describe('PartnereventsComponent', () => {
  let component: PartnereventsComponent;
  let fixture: ComponentFixture<PartnereventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnereventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnereventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
