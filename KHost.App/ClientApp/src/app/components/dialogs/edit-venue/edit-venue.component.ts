import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModelComponent } from 'src/app/components/dialogs/edit-model/edit-model.component';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';

@Component({
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.scss']
})

export class EditVenueComponent extends EditModelComponent<Venue, VenuesProvider, EditVenueComponent>{

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
       entity: Venue
    },
    provider: VenuesProvider,
    dialogRef: MatDialogRef<EditVenueComponent>,
  ) {
    super(data, provider, dialogRef);
  }

  protected _createNewEntity(): Venue {
    return new Venue();
  }

  protected _createFormGroup(venue: Venue): FormGroup {
    return new FormGroup({
      'name': new FormControl(venue?.name, Validators.required),
      'notes': new FormControl(venue?.notes)
    });
  }
}
