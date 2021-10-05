import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { queue } from 'rxjs';
import { QueuedSong } from 'src/app/modules/karaoke/models/QueuedSong';
import { QueuedSinger } from '../../models/QueuedSinger';
import { QueuedSongsProvider } from '../../providers/QueuedSongsProvider';

@Component({
  selector: 'kh-queued-songs',
  templateUrl: './queued-songs.component.html',
  styleUrls: ['./queued-songs.component.scss']
})
export class QueuedSongsComponent {
  @Input() selectedQueuedSinger: QueuedSinger|null = null;

  selectedQueuedSong: QueuedSong|null = null;

  constructor(private _queuedSongsProvider: QueuedSongsProvider) {
    
  }

  getQueueLength(): number {
    return this.selectedQueuedSinger?.singer?.queuedSongs.length ?? 0;
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.selectedQueuedSinger?.singer?.queuedSongs.move(e.previousIndex, e.currentIndex);
  }

  moveToTop(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveToTop(queuedSong)
      .subscribe(
        value => {
          if(!value) return;

          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.move(startIndex, 0);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  moveUp(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveUp(queuedSong)
      .subscribe(
        value => {
          if(!value) return;
          
          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.move(startIndex, startIndex - 1);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );


  }

  moveDown(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveDown(queuedSong)
      .subscribe(
        value => {
          if(!value) return;
          
          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.move(startIndex, startIndex + 1);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  moveToBottom(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.moveDown(queuedSong)
      .subscribe(
        value => {
          if(!value) return;
          
          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.move(startIndex, this.selectedQueuedSinger?.singer?.queuedSongs.length);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
      );
  }

  remove(queuedSong: QueuedSong): void {
    this._queuedSongsProvider.remove(queuedSong)
      .subscribe(
        value => {
          if(!value) return;

          let startIndex = this.getQueuedSongIndex(queuedSong);
          this.selectedQueuedSinger?.singer?.queuedSongs.splice(startIndex, 1);
        },
        error => { alert('Unable to communicate with kHost local server.'); }
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