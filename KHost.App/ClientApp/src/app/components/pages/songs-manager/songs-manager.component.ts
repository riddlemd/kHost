import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Song, SongState } from 'src/app/models/Song';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { EditSongComponent } from '../../dialogs/edit-song/edit-song.component';

@Component({
  templateUrl: './songs-manager.component.html',
  styleUrls: ['./songs-manager.component.scss']
})
export class SongsManagerComponent implements OnInit {

  private _songs: Song[] = [];
  get songs(): Song[] { return this._songs; }

  private _form: FormGroup;
  get form(): FormGroup { return this._form; }

  private _searching: boolean = false;
  get searching() { return this._searching; }

  selectedSong?: Song;

  constructor(
    private _songsProvider: SongsProvider,
    private _dialog: MatDialog
  ) {
    this._form = new FormGroup({
      'query': new FormControl(undefined, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(): Promise<void> {
    this._searching = true;

    this._songs = await this._songsProvider.read();
  
    this._searching = false;
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    this._songs = [];

    if(query) {
      this._searching = true;

      this._songs = await this._songsProvider.search(query);

      this._searching = false;

      return;
    }

    this.getAll();
  }

  async openEditSongDialog(song?: Song): Promise<void> {
    const isNew = song === undefined;

    const config = {
      data: {
        entity: song
      },
      minWidth: '50vw'
    };

    const dialogRef = this._dialog.open(EditSongComponent, config);

    song = await dialogRef.afterClosed().toPromise();

    if(!song) return;
          
    if(!isNew) return;

    this._songs.push(song);
  }

  async openDeleteSongDialog(song: Song): Promise<void> {
    if(song.id === 1) return;

    const config = {
      data: {
        title: 'Delete Song',
        message: `Are you sure you want to delete ${song.name} by ${song.bandName}?`
      }
    };

    const dialogRef = this._dialog.open(ConfirmComponent, config);

    const confirm = await dialogRef.afterClosed().toPromise();

    if(!confirm) return;

    await this._songsProvider.delete(song);
    
    this._songs.remove(song);
  }
}
