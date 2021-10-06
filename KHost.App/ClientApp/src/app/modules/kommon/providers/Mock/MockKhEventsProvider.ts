import { KhEvent } from "../../models/KhEvent";
import { KhEventsProvider } from "../KhEventsProvider";

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