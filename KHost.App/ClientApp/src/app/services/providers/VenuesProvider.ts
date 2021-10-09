import { Injectable } from "@angular/core";
import { Venue } from "../../models/Venue";

@Injectable()
export class VenuesProvider {
    
    get(count: number = 20, offset: number = 0): Promise<Venue[]> {
        throw("Not Implemented");
    }

    search(query: string, count: number = 20, offset: number = 0): Promise<Venue[]> {
        throw("Not Implemented");
    }
}