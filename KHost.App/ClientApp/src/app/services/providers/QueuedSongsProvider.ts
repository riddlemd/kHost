import { Injectable } from '@angular/core';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { Singer } from 'src/app/models/Singer';
import { Song } from 'src/app/models/Song';

@Injectable()
export abstract class QueuedSongsProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    remove(queuedSong: QueuedSong): Promise<boolean> {
        throw("Not Implemented");
    }

    add(singer: Singer, song: Song): Promise<QueuedSong> {
        throw("Not Implemented");
    }

    moveToTop(queuedSong: QueuedSong): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSong: QueuedSong): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveUp(queuedSong: QueuedSong): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveDown(queuedSong: QueuedSong): Promise<boolean> {
        throw ("Not Implemented");
    }
}