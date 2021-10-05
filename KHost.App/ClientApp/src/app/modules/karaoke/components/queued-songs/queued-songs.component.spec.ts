import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedSongsComponent } from './queued-songs.component';

describe('QueuedSongsComponent', () => {
  let component: QueuedSongsComponent;
  let fixture: ComponentFixture<QueuedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueuedSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
