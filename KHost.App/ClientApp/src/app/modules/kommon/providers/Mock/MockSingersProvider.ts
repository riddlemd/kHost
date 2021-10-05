import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Venue } from "src/app/modules/kommon/models/Venue";
import { Singer } from "../../../kommon/models/Singer";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class MockSingersProvider extends SingersProvider {
    
    private _cache: Singer[] = [];

    private _nextSingerId: number = 1;

    constructor() {
        super();
        this._cache = this._generateSingers();
    }

    get(count: number = 20, offset: number = 0): Observable<Singer[]> {
        let singers:Singer[] = [...this._cache];
        return of(singers);
    }

    getById(id: number, count: number = 20, offset: number = 0): Observable<Singer|null> {
        for(let singer of this._cache) {
            if(singer.id === id) return of(singer);
        }

        return of(null);
    }

    search(query: string, venue: Venue|null = null, count: number = 20, offset: number = 0): Observable<Singer[]> {
        let songs = this._cache.filter(s => s.name.substring(0, query.length) === query);

        return of(songs);
    }

    private _generateSingers(): Singer[] {
        let singers:Singer[] = [];

        for(var i = 0; i < 15; i++)
        {
            let singer = new Singer();
            singer.id = this._nextSingerId++;
            singer.name = (Math.random() + 1).toString(36).substring(7);

            singers.push(singer);
        }

        return singers;
    }
}
