import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { EditSongComponent } from './edit-song/edit-song.component';

@Component({
  templateUrl: './songs-manager.component.html',
  styleUrls: ['./songs-manager.component.scss']
})
export class SongsManagerComponent implements OnInit {

  private _songs: Song[] = [];
  get songs(): Song[] { return this._songs; }

  private _form: FormGroup;
  get form(): FormGroup { return this._form; }

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
    this._songsProvider.read()
      .then(value => { this._songs = value; });
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    if(query) {
      this._songsProvider.search(query)
        .then(value => { this._songs = value; });
      return;
    }

    this.getAll();
  }

  async openEditSongDialog(song?: Song): Promise<void> {
    const isNew = song === undefined;

    const config = {
      data: {
        entity: song
      }
    };

    const dialogRef = this._dialog.open(EditSongComponent, config);

    dialogRef
      .afterClosed()
        .subscribe(song => {
          if(!song) return;

          song.id
            ? this._songsProvider.update(song)
            : this._songsProvider.create(song);

          if(!isNew) return;

          this._songs.push(song);
    });
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

    dialogRef
      .afterClosed()
        .subscribe(async confirm => {
          if(!confirm) return;

          await this._songsProvider.delete(song);
          this._songs.remove(song);
    });
  }
}
