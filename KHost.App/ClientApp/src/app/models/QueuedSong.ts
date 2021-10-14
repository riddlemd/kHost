import { Singer } from "./Singer";
import { Song } from "./Song";

export class QueuedSong {

    songId: number;

    singerId: number;

    id?: number;

    song?: Song;

    singer?: Singer

    constructor({
        songId,
        singerId,
        id,
        song,
        singer
    }: parameters) {
        this.songId = songId;
        this.singerId = singerId;
        this.id = id;
        this.song = song;
        this.singer = singer;
    }
}

interface parameters {
    songId: number,
    singerId: number,
    id: number,
    song: Song,
    singer: Singer
}