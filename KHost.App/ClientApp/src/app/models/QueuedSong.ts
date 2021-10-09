import { Singer } from "./Singer";
import { Song } from "./Song";

export class QueuedSong
{
    id: number = -1;
    songId: number | null = null;
    singerId: number | null = null;

    song: Song | null = null;
    singer: Singer | null = null;
}