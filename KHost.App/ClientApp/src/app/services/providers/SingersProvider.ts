import { Injectable } from '@angular/core';
import { Venue } from '../../models/Venue';
import { Singer } from '../../models/Singer';

@Injectable()
export abstract class SingersProvider {

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