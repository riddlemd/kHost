import { Injectable } from "@angular/core";
import { KhEvent } from "../../models/KhEvent";

@Injectable()
export class KhEventsProvider {
    
    getSince(timestamp: number): Promise<KhEvent> {
        throw('Not Implemented');
    }
}