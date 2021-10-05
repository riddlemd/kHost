import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedSong } from '../../karaoke/models/QueuedSong';
import { Singer } from '../../kommon/models/Singer';
import { Song } from 'src/app/modules/kommon/models/Song';

@Injectable()
export abstract class QueuedSongsProvider {
    constructor() {

    }

    get(count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        throw("Not Implemented");
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        throw("Not Implemented");
    }

    remove(queuedSong: QueuedSong): Observable<boolean> {
        throw("Not Implemented");
    }

    add(singer: Singer, song: Song): Observable<QueuedSong> {
        throw("Not Implemented");
    }

    moveToTop(queuedSong: QueuedSong): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveToBottom(queuedSong: QueuedSong): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveUp(queuedSong: QueuedSong): Observable<boolean> {
        throw ("Not Implemented");
    }

    moveDown(queuedSong: QueuedSong): Observable<boolean> {
        throw ("Not Implemented");
    }
}