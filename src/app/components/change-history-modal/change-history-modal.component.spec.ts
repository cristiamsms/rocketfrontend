import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHistoryModalComponent } from './change-history-modal.component';

describe('ChangeHistoryModalComponent', () => {
  let component: ChangeHistoryModalComponent;
  let fixture: ComponentFixture<ChangeHistoryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeHistoryModalComponent]
    });
    fixture = TestBed.createComponent(ChangeHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
