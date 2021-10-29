import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { CurdProvider } from './CrudProvider';

@Injectable()
export abstract class QueuedSingersProvider implements CurdProvider<QueuedSinger> {
    constructor() {

    }

    findById(id: number): Promise<QueuedSinger | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<QueuedSinger[]> {
        throw("Not Implemented");
    }

    // Events

    created: Observable<QueuedSinger> = (() => { throw("Not Implemented") })();
    
    deleted: Observable<QueuedSinger> = (() => { throw("Not Implemented") })();

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

    moveToTop(queuedSinger: QueuedSinger): Promise<number> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSinger: QueuedSinger): Promise<number> {
        throw ("Not Implemented");
    }

    moveUp(queuedSinger: QueuedSinger): Promise<number> {
        throw ("Not Implemented");
    }

    moveDown(queuedSinger: QueuedSinger): Promise<number> {
        throw ("Not Implemented");
    }

    moveTo(beforeQueuedSinger: QueuedSinger, position: number): Promise<number> {
        throw ("Not Implemented");
    }
}