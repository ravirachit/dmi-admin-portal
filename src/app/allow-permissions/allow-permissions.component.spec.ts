import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowPermissionsComponent } from './allow-permissions.component';

describe('AllowPermissionsComponent', () => {
  let component: AllowPermissionsComponent;
  let fixture: ComponentFixture<AllowPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
