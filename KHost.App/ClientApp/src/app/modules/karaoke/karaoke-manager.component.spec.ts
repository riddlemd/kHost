import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeManagerComponent } from './karaoke-manager.component';

describe('PerformanceManagerComponent', () => {
  let component: KaraokeManagerComponent;
  let fixture: ComponentFixture<KaraokeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaraokeManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
