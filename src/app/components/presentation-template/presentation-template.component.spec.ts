import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationTemplateComponent } from './presentation-template.component';

describe('PresentationTemplateComponent', () => {
  let component: PresentationTemplateComponent;
  let fixture: ComponentFixture<PresentationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
