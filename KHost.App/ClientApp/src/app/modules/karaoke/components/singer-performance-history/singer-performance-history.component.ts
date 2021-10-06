import { Component, Input, OnInit } from '@angular/core';
import { SingerPerformance } from '../../../kommon/models/SingerPerformance';
import { QueuedSinger } from '../../models/QueuedSinger';

@Component({
  selector: 'kh-singer-performance-history',
  templateUrl: './singer-performance-history.component.html',
  styleUrls: ['./singer-performance-history.component.scss']
})
export class SingerPerformanceHistoryComponent {

  @Input()
  selectedQueuedSinger: QueuedSinger|null = null;

  selectedSingerPerformance: SingerPerformance|null = null;

  constructor() { }

  getPerformanceCount(): number {
    return this.selectedQueuedSinger?.singer?.performanceHistory.length ?? 0;
  }
}
