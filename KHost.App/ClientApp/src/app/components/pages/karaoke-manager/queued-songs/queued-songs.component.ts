import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import 'src/app/modules/kommon/collections/arrayExtensions';

@Component({
  selector: 'kh-queued-songs',
  templateUrl: './queued-songs.component.html',
  styleUrls: ['./queued-songs.component.scss']
})
export class QueuedSongsComponent {
  
  @Input()
  selectedQueuedSinger: QueuedSinger|null = null;

  selectedQueuedSong: QueuedSong|null = null;

  constructor(private _queuedSongsProvider: QueuedSongsProvider) {
    
  }

  getSongQueueCount(): number {
    return this.selectedQueuedSinger?.singer?.queuedSongs.length ?? 0;
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.selectedQueuedSinger?.singer?.queuedSongs.move(e.previousIndex, e.currentIndex);
  }

  moveToTop(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveToTop(queuedSong)
      .then(
        value => {
          this.selectedQueuedSinger?.singer?.queuedSongs.moveToStart(queuedSong);
        }
      );
  }

  moveUp(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveUp(queuedSong)
      .then(
        value => {
          this.selectedQueuedSinger?.singer?.queuedSongs.moveTowardStart(queuedSong);
        }
      );


  }

  moveDown(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveDown(queuedSong)
      .then(
        value => {
          this.selectedQueuedSinger?.singer?.queuedSongs.moveTowardEnd(queuedSong);
        }
      );
  }

  moveToBottom(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveToBottom(queuedSong)
      .then(
        value => {
          this.selectedQueuedSinger?.singer?.queuedSongs.moveToEnd(queuedSong);
        }
      );
  }

  remove(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.delete(queuedSong)
      .then(
        value => {
          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.splice(startIndex, 1);
        }
      );
  }

  selectQueuedSong(queuedSong:QueuedSong): void {
    this.selectedQueuedSong = queuedSong;
  }

  protected getQueuedSongIndex(queuedSong: QueuedSong): number {
    let queueLength = this.selectedQueuedSinger?.singer?.queuedSongs.length ?? 0;
    
    for(let i = 0; i < queueLength; i++) {
      if(this.selectedQueuedSinger?.singer?.queuedSongs[i].id === queuedSong.id) return i;
    }

    return -1;
  }
}