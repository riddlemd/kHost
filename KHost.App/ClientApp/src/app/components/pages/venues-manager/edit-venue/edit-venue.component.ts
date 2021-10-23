import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';

@Component({
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.scss']
})
export class EditVenueComponent {

  private _venue: Venue;

  private _form: FormGroup;
  get form(): FormGroup { return this._form };

  constructor(
    private _dialogRef: MatDialogRef<EditVenueComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
       venue: Venue
    }
  ) {
    this._venue = data.venue ?? new Venue();

    this._form = new FormGroup({
      'name': new FormControl(this._venue?.name, Validators.required),
      'address': new FormControl(this._venue?.address)
    });
  }

  public isNew(): boolean {
    return this._venue.id === undefined;
  }

  public async save(): Promise<void> {
    this._venue.name = this._form.get("name")?.value;
    this._venue.address = this._form.get("address")?.value;

    this._dialogRef.close(this._venue);
  } 
}
