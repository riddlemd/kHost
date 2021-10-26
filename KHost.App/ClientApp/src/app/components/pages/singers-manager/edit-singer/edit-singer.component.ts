import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/edit-model/edit-model.component';
import { Singer } from 'src/app/models/Singer';

@Component({
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.scss']
})
export class EditSingerComponent extends EditModelComponent<Singer, EditSingerComponent> {

  constructor(
    dialogRef: MatDialogRef<EditSingerComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Singer
    }
  ) {
    super(dialogRef, data);
  }

  protected _createNewEntity(): Singer {
    return new Singer();
  }

  protected _createFormGroup(singer: Singer): FormGroup {
    return new FormGroup({
      'name': new FormControl(singer?.name, Validators.required),
      'notes': new FormControl(singer?.notes)
    });
  }
}
