import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';

@Component({
  templateUrl: './venues-manager.component.html',
  styleUrls: ['./venues-manager.component.scss']
})
export class VenuesManagerComponent implements OnInit {

  venues: Venue[] = [];

  selectedVenue?: Venue;

  constructor(private _venuesProvider: VenuesProvider) { }

  ngOnInit(): void {
    this._venuesProvider.read()
      .then(value => { this.venues = value; });
  }

}
