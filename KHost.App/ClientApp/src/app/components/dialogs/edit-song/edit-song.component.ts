import { KeyValue } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/dialogs/edit-model/edit-model.component';
import { Song, SongState } from 'src/app/models/Song';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';

@Component({
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent extends EditModelComponent<Song, SongsProvider, EditSongComponent> {

  private _songStates: KeyValue<number, string>[];
  get songStates() { return this._songStates; }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Song
    },
    provider: SongsProvider,
    dialogRef: MatDialogRef<EditSongComponent>,
  ) {
    super(data, provider, dialogRef);

    this._songStates = this._getSongStates();
  }

  private _getSongStates(): KeyValue<number, string>[] {
    const states: KeyValue<number, string>[] = [];

    for(const state in SongState) {
      const songState: SongState = SongState[state as keyof typeof SongState];
      
      if(isNaN(songState)) continue;

      states.push({key: songState, value: state});
    }

    return states;
  }

  protected _createNewEntity(): Song {
    return new Song();
  }

  protected _createFormGroup(song: Song): FormGroup {
    return new FormGroup({
      'name': new FormControl(song?.name, Validators.required),
      'bandName': new FormControl(song?.bandName, Validators.required),
      'source': new FormControl(song?.source, Validators.required),
      'karaokeBrand': new FormControl(song?.karaokeBrand, Validators.required),
      'localPath': new FormControl(song?.localPath),
      'remotePath': new FormControl(song?.remotePath),
      'notes': new FormControl(song?.notes),
      'state': new FormControl(song?.state, Validators.required),
      'lengthInSeconds': new FormControl(song?.lengthInSeconds, Validators.required)
    });
  }
}
