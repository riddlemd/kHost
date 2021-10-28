import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/dialogs/edit-model/edit-model.component';
import { Singer } from 'src/app/models/Singer';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';

@Component({
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.scss']
})
export class EditSingerComponent extends EditModelComponent<Singer, SingersProvider, EditSingerComponent> {

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Singer
    },
    provider: SingersProvider,
    dialogRef: MatDialogRef<EditSingerComponent>,
  ) {
    super(data, provider, dialogRef);
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
