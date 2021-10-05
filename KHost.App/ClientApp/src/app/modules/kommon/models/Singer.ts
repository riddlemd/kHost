import { QueuedSong } from "../../karaoke/models/QueuedSong";
import { Performance } from "./Performance";

export class Singer
{
    id: number = -1;
    name: string = "";

    lastSang: Date|null = null;

    queuedSongs: QueuedSong[] = [];

    performanceHistory: Performance[] = [];
}