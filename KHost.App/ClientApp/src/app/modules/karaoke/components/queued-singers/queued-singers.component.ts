import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueuedSinger } from 'src/app/modules/karaoke/models/QueuedSinger';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Singer } from 'src/app/models/Singer';
import { QueuedSingersProvider } from '../../providers/QueuedSingersProvider';
import { QueuedSongsProvider } from '../../providers/QueuedSongsProvider';
import { MatDialog } from '@angular/material/dialog';
import { AddSingerComponent } from '../add-singer/add-singer.component';
import { Venue } from 'src/app/models/Venue';
import { SingerPerformancesProvider } from 'src/app/services/providers/SingerPerformancesProvider';
import { SingerPerformanceHistoryComponent } from '../singer-performance-history/singer-performance-history.component';

@Component({
  selector: 'kh-queued-singers',
  templateUrl: './queued-singers.component.html',
  styleUrls: ['./queued-singers.component.scss']
})
export class QueuedSingersComponent implements OnInit {

  private _selectedQueuedSinger: QueuedSinger|null = null;
  set selectedQueuedSinger(value: QueuedSinger|null) { 
    this._selectedQueuedSinger = value;
    this.selectedQueuedSingerChange.emit(value);
  }
  get selectedQueuedSinger() { return this._selectedQueuedSinger };

  @Input()
  currentVenue: Venue|null = null;
  
  @Output()
  selectedQueuedSingerChange = new EventEmitter<QueuedSinger|null>();

  queuedSingers: QueuedSinger[] = []

  constructor(
    private _queuedSingersProvider: QueuedSingersProvider,
    private _queuedSongsProvider: QueuedSongsProvider,
    private _singerPerformancesProvider: SingerPerformancesProvider,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.populateSingers();
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.queuedSingers.move(e.previousIndex, e.currentIndex);
  }

  moveToTop(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveToTop(queuedSinger)
      .then(value => {
        this.queuedSingers.moveToStart(queuedSinger);
      });
  }

  moveUp(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveUp(queuedSinger)
      .then(value => {
        this.queuedSingers.moveTowardStart(queuedSinger);
      });
  }

  moveDown(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveDown(queuedSinger)
      .then(value => {
        this.queuedSingers.moveTowardEnd(queuedSinger);
      });
  }

  moveToBottom(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveToBottom(queuedSinger)
      .then(value => {
        this.queuedSingers.moveToEnd(queuedSinger);
      });
  }

  remove(queuedSinger: QueuedSinger): void {
    let startIndex = this.getQueuedSongIndex(queuedSinger);

    this._queuedSingersProvider.remove(queuedSinger)
      .then(value => {
        this.queuedSingers.splice(startIndex, 1);
        this.selectedQueuedSinger = null;
      });
  }

  add(singer: Singer): void {
    for(let existingQueuedSinger of this.queuedSingers) {
      if(existingQueuedSinger?.singer?.id == singer.id) return;
    }

    this._queuedSingersProvider.add(singer)
      .then(value => { this.queuedSingers.push(value); })
  }

  async populateSingers(): Promise<void>
  {
    this.queuedSingers = await this._queuedSingersProvider.get();

    for(let queuedSinger of this.queuedSingers) {
      if(queuedSinger.singer === null) continue;
      
      queuedSinger.singer.performanceHistory = await this._singerPerformancesProvider.getBySinger(queuedSinger.singer)
      queuedSinger.singer.queuedSongs = await this._queuedSongsProvider.getBySinger(queuedSinger.singer);
    }
  }

  openAddSingerDialog(): void {
    const dialogRef = this._dialog.open(AddSingerComponent);
    dialogRef.componentInstance.currentVenue = this.currentVenue;

    dialogRef
      .afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
    });
  }

  openSingerPerformanceHistoryDialog(): void {
    const dialogRef = this._dialog.open(SingerPerformanceHistoryComponent);
    dialogRef.componentInstance.selectedQueuedSinger = this.selectedQueuedSinger;

    dialogRef
      .afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
    });
  }

  protected getQueuedSongIndex(queuedSinger: QueuedSinger): number {
    for(let i = 0; i < this.queuedSingers.length; i++) {
      if(this.queuedSingers[i].id === queuedSinger.id) return i;
    }

    return -1;
  }
}