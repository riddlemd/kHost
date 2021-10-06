import { QueuedSong } from "../../karaoke/models/QueuedSong";
import { SingerPerformance } from "./SingerPerformance";

export class Singer
{
    id: number = -1;
    
    name: string = "";

    lastSang: Date|null = null;

    queuedSongs: QueuedSong[] = [];

    performanceHistory: SingerPerformance[] = [];
}