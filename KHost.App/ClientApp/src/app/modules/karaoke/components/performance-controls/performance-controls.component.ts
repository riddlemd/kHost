import { Component, Input, OnInit } from '@angular/core';
import { Performance, PerformanceState } from 'src/app/modules/kommon/models/Performance';
import { Venue } from 'src/app/modules/kommon/models/Venue';
import { QueuedSinger } from '../../models/QueuedSinger';

@Component({
  selector: 'kh-song-controls',
  templateUrl: './performance-controls.component.html',
  styleUrls: ['./performance-controls.component.scss']
})
export class PerformanceControlsComponent implements OnInit {
  @Input() selectedQueuedSinger:QueuedSinger|null = null;
  @Input() currentVenue: Venue|null = null;

  performance: Performance|null = null;

  public isPlaying(): boolean {
    return this.performance?.state === PerformanceState.Playing;
  }

  public isPaused(): boolean {
    return this.performance?.state === PerformanceState.Paused;
  }

  public isStopped(): boolean {
    return this.performance?.state === PerformanceState.Stopped;
  }

  constructor() { }

  ngOnInit(): void {
  }
}