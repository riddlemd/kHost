import { Injectable } from "@angular/core";
import { Venue } from "src/app/models/Venue";

@Injectable()
export class VenuesProvider {

    search(query: string, count?: number, offset?: number): Promise<Venue[]> {
        throw("Not Implemented");
    }

    findById(id: number): Promise<Venue | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Venue[]> {
        throw("Not Implemented");
    }

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