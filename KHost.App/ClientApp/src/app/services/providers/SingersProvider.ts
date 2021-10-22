import { Injectable } from '@angular/core';
import { Venue } from 'src/app/models/Venue';
import { Singer } from 'src/app/models/Singer';

@Injectable()
export abstract class SingersProvider {

    findById(id: number): Promise<Singer | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Singer[]> {
        throw("Not Implemented");
    }

    search(query: string, venue?: Venue, count?: number, offset?: number): Promise<Singer[]> {
        throw("Not Implemented");
    }

    // CRUD Methods

    create(singer: Singer): Promise<number> {
        throw("Not Implemented");
    }

    update(singer: Singer): Promise<void> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<Singer[]> {
        throw("Not Implemented");
    }

    delete(singer: Singer): Promise<void> {
        throw("Not Implemented");
    }
}
