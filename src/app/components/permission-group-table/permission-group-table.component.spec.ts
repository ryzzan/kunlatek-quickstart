import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGroupTableComponent } from './permission-group-table.component';

describe('PermissionGroupTableComponent', () => {
  let component: PermissionGroupTableComponent;
  let fixture: ComponentFixture<PermissionGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
