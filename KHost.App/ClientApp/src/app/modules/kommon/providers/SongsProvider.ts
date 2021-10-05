import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/Song';

@Injectable()
export abstract class SongsProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Observable<Song[]> {
        throw("Not Implemented");
    }

    getBySingerId(id: number, count: number = 20, offset: number = 0): Observable<Song[]> {
        throw("Not Implemented");
    }

    search(query: string, count: number = 20, offset: number = 0): Observable<Song[]> {
        throw ("Not Implemented");
    }
}