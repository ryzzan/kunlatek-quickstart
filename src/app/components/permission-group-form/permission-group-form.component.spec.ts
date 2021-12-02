import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGroupFormComponent } from './permission-group-form.component';

describe('PermissionGroupFormComponent', () => {
  let component: PermissionGroupFormComponent;
  let fixture: ComponentFixture<PermissionGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
