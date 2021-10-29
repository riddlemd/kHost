import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Venue } from "src/app/models/Venue";
import { CrudProvider } from "./CrudProvider";

@Injectable()
export class VenuesProvider implements CrudProvider<Venue> {

    search(query: string, count?: number, offset?: number): Promise<Venue[]> {
        throw("Not Implemented");
    }

    findById(id: number): Promise<Venue | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Venue[]> {
        throw("Not Implemented");
    }

    // Events

    created: Observable<Venue> = (() => { throw("Not Implemented") })();

    updated: Observable<Venue> = (() => { throw("Not Implemented") })();
    
    deleted: Observable<Venue> = (() => { throw("Not Implemented") })();

    // CRUD Methods

    create(venue: Venue): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<Venue[]> {
        throw("Not Implemented");
    }

    update(venue: Venue): Promise<void> {
        throw("Not Implemented");
    }
    
    delete(venue: Venue): Promise<void> {
        throw("Not Implemented");
    }
}