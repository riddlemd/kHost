import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { EditVenueComponent } from '../../dialogs/edit-venue/edit-venue.component';

@Component({
  templateUrl: './venues-manager.component.html',
  styleUrls: ['./venues-manager.component.scss']
})
export class VenuesManagerComponent implements OnInit {

  private _venues: Venue[] = [];
  get venues(): Venue[] { return this._venues };

  private _form: FormGroup;
  get form(): FormGroup { return this._form; }

  private _searching: boolean = false;
  get searching() { return this._searching; }

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
    this._searching = true;

    this._venues = await this._venuesProvider.read();

    this._searching = false;
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    this._venues = [];

    if(query) {
      this._searching = true;

      this._venues = await this._venuesProvider.search(query);
      
      this._searching = false;

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

    venue = await dialogRef.afterClosed().toPromise();

    if(!venue) return;

    if(!isNew) return;

    this._venues.push(venue);
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

    const confirm = await dialogRef.afterClosed().toPromise();
          
    if(!confirm) return;

    await this._venuesProvider.delete(venue);

    this._venues.remove(venue);
  }
}
