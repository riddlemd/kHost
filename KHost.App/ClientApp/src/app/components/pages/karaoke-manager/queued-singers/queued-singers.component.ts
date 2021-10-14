import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Singer } from 'src/app/models/Singer';
import { QueuedSingersProvider } from 'src/app/services/providers/QueuedSingersProvider';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import { MatDialog } from '@angular/material/dialog';
import { AddSingerComponent } from '../add-singer/add-singer.component';
import { Venue } from 'src/app/models/Venue';
import { SingerPerformancesProvider } from 'src/app/services/providers/SingerPerformancesProvider';
import { SingerPerformanceHistoryComponent } from '../singer-performance-history/singer-performance-history.component';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';

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
    private _singersProvider: SingersProvider,
    private _singerPerformancesProvider: SingerPerformancesProvider,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.populateSingers();
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.queuedSingers.move(e.previousIndex, e.currentIndex);
  }

  async moveToTop(queuedSinger: QueuedSinger): Promise<void> {
    const result = await this._queuedSingersProvider.moveToTop(queuedSinger);
    
    this.queuedSingers.moveToStart(queuedSinger);
  }

  async moveUp(queuedSinger: QueuedSinger): Promise<void> {
    const result = await this._queuedSingersProvider.moveUp(queuedSinger);
    
    this.queuedSingers.moveTowardStart(queuedSinger);
  }

  async moveDown(queuedSinger: QueuedSinger): Promise<void> {
    const result = await this._queuedSingersProvider.moveDown(queuedSinger);
    
    this.queuedSingers.moveTowardEnd(queuedSinger);
  }

  async moveToBottom(queuedSinger: QueuedSinger): Promise<void> {
    const result = await this._queuedSingersProvider.moveToBottom(queuedSinger);
    
    this.queuedSingers.moveToEnd(queuedSinger);
  }

  async remove(queuedSinger: QueuedSinger): Promise<void> {
    const result = await this._queuedSingersProvider.delete(queuedSinger)

    const startIndex = this.getQueuedSongIndex(queuedSinger);

    this.queuedSingers.splice(startIndex, 1);
    this.selectedQueuedSinger = null;
  }

  async add(singer: Singer): Promise<void> {
    if(!singer?.id) return;

    for(let existingQueuedSinger of this.queuedSingers) {
      if(existingQueuedSinger?.singer?.id == singer.id) return;
    }

    var newQueuedSingerId = await this._queuedSingersProvider.create(singer);
    
    const queuedSinger = new QueuedSinger({
      id: newQueuedSingerId,
      singerId: singer.id,
      singer: singer
    });
    
    this.queuedSingers.push(queuedSinger);
  }

  async populateSingers(): Promise<void>
  {
    this.queuedSingers = await this._queuedSingersProvider.read();

    const singers = await this._singersProvider.getByIds(this.queuedSingers.map(qs => qs.singerId ?? 0));

    for(let queuedSinger of this.queuedSingers) {
      const singer = singers.find(s => s.id == queuedSinger.singerId) ?? null;

      if(!singer?.id) continue;

      queuedSinger.singer = singer

      console.info(queuedSinger);
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