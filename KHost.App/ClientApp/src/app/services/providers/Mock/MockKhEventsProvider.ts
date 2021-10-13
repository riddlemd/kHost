import { Injectable } from "@angular/core";
import { KhEvent } from "src/app/models/KhEvent";
import { KhEventsProvider } from "../KhEventsProvider";

@Injectable()
export class MockKhEventsProvider implements KhEventsProvider {
    private _cache: KhEvent[] = [];

    constructor() {
        this._generateKhEvents();
    }
    
    getSince(timestamp: number): Promise<KhEvent> {
        throw new Error("Method not implemented.");
    }

    private async _generateKhEvents(): Promise<void> {
        console.info(`Generating KhEvents`);
        
        this._cache = [];
    }
}