import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/edit-model/edit-model.component';
import { Venue } from 'src/app/models/Venue';

@Component({
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.scss']
})

export class EditVenueComponent extends EditModelComponent<Venue, EditVenueComponent>{

  constructor(
    dialogRef: MatDialogRef<EditVenueComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Venue
    }
  ) {
    super(dialogRef, data);
  }

  protected _createNewEntity(): Venue {
    return new Venue();
  }

  protected _createFormGroup(venue: Venue): FormGroup {
    return new FormGroup({
      'name': new FormControl(venue.name, Validators.required)
    });
  }
}
