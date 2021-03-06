import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Singer } from 'src/app/models/Singer';
import { QueuedSingersProvider } from 'src/app/services/providers/QueuedSingersProvider';
import { MatDialog } from '@angular/material/dialog';
import { AddSingerComponent } from '../../../dialogs/add-singer/add-singer.component';
import { Venue } from 'src/app/models/Venue';
import { SingerPerformanceHistoryComponent } from '../../../dialogs/singer-performance-history/singer-performance-history.component';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';
import { ConfirmComponent } from 'src/app/components/dialogs/confirm/confirm.component';

@Component({
  selector: 'kh-queued-singers',
  templateUrl: './queued-singers.component.html',
  styleUrls: ['./queued-singers.component.scss']
})
export class QueuedSingersComponent implements OnInit {

  private _selectedQueuedSinger?: QueuedSinger;
  set selectedQueuedSinger(value: QueuedSinger | undefined) { 
    this._selectedQueuedSinger = value;
    this.selectedQueuedSingerChange.emit(value);
  }
  get selectedQueuedSinger() { return this._selectedQueuedSinger };

  @Input()
  currentVenue?: Venue;
  
  @Output()
  selectedQueuedSingerChange = new EventEmitter<QueuedSinger | undefined>();

  private _queuedSingers: QueuedSinger[] = [];
  get queuedSingers() { return this._queuedSingers; }

  private _loading: boolean = false
  get loading() { return this._loading; }

  constructor(
    private _queuedSingersProvider: QueuedSingersProvider,
    private _singersProvider: SingersProvider,
    private _dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.populateSingers();
  }

  async drop(e: CdkDragDrop<string[]>): Promise<void> {
    if(e.currentIndex == e.previousIndex) return;

    const nextIndex = e.currentIndex + 1;

    this.queuedSingers.move(e.previousIndex, e.currentIndex);

    const queuedSinger = this.queuedSingers[e.currentIndex];

    if(nextIndex >= this.queuedSingers.length) {
      await this._queuedSingersProvider.moveToBottom(queuedSinger);
      return;
    }
    else if(e.currentIndex <= 0) {
      await this._queuedSingersProvider.moveToTop(queuedSinger);
      return;
    }

    await this._queuedSingersProvider.moveTo(queuedSinger, e.currentIndex);
  }

  async moveToTop(queuedSinger: QueuedSinger): Promise<void> {
    await this._queuedSingersProvider.moveToTop(queuedSinger);

    this.queuedSingers.moveToStart(queuedSinger);
  }

  async moveUp(queuedSinger: QueuedSinger): Promise<void> {
    await this._queuedSingersProvider.moveUp(queuedSinger);
    
    this.queuedSingers.moveTowardStart(queuedSinger);
  }

  async moveDown(queuedSinger: QueuedSinger): Promise<void> {
    await this._queuedSingersProvider.moveDown(queuedSinger);
    
    this.queuedSingers.moveTowardEnd(queuedSinger);
  }

  async moveToBottom(queuedSinger: QueuedSinger): Promise<void> {
    await this._queuedSingersProvider.moveToBottom(queuedSinger);
    
    this.queuedSingers.moveToEnd(queuedSinger);
  }

  async add(singer: Singer): Promise<void> {
    if(!singer?.id) return;

    const existingQueuedSinger = this._getQueuedSingerWithSinger(singer);

    if(existingQueuedSinger) {
      this.selectedQueuedSinger = existingQueuedSinger;
      return;
    }

    const newQueuedSinger = new QueuedSinger();
    newQueuedSinger.singerId = singer.id;
    newQueuedSinger.singer = singer;
    newQueuedSinger.position = this._getNextPositionInQueue();

    newQueuedSinger.id = await this._queuedSingersProvider.create(newQueuedSinger);

    this.queuedSingers.push(newQueuedSinger);

    this.selectedQueuedSinger = newQueuedSinger;
  }

  async populateSingers(): Promise<void>
  {
    this._loading = true;

    this._queuedSingers = await this._queuedSingersProvider.read();

    if(!this._queuedSingers.length) {
      this._loading = false;
      return;
    }

    const singers = await this._singersProvider.findByIds(this.queuedSingers.map(qs => qs.singerId ?? 0));

    for(let queuedSinger of this.queuedSingers) {
      const singer = singers.find(s => s.id == queuedSinger.singerId) ?? undefined;

      if(!singer?.id) continue;

      queuedSinger.singer = singer
    }

    this._loading = false;
  }

  async openAddSingerDialog(): Promise<void> {
    const config = {
      data: {
        currentVenue: this.currentVenue
      }
    };

    const dialogRef = this._dialog.open(AddSingerComponent);

    const singer = await dialogRef.afterClosed().toPromise();

    if(!singer) return;

    this.add(singer);
  }

  async openSingerPerformanceHistoryDialog(): Promise<void> {
    const config = {
      data: {
        selectedQueuedSinger: this.selectedQueuedSinger
      },
      minWidth: '60vw'
    };

    const dialogRef = this._dialog.open(SingerPerformanceHistoryComponent, config);

    const song = await dialogRef.afterClosed().toPromise();

    if(!song) return;
  }

  async openRemoveQueuedSingerDialog(queuedSinger: QueuedSinger): Promise<void> {
    const config = {
      data: {
        title: 'Remove Queued Singer',
        message: `Are you sure you want to remove ${queuedSinger.singer?.name} from the queue?`
      }
    };

    const dialogRef = this._dialog.open(ConfirmComponent, config);

    const confirm = await dialogRef.afterClosed().toPromise();
          
    if(!confirm) return;

    const result = await this._queuedSingersProvider.delete(queuedSinger)

    const startIndex = this._getQueuedSingerIndex(queuedSinger);

    this.queuedSingers.splice(startIndex, 1);
    
    this.selectedQueuedSinger = undefined;
  }

  protected _getQueuedSingerIndex(queuedSinger: QueuedSinger): number {
    for(let i = 0; i < this.queuedSingers.length; i++) {
      if(this.queuedSingers[i].id === queuedSinger.id) return i;
    }

    return -1;
  }

  protected _getQueuedSingerWithSinger(singer: Singer): QueuedSinger | undefined {
    for(let queuedSinger of this._queuedSingers) {
      if(queuedSinger.singer?.id === singer.id) return queuedSinger;
    }

    return undefined;
  }

  protected _getNextPositionInQueue(): number {
    return Math.max.apply(Math, this._queuedSingers.map(function(qs) { return qs.position; })) + 1;
  }

  protected _reorderQueuedSingers(): void {
    this._queuedSingers.sort((a, b) => {
      return a.position > b.position ? 1 : -1
    });
  }
}
