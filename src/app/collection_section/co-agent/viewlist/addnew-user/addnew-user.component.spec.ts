import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewUserComponent } from './addnew-user.component';

describe('AddnewUserComponent', () => {
  let component: AddnewUserComponent;
  let fixture: ComponentFixture<AddnewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
