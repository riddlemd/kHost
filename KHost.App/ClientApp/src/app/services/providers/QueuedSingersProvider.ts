import { Injectable } from '@angular/core';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { Singer } from 'src/app/models/Singer';

@Injectable()
export abstract class QueuedSingersProvider {
    constructor() {

    }

    // CRUD Methods

    create(singer: Singer): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<QueuedSinger[]> {
        throw("Not Implemented");
    }

    update(singer: Singer): Promise<void> {
        throw("Not Implemented");
    }
    
    delete(queuedSinger: QueuedSinger): Promise<void> {
        throw("Not Implemented");
    }

    // Queue Methods

    moveToTop(queuedSinger: QueuedSinger): Promise<void> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSinger: QueuedSinger): Promise<void> {
        throw ("Not Implemented");
    }

    moveUp(queuedSinger: QueuedSinger): Promise<void> {
        throw ("Not Implemented");
    }

    moveDown(queuedSinger: QueuedSinger): Promise<void> {
        throw ("Not Implemented");
    }
}