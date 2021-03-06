import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { CrudProvider } from './CrudProvider';

@Injectable()
export abstract class QueuedSongsProvider implements CrudProvider<QueuedSong> {
    constructor() {

    }

    getByQueuedSinger(queuedSinger: QueuedSinger, count?: number, offset?: number): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    findById(id: number): Promise<QueuedSong | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<QueuedSong[]> {
        throw("Not Implemented");
    }

    // Events

    created: Observable<QueuedSong> = (() => { throw("Not Implemented") })();
    
    deleted: Observable<QueuedSong> = (() => { throw("Not Implemented") })();

    moved: Observable<QueuedSinger> = (() => { throw("Not Implemented") })();

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

    moveToTop(queuedSong: QueuedSong): Promise<number> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSong: QueuedSong): Promise<number> {
        throw ("Not Implemented");
    }

    moveUp(queuedSong: QueuedSong): Promise<number> {
        throw ("Not Implemented");
    }

    moveDown(queuedSong: QueuedSong): Promise<number> {
        throw ("Not Implemented");
    }

    moveTo(queuedSong: QueuedSong, position: number): Promise<number> {
        throw ("Not Implemented");
    }
}