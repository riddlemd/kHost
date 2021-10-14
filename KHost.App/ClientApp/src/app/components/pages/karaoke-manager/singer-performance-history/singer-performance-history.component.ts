import { Component, Input, OnInit } from '@angular/core';
import { SingerPerformance } from 'src/app/models/SingerPerformance';
import { QueuedSinger } from 'src/app/models/QueuedSinger';

@Component({
  selector: 'kh-singer-performance-history',
  templateUrl: './singer-performance-history.component.html',
  styleUrls: ['./singer-performance-history.component.scss']
})
export class SingerPerformanceHistoryComponent {

  @Input()
  selectedQueuedSinger?: QueuedSinger;

  selectedSingerPerformance?: SingerPerformance;

  performanceHistory: SingerPerformance[] = [];

  constructor() { }

  getPerformanceCount(): number {
    return this.performanceHistory.length;
  }
}
