import { Injectable } from "@angular/core";
import { KhEvent } from "src/app/models/KhEvent";
import { KhEventsProvider } from "../KhEventsProvider";

@Injectable()
export class MockKhEventsProvider extends KhEventsProvider {
    private _cache: KhEvent[] = [];

    constructor() {
        super();

        this._generateKhEvents();
    }

    private async _generateKhEvents(): Promise<void> {
        console.info(`Generating KhEvents`);
        
        this._cache = [];
    }
}