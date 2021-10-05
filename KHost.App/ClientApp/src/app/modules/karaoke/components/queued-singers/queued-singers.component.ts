import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueuedSinger } from 'src/app/modules/karaoke/models/QueuedSinger';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Singer } from 'src/app/modules/kommon/models/Singer';
import { QueuedSingersProvider } from '../../providers/QueuedSingersProvider';
import { QueuedSongsProvider } from '../../providers/QueuedSongsProvider';
import { MatDialog } from '@angular/material/dialog';
import { AddSingerComponent } from '../add-singer/add-singer.component';
import { Venue } from 'src/app/modules/kommon/models/Venue';

@Component({
  selector: 'kh-queued-singers',
  templateUrl: './queued-singers.component.html',
  styleUrls: ['./queued-singers.component.scss']
})
export class QueuedSingersComponent implements OnInit {
  @Input() selectedQueuedSinger: QueuedSinger|null = null;
  @Input() currentVenue: Venue|null = null;
  @Output() selectedQueuedSingerChange = new EventEmitter<QueuedSinger|null>();

  queuedSingers: QueuedSinger[] = []

  constructor(
    private _queuedSingersProvider: QueuedSingersProvider,
    private _queuedSongsProvider: QueuedSongsProvider,
    private _addSingerDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.populateSingers();
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.queuedSingers.move(e.previousIndex, e.currentIndex);
  }

  moveToTop(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveToTop(queuedSinger)
      .subscribe(
        value => {
          if(!value) return;

          this.queuedSingers.moveToStart(queuedSinger);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  moveUp(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveUp(queuedSinger)
      .subscribe(
        value => {
          if(!value) return;

          this.queuedSingers.moveTowardStart(queuedSinger);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  moveDown(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveDown(queuedSinger)
      .subscribe(
        value => {
          if(!value) return;

          this.queuedSingers.moveTowardEnd(queuedSinger);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  moveToBottom(queuedSinger: QueuedSinger): void {
    this._queuedSingersProvider.moveDown(queuedSinger)
      .subscribe(
        value => {
          if(!value) return;

          this.queuedSingers.moveToEnd(queuedSinger);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  remove(queuedSinger: QueuedSinger): void {
    let startIndex = this.getQueuedSongIndex(queuedSinger);

    this._queuedSingersProvider.remove(queuedSinger)
      .subscribe(
        value => {
          if(!value) return;

          this.queuedSingers.splice(startIndex, 1);
          this.selectQueuedSinger(null);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  add(singer: Singer): void {
    for(let existingQueuedSinger of this.queuedSingers) {
      if(existingQueuedSinger?.singer?.id == singer.id) return;
    }

    this._queuedSingersProvider.add(singer)
      .subscribe(
        value => {
          if(!value) return;
          
          this.queuedSingers.push(value);
         },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  selectQueuedSinger(queuedSinger: QueuedSinger | null): void {
    this.selectedQueuedSingerChange.emit(queuedSinger);
  }

  populateSingers(): void
  {
    this._queuedSingersProvider.get()
      .subscribe(
        value => { 
          this.queuedSingers = value;

          for(let queuedSinger of this.queuedSingers) {
            if(queuedSinger.singer === null) continue;
            
            this._queuedSongsProvider.getBySinger(queuedSinger.singer).subscribe(
              value => {
                if(queuedSinger.singer !== null)
                  queuedSinger.singer.queuedSongs = value;
              }
            );
          }
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  openAddSingerDialog(): void {
    const dialogRef = this._addSingerDialog.open(AddSingerComponent);
    dialogRef.componentInstance.currentVenue = this.currentVenue;

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