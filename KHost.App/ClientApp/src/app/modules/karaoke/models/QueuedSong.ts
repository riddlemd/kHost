import { Singer } from "../../kommon/models/Singer";
import { Song } from "src/app/modules/kommon/models/Song";

export class QueuedSong
{
    id: number = -1;
    songId: number | null = null;
    singerId: number | null = null;

    song: Song | null = null;
    singer: Singer | null = null;
}