import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseConditionTemplateComponent } from './use-condition-template.component';

describe('UseConditionTemplateComponent', () => {
  let component: UseConditionTemplateComponent;
  let fixture: ComponentFixture<UseConditionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseConditionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseConditionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
