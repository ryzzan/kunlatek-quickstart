import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseConditionComponent } from './use-condition.component';

describe('UseConditionComponent', () => {
  let component: UseConditionComponent;
  let fixture: ComponentFixture<UseConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
