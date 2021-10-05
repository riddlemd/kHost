import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Venue } from "../../models/Venue";
import { VenuesProvider } from "../VenuesProvider";

@Injectable()
export class MockVenuesProvider extends VenuesProvider {

    private _cache: Venue[] = [];

    private _nextVenueId = 0;

    constructor() {
        super();

        this._cache = this._generateVenues();
    }

    get(count: number = 20, offset: number = 0): Observable<Venue[]> {
        let venues = [...this._cache];
        return of(venues);
    }

    search(query: string, count: number = 20, offset: number = 0): Observable<Venue[]> {
        return this.get();
    }

    private _generateVenues(): Venue[] {
        let venues: Venue[] = [];

        for(let i = 0; i < 100; i++) {
            let venue = new Venue();
            venue.id = this._nextVenueId++;
            venue.name = (Math.random() + 1).toString(36).substring(7);

            venues.push(venue);
        }

        return venues;
    }
}