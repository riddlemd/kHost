import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedSingersComponent } from './queued-singers.component';

describe('QueuedSingersComponent', () => {
  let component: QueuedSingersComponent;
  let fixture: ComponentFixture<QueuedSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueuedSingersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
