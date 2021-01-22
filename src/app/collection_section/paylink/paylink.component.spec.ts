import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylinkComponent } from './paylink.component';

describe('PaylinkComponent', () => {
  let component: PaylinkComponent;
  let fixture: ComponentFixture<PaylinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
