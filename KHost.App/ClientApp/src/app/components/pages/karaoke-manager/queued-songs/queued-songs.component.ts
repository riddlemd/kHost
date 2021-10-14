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
  selectedQueuedSinger?: QueuedSinger;

  queuedSongs: QueuedSong[] = [];

  selectedQueuedSong?: QueuedSong;

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
      })
      .catch(() => {
        this.queuedSongs = [];
      });
  }

  getSongQueueCount(): number {
    return this.queuedSongs?.length ?? 0;
  }

  drop(e: CdkDragDrop<string[]>): void {
    this.queuedSongs.move(e.previousIndex, e.currentIndex);
  }

  async moveToTop(queuedSong: QueuedSong): Promise<void> {
    const result = await this._queuedSongsProvider.moveToTop(queuedSong)
    
    this.queuedSongs.moveToStart(queuedSong);
  }

  async moveUp(queuedSong: QueuedSong): Promise<void> {
    const result = await this._queuedSongsProvider.moveUp(queuedSong)
    
    this.queuedSongs.moveTowardStart(queuedSong);
  }

  async moveDown(queuedSong: QueuedSong): Promise<void> {
    const result = await this._queuedSongsProvider.moveDown(queuedSong);
    
    this.queuedSongs.moveTowardEnd(queuedSong);
  }

  async moveToBottom(queuedSong: QueuedSong): Promise<void> {
    const result = await this._queuedSongsProvider.moveToBottom(queuedSong)
     
    this.queuedSongs.moveToEnd(queuedSong);
  }

  async remove(queuedSong: QueuedSong): Promise<void> {
    const result = await this._queuedSongsProvider.delete(queuedSong);
    
    const startIndex = this.getQueuedSongIndex(queuedSong);
    this.queuedSongs.splice(startIndex, 1);
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
      const song = songs.find(s => s.id == queuedSong.songId) ?? undefined;

      if(!song?.id) continue;

      queuedSong.song = song;
      queuedSong.songId = song.id;
    }

    return queuedSongs;
  }
}