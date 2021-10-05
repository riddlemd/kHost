import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Venue } from "../models/Venue";

@Injectable()
export class VenuesProvider {
    get(count: number = 20, offset: number = 0): Observable<Venue[]> {
        throw("Not Implemented");
    }

    search(query: string, count: number = 20, offset: number = 0): Observable<Venue[]> {
        throw("Not Implemented");
    }
}