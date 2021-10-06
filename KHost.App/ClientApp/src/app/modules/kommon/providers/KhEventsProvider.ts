import { KhEvent } from "../models/KhEvent";

export class KhEventsProvider {
    getSince(timestamp: number): Promise<KhEvent> {
        throw('Not Implemented');
    }
}