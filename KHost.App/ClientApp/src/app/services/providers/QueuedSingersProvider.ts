import { Injectable } from '@angular/core';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { Singer } from 'src/app/models/Singer';
import { CurdProvider } from './CrudProvider';

@Injectable()
export abstract class QueuedSingersProvider implements CurdProvider<QueuedSinger> {
    constructor() {

    }

    // CRUD Methods

    create(queuedSinger: QueuedSinger): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<QueuedSinger[]> {
        throw("Not Implemented");
    }

    update(queuedSinger: QueuedSinger): Promise<void> {
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

    moveTo(beforeQueuedSinger: QueuedSinger, position: number): Promise<void> {
        throw ("Not Implemented");
    }
}