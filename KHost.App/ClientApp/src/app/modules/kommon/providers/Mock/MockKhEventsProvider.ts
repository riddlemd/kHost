import { KhEvent } from "../../models/KhEvent";
import { KhEventsProvider } from "../KhEventsProvider";

export class MockKhEventsProvider extends KhEventsProvider {
    private _cache: KhEvent[] = [];

    constructor() {
        super();

        this._cache = this._generateKhEvents();
    }

    private _generateKhEvents(): KhEvent[] {
        let khEvents: KhEvent[] = [];

        return khEvents;
    }
}