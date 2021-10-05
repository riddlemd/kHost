import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from '../../kommon/models/Venue';
import { Singer } from '../../kommon/models/Singer';

@Injectable()
export abstract class SingersProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Observable<Singer[]> {
        throw("Not Implemented");
    }

    getBySingerId(id: number, count: number = 20, offset: number = 0): Observable<Singer[]> {
        throw("Not Implemented");
    }

    search(query: string, venue: Venue|null = null, count: number = 20, offset: number = 0): Observable<Singer[]> {
        throw("Not Implemented");
    }
}