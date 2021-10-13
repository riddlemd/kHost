import { Injectable } from '@angular/core';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { Singer } from 'src/app/models/Singer';

@Injectable()
export abstract class QueuedSongsProvider {
    constructor() {

    }

    getBySinger(singer: Singer, count?: number, offset?: number): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    // CRUD Methods

    create(queuedSinger: QueuedSong): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    update(queuedSinger: QueuedSong): Promise<void> {
        throw("Not Implemented");
    }
    
    delete(queuedSinger: QueuedSong): Promise<void> {
        throw("Not Implemented");
    }

    // Queue Methods

    moveToTop(queuedSong: QueuedSong): Promise<void> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSong: QueuedSong): Promise<void> {
        throw ("Not Implemented");
    }

    moveUp(queuedSong: QueuedSong): Promise<void> {
        throw ("Not Implemented");
    }

    moveDown(queuedSong: QueuedSong): Promise<void> {
        throw ("Not Implemented");
    }
}