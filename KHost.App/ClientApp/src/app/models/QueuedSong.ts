import { ModelWithId } from "./ModelWIthId";
import { ModelWithPosition } from "./ModelWithPosition";
import { QueuedSinger } from "./QueuedSinger";
import { Song } from "./Song";

export class QueuedSong implements ModelWithId, ModelWithPosition {

    id?: number;

    songId?: number;

    queuedSingerId?: number;

    song?: Song;

    queuedSinger?: QueuedSinger

    position: number = 0;
}