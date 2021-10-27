import { ModelWithId } from "./ModelWIthId";
import { QueuedSinger } from "./QueuedSinger";
import { Song } from "./Song";

export class QueuedSong implements ModelWithId {

    id?: number;

    songId?: number;

    queuedSingerId?: number;

    song?: Song;

    queuedSinger?: QueuedSinger
}