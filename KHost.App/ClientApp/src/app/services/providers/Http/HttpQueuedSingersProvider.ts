import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSingersProvider } from '../QueuedSingersProvider';
import { BaseHttpProvider } from './BaseHttpProvider';
import { QueueProviderComponent } from './components/QueueProviderComponent';

@Injectable()
export class HttpQueuedSingersProvider extends BaseHttpProvider<QueuedSinger> implements QueuedSingersProvider {
    
    private _queue: QueueProviderComponent<QueuedSinger>;
    
    private _moved = new Subject<QueuedSinger>();

    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/queued-singers", config, httpClient);
        
        this._queue = new QueueProviderComponent<QueuedSinger>(this._getFullEndpointUrl(), httpClient);
    }

    // Events

    moved: Observable<QueuedSinger> = this._moved.asObservable();

    // CRUD Methods

    update(queuedSinger: QueuedSinger): Promise<void> {
        // This provider is not expected to implement this.
        throw new Error('Method not implemented.');
    }

    // Queue Methods

    async moveToTop(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveToTop(queuedSinger)

        this._moved.next(queuedSinger);

        return position;
    }

    async moveToBottom(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveToBottom(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveUp(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveUp(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveDown(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveDown(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveTo(queuedSinger: QueuedSinger, position: number): Promise<number> {
        const newPosition = await this._queue.moveTo(queuedSinger, position);

        this._moved.next(queuedSinger);

        return newPosition;
    }
}