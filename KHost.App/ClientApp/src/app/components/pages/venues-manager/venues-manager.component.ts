import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';

@Component({
  templateUrl: './venues-manager.component.html',
  styleUrls: ['./venues-manager.component.scss']
})
export class VenuesManagerComponent implements OnInit {

  venues: Venue[] = [];

  private _selectedVenue: Venue|null = null;
  get selectedVenue() { return this._selectedVenue; }
  set selectedVenue(venue: Venue|null) {this._selectedVenue = venue; }

  constructor(private _venuesProvider: VenuesProvider) { }

  ngOnInit(): void {
    this._venuesProvider.get()
      .then(value => { this.venues = value; });
  }

}
