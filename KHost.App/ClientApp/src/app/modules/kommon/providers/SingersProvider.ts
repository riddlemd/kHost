import { Injectable } from '@angular/core';
import { Venue } from '../../kommon/models/Venue';
import { Singer } from '../../kommon/models/Singer';

@Injectable()
export abstract class SingersProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Promise<Singer[]> {
        throw("Not Implemented");
    }

    getById(id: number): Promise<Singer|null> {
        throw("Not Implemented");
    }

    search(query: string, venue: Venue|null = null, count: number = 20, offset: number = 0): Promise<Singer[]> {
        throw("Not Implemented");
    }
}