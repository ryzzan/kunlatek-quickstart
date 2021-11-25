import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyNoticeTemplateComponent } from './privacy-notice-template.component';

describe('PrivacyNoticeTemplateComponent', () => {
  let component: PrivacyNoticeTemplateComponent;
  let fixture: ComponentFixture<PrivacyNoticeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyNoticeTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyNoticeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
