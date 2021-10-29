import { Injectable } from '@angular/core';
import { Venue } from 'src/app/models/Venue';
import { Singer } from 'src/app/models/Singer';
import { CrudProvider } from './CrudProvider';
import { Observable } from 'rxjs';

@Injectable()
export abstract class SingersProvider implements CrudProvider<Singer> {

    search(query: string, venue?: Venue, count?: number, offset?: number): Promise<Singer[]> {
        throw("Not Implemented");
    }

    findById(id: number): Promise<Singer | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Singer[]> {
        throw("Not Implemented");
    }

    // Events

    created: Observable<Singer> = (() => { throw("Not Implemented") })();

    updated: Observable<Singer> = (() => { throw("Not Implemented") })();
    
    deleted: Observable<Singer> = (() => { throw("Not Implemented") })();

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
