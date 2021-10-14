import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges } from '@angular/core';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import 'src/app/modules/kommon/collections/arrayExtensions';
import { Singer } from 'src/app/models/Singer';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';

@Component({
  selector: 'kh-queued-songs',
  templateUrl: './queued-songs.component.html',
  styleUrls: ['./queued-songs.component.scss']
})
export class QueuedSongsComponent implements OnChanges {
  
  @Input()
  selectedQueuedSinger: QueuedSinger | null = null;

  queuedSongs: QueuedSong[] | null = null;

  selectedQueuedSong: QueuedSong | null = null;

  constructor(
    private _queuedSongsProvider: QueuedSongsProvider,
    private _songsProvider: SongsProvider
  ) {
    
  }

  ngOnChanges() {
    if(!this.selectedQueuedSinger?.singer) return;

    this.getQueuedSongsAndSongsForQueuedSinger(this.selectedQueuedSinger)
      .then(queuedSongs => {
        this.queuedSongs = queuedSongs;
      });
  }

  getSongQueueCount(): number {
    return this.queuedSongs?.length ?? 0;
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
    for(let i = 0; i < this.getSongQueueCount(); i++) {
      if(this.queuedSongs![i].id === queuedSong.id) return i;
    }

    return -1;
  }

  protected async getQueuedSongsAndSongsForQueuedSinger(queuedSinger: QueuedSinger): Promise<QueuedSong[]> {
    const queuedSongs = await this._queuedSongsProvider.getByQueuedSinger(queuedSinger);

    const songs = await this._songsProvider.getByIds(queuedSongs.map(qs => qs.songId ?? 0));

    for(let queuedSong of queuedSongs) {
      queuedSong.song = songs.find(s => s.id == queuedSong.songId) ?? null;
      queuedSong.songId = queuedSong.song?.id ?? null;
    }

    return queuedSongs;
  }
}