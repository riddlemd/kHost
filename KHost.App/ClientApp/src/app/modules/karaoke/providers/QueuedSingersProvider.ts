import { Injectable } from '@angular/core';
import { QueuedSinger } from '../models/QueuedSinger';
import { Singer } from '../../kommon/models/Singer';

@Injectable()
export abstract class QueuedSingersProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Promise<QueuedSinger[]> {
        throw("Not Implemented");
    }

    remove(queuedSinger: QueuedSinger): Promise<boolean> {
        throw("Not Implemented");
    }

    add(singer: Singer): Promise<QueuedSinger> {
        throw("Not Implemented");
    }

    moveToTop(queuedSinger: QueuedSinger): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSinger: QueuedSinger): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveUp(queuedSinger: QueuedSinger): Promise<boolean> {
        throw ("Not Implemented");
    }

    moveDown(queuedSinger: QueuedSinger): Promise<boolean> {
        throw ("Not Implemented");
    }
}