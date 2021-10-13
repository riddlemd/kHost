import { Injectable } from "@angular/core";
import { Venue } from "src/app/models/Venue";
import { VenuesProvider } from "../VenuesProvider";

@Injectable()
export class MockVenuesProvider extends VenuesProvider {

    private _cache: Venue[] = [];

    constructor() {
        super();

        this._generateVenues();
    }

    get(count: number = 20, offset: number = 0): Promise<Venue[]> {
        console.info(`Getting Venues (Count:${count}, Offset:${offset})`);

        const venues = this._cache
            .slice(offset, count);
        
        return new Promise((resolve, reject) => {
            resolve(venues);
        });
    }

    search(query: string, count: number = 20, offset: number = 0): Promise<Venue[]> {
        console.info(`Searching Venues (Query:"${query}", Count:${count}, Offset:${offset})`);

        const venues = this._cache
            .filter(s => s.name.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(venues);
        })
    }

    // CRUD Methods

    create(venue: Venue): Promise<number> {
        throw new Error("Method not implemented.");
    }

    update(venue: Venue): Promise<void> {
        throw new Error("Method not implemented.");
    }

    read(count?: number, offset?: number): Promise<Venue[]> {
        console.info(`Reading Venues (Count:${count}, Offset:${offset})`);

        const venues = this._cache
            .slice(offset, count);
        
        return new Promise((resolve, reject) => {
            resolve(venues);
        });
    }

    delete(venue: Venue): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async _generateVenues(): Promise<void> {
        console.info(`Generating Venues`);
        
        this._cache = [];

        for(let i = 0; i < 100; i++) {
            
            const venue = new Venue();
            venue.id = i;
            venue.name = (Math.random() + 1).toString(36).substring(7);

            this._cache.push(venue);
        }
    }
}