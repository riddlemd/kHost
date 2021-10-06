import { Component, OnInit } from '@angular/core';
import { Venue } from '../kommon/models/Venue';
import { MockVenuesProvider } from '../kommon/providers/Mock/MockVenuesProvider';
import { VenuesProvider } from '../kommon/providers/VenuesProvider';

@Component({
  selector: 'kh-venues-manager',
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
