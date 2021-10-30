import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges } from '@angular/core';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import 'src/app/modules/kommon/collections/arrayExtensions';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';
import { EditSongComponent } from 'src/app/components/dialogs/edit-song/edit-song.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/dialogs/confirm/confirm.component';

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

  private _loading: boolean = false
  get loading() { return this._loading; }

  selectedQueuedSong?: QueuedSong;

  constructor(
    private _queuedSongsProvider: QueuedSongsProvider,
    private _songsProvider: SongsProvider,
    private _dialog: MatDialog
  ) {
    this._queuedSongsProvider.created.subscribe(queuedSong => {
      if(!this.selectedQueuedSinger) return;

      this.selectedQueuedSinger.queuedSongsCount++;
      
      this.loadQueuedSongsAndSongsForSelectedQueuedSinger();
    });
  }

  ngOnChanges() {
    this.loadQueuedSongsAndSongsForSelectedQueuedSinger();
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

  async openEditSongDialog(): Promise<void> {
    if(!this.selectedQueuedSong) return;

    const config = {
      data: {
        entity: this.selectedQueuedSong.song
      },
      minWidth: '50vw'
    };

    const dialogRef = this._dialog.open(EditSongComponent, config);

    await dialogRef.afterClosed().toPromise();
  }

  async openRemoveQueuedSongDialog(queuedSong: QueuedSong): Promise<void> {
    const config = {
      data: {
        title: 'Remove Queued Song',
        message: `Are you sure you want to remove ${queuedSong.song?.name} from the queue?`
      }
    };

    const dialogRef = this._dialog.open(ConfirmComponent, config);

    const confirm = await dialogRef.afterClosed().toPromise();
          
    if(!confirm) return;

    const result = await this._queuedSongsProvider.delete(queuedSong);

    const startIndex = this._getQueuedSongIndex(queuedSong);

    this.queuedSongs.splice(startIndex, 1);
    
    this.selectedQueuedSong = undefined;

    if(this.selectedQueuedSinger)
      this.selectedQueuedSinger.queuedSongsCount--;
  }

  protected _getQueuedSongIndex(queuedSong: QueuedSong): number {    
    for(let i = 0; i < this.getSongQueueCount(); i++) {
      if(this.queuedSongs![i].id === queuedSong.id) return i;
    }

    return -1;
  }

  protected async loadQueuedSongsAndSongsForSelectedQueuedSinger(): Promise<void> {
    if(!this.selectedQueuedSinger?.singer) return;

    this._loading = true;

    this._queuedSongs = [];

    const queuedSongs = await this._queuedSongsProvider.getByQueuedSinger(this.selectedQueuedSinger);

    if(!queuedSongs.length) {
      this._loading = false;
      return;
    }

    const songs = await this._songsProvider.findByIds(queuedSongs.map(qs => qs.songId ?? 0));

    for(let queuedSong of queuedSongs) {
      const song = songs.find(s => s.id == queuedSong.songId) ?? undefined;

      if(!song?.id) continue;

      queuedSong.song = song;
      queuedSong.songId = song.id;
    }

    this._queuedSongs = queuedSongs.filter(qs => qs.song != undefined);

    this._loading = false;
  }
}
