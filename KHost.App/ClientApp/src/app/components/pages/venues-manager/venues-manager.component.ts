import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';

@Component({
  templateUrl: './venues-manager.component.html',
  styleUrls: ['./venues-manager.component.scss']
})
export class VenuesManagerComponent implements OnInit {

  private _venues: Venue[] = [];
  get venues(): Venue[] { return this._venues };

  private _form: FormGroup;
  get form(): FormGroup { return this._form; }

  selectedVenue?: Venue;

  constructor(
    private _venuesProvider: VenuesProvider,
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
    this._venuesProvider.read()
      .then(value => { this._venues = value; });
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    if(query) {
      this._venuesProvider.search(query)
        .then(value => { this._venues = value; });
      return;
    }

    this.getAll();
  }

  async openEditVenueDialog(venue?: Venue): Promise<void> {
    const isNew = venue === undefined;

    const config = {
      data: {
        entity: venue
      }
    };

    const dialogRef = this._dialog.open(EditVenueComponent, config);

    dialogRef
      .afterClosed()
        .subscribe(venue => {
          if(!venue) return;

          venue.id
            ? this._venuesProvider.update(venue)
            : this._venuesProvider.create(venue);

          if(!isNew) return;

          this._venues.push(venue);
    });
  }

  async openDeleteVenueDialog(venue: Venue): Promise<void> {
    if(venue.id === 1) return;

    const config = {
      data: {
        title: 'Delete Venue',
        message: `Are you sure you want to delete ${venue.name}?`
      }
    };

    const dialogRef = this._dialog.open(ConfirmComponent, config);

    dialogRef
      .afterClosed()
        .subscribe(async confirm => {
          if(!confirm) return;

          await this._venuesProvider.delete(venue);
          this._venues.remove(venue);
    });
  }
}
