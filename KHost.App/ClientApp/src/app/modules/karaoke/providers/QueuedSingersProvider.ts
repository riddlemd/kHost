import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedSinger } from '../models/QueuedSinger';
import { Singer } from '../../kommon/models/Singer';

@Injectable()
export abstract class QueuedSingersProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Observable<QueuedSinger[]> {
        throw("Not Implemented");
    }

    remove(queuedSinger: QueuedSinger): Observable<boolean> {
        throw("Not Implemented");
    }

    add(singer: Singer): Observable<QueuedSinger> {
        throw("Not Implemented");
    }

    moveToTop(queuedSinger: QueuedSinger): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSinger: QueuedSinger): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveUp(queuedSinger: QueuedSinger): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveDown(queuedSinger: QueuedSinger): Observable<boolean> {
        throw ("Not Implemented");
    }
}