import { Component, OnInit } from '@angular/core';
import { Venue } from '../kommon/models/Venue';
import { QueuedSinger } from './models/QueuedSinger';

@Component({
  selector: 'kh-karaoke-manager',
  templateUrl: './karaoke-manager.component.html',
  styleUrls: ['./karaoke-manager.component.scss']
})
export class KaraokeManagerComponent implements OnInit {

  selectedQueuedSinger: QueuedSinger|null = null;

  currentVenue: Venue|null = null;

  constructor() { }

  setSelectedQueuedSinger(queuedSinger: QueuedSinger|null): void {
    this.selectedQueuedSinger = queuedSinger;
  }

  ngOnInit(): void {
  }
}
