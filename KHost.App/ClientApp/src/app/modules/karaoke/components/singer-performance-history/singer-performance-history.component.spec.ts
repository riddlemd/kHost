import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerPerformanceHistoryComponent } from './singer-performance-history.component';

describe('SingerPerformanceHistoryComponent', () => {
  let component: SingerPerformanceHistoryComponent;
  let fixture: ComponentFixture<SingerPerformanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerPerformanceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerPerformanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
