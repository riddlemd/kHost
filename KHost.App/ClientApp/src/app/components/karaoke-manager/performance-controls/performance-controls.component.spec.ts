import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceControlsComponent } from './performance-controls.component';

describe('PerformanceControlsComponent', () => {
  let component: PerformanceControlsComponent;
  let fixture: ComponentFixture<PerformanceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
