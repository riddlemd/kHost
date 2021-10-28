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

  private _queuedSongs: QueuedSong[] = [];
  get queuedSongs() { return this._queuedSongs; }

  selectedQueuedSong?: QueuedSong;

  constructor(
    private _queuedSongsProvider: QueuedSongsProvider,
    private _songsProvider: SongsProvider
  ) {
    this._queuedSongsProvider.created.subscribe(queuedSong => {
      if(!this.selectedQueuedSinger) return;

      this.selectedQueuedSinger.queuedSongsCount++;
      
      this.loadQueuedSongsForSelectedQueuedSinger();
    });
  }

  ngOnChanges() {
    this.loadQueuedSongsForSelectedQueuedSinger();
  }

  async loadQueuedSongsForSelectedQueuedSinger(): Promise<void> {
    if(!this.selectedQueuedSinger?.singer) return;

    this._queuedSongs = []

    if(this.selectedQueuedSinger.queuedSongsCount <= 0) return;

    this._queuedSongs = await this.getQueuedSongsAndSongsForQueuedSinger(this.selectedQueuedSinger);
  }

  getSongQueueCount(): number {
    return this.queuedSongs?.length ?? 0;
  }

  async drop(e: CdkDragDrop<string[]>): Promise<void> {
    if(e.currentIndex == e.previousIndex) return;

    const nextIndex = e.currentIndex + 1;

    this.queuedSongs.move(e.previousIndex, e.currentIndex);

    const queuedSong = this.queuedSongs[e.currentIndex];

    if(nextIndex >= this.queuedSongs.length) {
      await this._queuedSongsProvider.moveToBottom(queuedSong);
      return;
    }
    else if(e.currentIndex <= 0) {
      await this._queuedSongsProvider.moveToTop(queuedSong);
      return;
    }

    var nextQueuedSinger = this.queuedSongs[e.currentIndex + 1]

    await this._queuedSongsProvider.moveTo(queuedSong, e.currentIndex);
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

    if(this.selectedQueuedSinger)
      this.selectedQueuedSinger.queuedSongsCount--;
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

    const songs = await this._songsProvider.findByIds(queuedSongs.map(qs => qs.songId ?? 0));

    for(let queuedSong of queuedSongs) {
      const song = songs.find(s => s.id == queuedSong.songId) ?? undefined;

      if(!song?.id) continue;

      queuedSong.song = song;
      queuedSong.songId = song.id;
    }

    return queuedSongs;
  }
}
