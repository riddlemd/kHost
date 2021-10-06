import { Component, Input, OnInit } from '@angular/core';
import { Singer } from 'src/app/modules/kommon/models/Singer';
import { Song } from 'src/app/modules/kommon/models/Song';
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

  singer: Singer|null = null;

  song: Song|null = null;

  state: PerformanceState = PerformanceState.Unknown;
  
  timeExpiredInSeconds: number = 0;

  public isPlaying(): boolean {
    return this.state === PerformanceState.Playing;
  }

  public isPaused(): boolean {
    return this.state === PerformanceState.Paused;
  }

  public isStopped(): boolean {
    return this.state === PerformanceState.Stopped;
  }

  constructor() { }

  ngOnInit(): void {
  }
}

export enum PerformanceState {
  Unknown,
  Playing,
  Paused,
  Stopped
}