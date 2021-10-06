import { Injectable } from "@angular/core";
import { QueuedSinger } from "../../models/QueuedSinger";
import { Singer } from "../../../kommon/models/Singer";
import { QueuedSingersProvider } from "../QueuedSingersProvider";

@Injectable()
export class MockQueuedSingersProvider extends QueuedSingersProvider {
    
    private _cache: QueuedSinger[] = [];

    constructor() {
        super();
        
        this.generateQueuedSingers();
    }

    get(count: number = 20, offset: number = 0): Promise<QueuedSinger[]> {
        console.info('Getting QueuedSingers');

        const queuedSingers:QueuedSinger[] = this._cache
            .slice(offset, count);

        return new Promise<QueuedSinger[]>((resolve, reject) => {
            resolve(queuedSingers);
        });
    }
    
    remove(queuedSinger: QueuedSinger): Promise<boolean> {
        console.info(`Removing QueuedSinger#${queuedSinger.id}`);

        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSinger.id) continue;
            
            this._cache.splice(i, 1);

            return new Promise<boolean>((resolve, reject) => {
                resolve(true);
            });
        }

        return new Promise<boolean>((resolve, reject) => {
            reject();
        });
    }
    
    moveToTop(queuedSinger: QueuedSinger): Promise<boolean> {
        console.info(`movedToTop QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToStart(queuedSinger);

        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveToBottom(queuedSinger: QueuedSinger): Promise<boolean> {
        console.info(`movedToBottom QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToEnd(queuedSinger);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveUp(queuedSinger: QueuedSinger): Promise<boolean> {
        console.info(`movedUp QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToStart(queuedSinger);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveDown(queuedSinger: QueuedSinger): Promise<boolean> {
        console.info(`movedDown QueuedSinger#${queuedSinger.id}`);

        this._cache.moveTowardEnd(queuedSinger);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    private async generateQueuedSingers(): Promise<void> {
        console.info(`Generating QueuedSingers`);
        
        this._cache = [];

        for(let i = 1; i <= 15; i++)
        {
            const singer = new Singer();
            singer.id = i;
            singer.name = (Math.random() + 1).toString(36).substring(7);

            const queuedSinger = new QueuedSinger();
            queuedSinger.id = i;
            queuedSinger.singerId = singer.id;
            queuedSinger.singer = singer;
            
            this._cache.push(queuedSinger);
        }
    }
}
