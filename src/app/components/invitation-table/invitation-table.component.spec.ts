import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationTableComponent } from './invitation-table.component';

describe('InvitationTableComponent', () => {
  let component: InvitationTableComponent;
  let fixture: ComponentFixture<InvitationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
