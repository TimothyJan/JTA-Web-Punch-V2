import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgEntryComponent } from './msg-entry.component';

describe('MsgEntryComponent', () => {
  let component: MsgEntryComponent;
  let fixture: ComponentFixture<MsgEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
