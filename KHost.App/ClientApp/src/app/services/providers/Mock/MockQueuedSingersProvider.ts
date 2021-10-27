import 'src/app/modules/kommon/collections/arrayExtensions';
import 'src/app/modules/kommon/mathematics/MathExtensions';
import { Injectable } from "@angular/core";
import { QueuedSinger } from "src/app/models/QueuedSinger";
import { Singer } from "src/app/models/Singer";
import { QueuedSingersProvider } from "../QueuedSingersProvider";
import { SingersProvider } from '../SingersProvider';

@Injectable()
export class MockQueuedSingersProvider implements QueuedSingersProvider {
    
    private _cache: QueuedSinger[] = [];

    constructor(private _singersProvider: SingersProvider) {
        this.generateQueuedSingers();
    }

    // CRUD Methods

    create(queuedSinger: QueuedSinger): Promise<number> {
        throw new Error('Method not implemented.');
    }

    read(count?: number, offset?: number): Promise<QueuedSinger[]> {
        console.info('Getting QueuedSingers');

        const queuedSingers:QueuedSinger[] = this._cache
            .slice(offset ?? 0, count ?? 20);

        return new Promise<QueuedSinger[]>((resolve, reject) => {
            resolve(queuedSingers);
        });
    }

    update(queuedSinger: QueuedSinger): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    delete(queuedSinger: QueuedSinger): Promise<void> {
        console.info(`Deleting QueuedSinger#${queuedSinger.id}`);

        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSinger.id) continue;
            
            this._cache.splice(i, 1);

            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        return new Promise((resolve, reject) => {
            reject();
        });
    }

    // Queue Methods
    
    moveToTop(queuedSinger: QueuedSinger): Promise<void> {
        console.info(`movedToTop QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToStart(queuedSinger);

        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveToBottom(queuedSinger: QueuedSinger): Promise<void> {
        console.info(`movedToBottom QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToEnd(queuedSinger);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveUp(queuedSinger: QueuedSinger): Promise<void> {
        console.info(`movedUp QueuedSinger#${queuedSinger.id}`);

        this._cache.moveToStart(queuedSinger);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveDown(queuedSinger: QueuedSinger): Promise<void> {
        console.info(`movedDown QueuedSinger#${queuedSinger.id}`);

        this._cache.moveTowardEnd(queuedSinger);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveTo(beforeQueuedSinger: QueuedSinger, position: number): Promise<void> {
        throw ("Not Implemented");
    }

    private async generateQueuedSingers(): Promise<void> {
        console.info(`Generating QueuedSingers`);
        
        this._cache = [];

        const singers = await this._singersProvider.read();

        for(let i = 1; i <= 15; i++)
        {
            const singer = singers[Math.randomBetween(1, singers.length)];

            if(!singer.id) continue;

            const queuedSinger = new QueuedSinger()
            queuedSinger.id = i;
            queuedSinger.singerId = singer.id;
            queuedSinger.singer = singer;
            
            this._cache.push(queuedSinger);
        }
    }
}
