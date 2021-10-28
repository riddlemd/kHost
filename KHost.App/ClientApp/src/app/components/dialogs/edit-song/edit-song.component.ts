import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/edit-model/edit-model.component';
import { Song } from 'src/app/models/Song';

@Component({
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent extends EditModelComponent<Song, EditSongComponent> {

  constructor(
    dialogRef: MatDialogRef<EditSongComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Song
    }
  ) {
    super(dialogRef, data);
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
