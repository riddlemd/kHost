import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QueuedSinger } from "../../models/QueuedSinger";
import { Singer } from "../../../kommon/models/Singer";
import { QueuedSingersProvider } from "../QueuedSingersProvider";

@Injectable()
export class MockQueuedSingersProvider extends QueuedSingersProvider {
    
    private _cache: QueuedSinger[];
    
    private _nextQueuedSingerId: number = 1;

    constructor() {
        super();
        this._cache = this.generateQueuedSingers();
    }

    get(count: number = 20, offset: number = 0): Observable<QueuedSinger[]> {
        console.info('Getting QueuedSingers');
        let queuedSingers:QueuedSinger[] = [...this._cache]; // need to return a copy so it mimics remote sources, otherwise it'll pass it around by reference and cause issues.

        return of(queuedSingers);
    }
    
    remove(queuedSinger: QueuedSinger): Observable<boolean> {
        console.info(`Removing QueuedSinger#${queuedSinger.id}`);
        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSinger.id) continue;
            
            this._cache.splice(i, 1);

            return of(true);
        }

        return of(false);
    }
    
    moveToTop(queuedSinger: QueuedSinger): Observable<boolean> {
        console.info(`movedToTop QueuedSinger#${queuedSinger.id}`);
        this._cache.moveToStart(queuedSinger);
        return of(true);
    }

    moveToBottom(queuedSinger: QueuedSinger): Observable<boolean> {
        console.info(`movedToBottom QueuedSinger#${queuedSinger.id}`);
        this._cache.moveToEnd(queuedSinger);
        return of(true);
    }

    moveUp(queuedSinger: QueuedSinger): Observable<boolean> {
        console.info(`movedUp QueuedSinger#${queuedSinger.id}`);
        this._cache.moveToStart(queuedSinger);
        return of(true);
    }

    moveDown(queuedSinger: QueuedSinger): Observable<boolean> {
        console.info(`movedDown QueuedSinger#${queuedSinger.id}`);
        this._cache.moveTowardEnd(queuedSinger);
        return of(true);
    }

    private generateQueuedSingers(): QueuedSinger[] {
        let queuedSingers:QueuedSinger[] = [];

        for(var i = 1; i < 15; i++)
        {
            let singer = new Singer();
            singer.id = i;
            singer.name = (Math.random() + 1).toString(36).substring(7);

            let queuedSinger = new QueuedSinger();
            queuedSinger.id = this._nextQueuedSingerId++;
            queuedSinger.singerId = singer.id;
            queuedSinger.singer = singer;
            
            queuedSingers.push(queuedSinger);
        }

        return queuedSingers;
    }
}
